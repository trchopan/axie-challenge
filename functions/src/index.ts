import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express, {Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {Errors, ErrorCode} from './errors';
import {merge} from 'lodash';

admin.initializeApp();
const db = admin.firestore();
const auth = admin.auth();

const app = express();
app.use(cors({origin: true}));
app.use(express.json());

const logger = morgan('tiny');
app.use(logger);

const handleErrors = (res: Response, err: Errors) => {
  const unknownError = () => res.status(500).json({code: 'unknown-error'});
  if (!err.code) {
    console.error(err);
    unknownError();
    return;
  }
  switch (err.code) {
    case ErrorCode.BadRequest:
      res.status(400).json({code: err.code, message: err.message});
      break;
    case ErrorCode.Unauthorized:
      res.status(401).json({code: err.code});
      break;
    case ErrorCode.NotFound:
      res.status(404).json({code: err.code});
      break;
    default:
      console.error(err);
      unknownError();
      break;
  }
};

const baseAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.header('Authorization')?.split(' ')[1];
    if (!authToken) {
      throw new Errors(ErrorCode.Unauthorized);
    }
    let idToken: admin.auth.DecodedIdToken;
    try {
      // TODO: Properly handle error
      idToken = await auth.verifyIdToken(authToken);
    } catch (err) {
      throw new Errors(ErrorCode.Unauthorized);
    }
    const email = idToken.email || '';
    const uid = idToken.uid;
    res.locals.currentUser = {email, uid};
    next();
  } catch (err) {
    handleErrors(res, err);
  }
};

const withErrorHandler = (
  fn: (r: Request, p: Response) => Promise<void>
) => async (req: Request, res: Response) => {
  try {
    await fn(req, res);
  } catch (err) {
    handleErrors(res, err);
  }
};

app.get(
  '/all-wallets',
  baseAuth,
  withErrorHandler(async (req, res) => {
    const {uid} = res.locals.currentUser;
    const docs = await db.collection('Wallets').listDocuments();
    res.status(200).json(docs.map(d => d.id).filter(addr => addr !== uid));
  })
);

app.post(
  '/transaction',
  baseAuth,
  withErrorHandler(async (req, res) => {
    const {uid} = res.locals.currentUser;
    const {recipientAddr, amount: amount_, symbol} = req.body;
    const amount = parseFloat(amount_)

    const result = await db.runTransaction(async t => {
      const recipientRef = db.doc(`Wallets/${recipientAddr}`);
      const recipientDoc = await t.get(recipientRef);

      const senderRef = db.doc(`Wallets/${uid}`);
      const senderDoc = await t.get(senderRef);

      const sender = senderDoc.data();
      if (!sender?.assets?.data)
        throw new Errors(ErrorCode.Internal, 'corrupted sender data');

      const remainAmount = (sender.assets.data[symbol] || 0) - amount;
      if (remainAmount < 0) {
        throw new Errors(
          ErrorCode.BadRequest,
          `user does not have enough ${symbol}`
        );
      }

      const recipient = recipientDoc.data();
      if (!recipient?.assets?.data)
        throw new Errors(ErrorCode.Internal, 'corrupted recipient data');
      if (!recipient.assets.keys.includes(symbol))
        recipient.assets.keys.push(symbol);
      const recipientAmount = (recipient.assets.data[symbol] || 0) + amount;

      const newSender = merge(
        {},
        sender,
        {assets: {data: {[symbol]: remainAmount}}},
      );
      t.update(senderRef, newSender);
      const newRecipient = merge(
        {},
        recipient,
        {assets: {data: {[symbol]: recipientAmount}}},
      );
      t.update(recipientRef, newRecipient);
      return {
        newSender,
        newRecipient,
      };
    });
    res.status(200).json(result);
  })
);

export const api = functions.https.onRequest(app);
