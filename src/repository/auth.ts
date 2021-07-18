import firebase from 'firebase/app';
import {User, Errors} from '@/domain';

export enum AuthError {
  TooManyRequests = 'auth/too-many-requests',
  WrongPassword = 'auth/wrong-password',
  ServiceError = 'auth/unknown-service-error',
  NotFound = 'auth/user-not-found',
}

export class AuthRepository {
  constructor(private auth: firebase.auth.Auth) {}

  onAuthStateChanged(
    onData: (user: Maybe<User>) => unknown,
    onError?: (err: Errors) => unknown
  ) {
    this.auth.onAuthStateChanged(
      user => {
        onData(user ? new User().fromFirebase(user) : null);
      },
      err => {
        console.error('handle auth state change:', err);
        onError?.(new Errors(AuthError.ServiceError));
      }
    );
  }

  getCurrentUser() {
    if (!this.auth.currentUser) return null;
    return new User().fromFirebase(this.auth.currentUser);
  }

  async signInEmail(email: string, password: string) {
    try {
      const credentials = await this.auth.signInWithEmailAndPassword(
        email,
        password
      );
      if (!credentials.user) throw new Errors(AuthError.NotFound);
      return new User().fromFirebase(credentials.user);
    } catch (err) {
      switch (err.code) {
        case AuthError.WrongPassword:
        case AuthError.TooManyRequests:
          console.log(new Errors(err.code));
          throw new Errors(err.code);
        default:
          throw new Errors(AuthError.ServiceError);
      }
    }
  }

  async sendPasswordResetEmail(email: string) {
    try {
      await this.auth.sendPasswordResetEmail(email);
      return true;
    } catch (err) {
      switch (err.code) {
        case AuthError.NotFound:
          throw new Errors(err.code);
        default:
          throw new Errors(AuthError.ServiceError);
      }
    }
  }

  async signOut() {
    await this.auth.signOut();
  }
}
