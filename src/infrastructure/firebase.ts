import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

import {firebaseConfig} from './firebase.config';

export const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();
export const analytics = app.analytics();
