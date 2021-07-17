import firebase from 'firebase/app';

export class User {
  public uid: string = '';
  public email: string = ''; // TODO: validation email

  fromFirebase(user: firebase.User) {
    this.uid = user.uid;
    this.email = user.email || '';
    return this;
  }
}
