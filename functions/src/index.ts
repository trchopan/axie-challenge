import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express, {Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {Errors, ErrorCode} from './errors';

admin.initializeApp();
const db = admin.database();
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

app.post('/transaction', baseAuth, (req, res) => {
  const {uid} = res.locals.currentUser;
  const {toAddr, amount, symbol} = req.body;

  db.ref(`${uid}/wallet`);
});

export const api = functions.https.onRequest(app);
