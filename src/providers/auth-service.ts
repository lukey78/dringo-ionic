import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  private currentUser: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.currentUser = afAuth.authState;
  }

  get authenticated(): boolean {
    return this.afAuth.auth.currentUser !== null;
  }

  signInAnonymously(): firebase.Promise<any> {
    return this.afAuth.auth.signInAnonymously();
  }

  signInWithGoogle(): firebase.Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signInWithFacebook(): firebase.Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  signInWithUserAndPassword(): firebase.Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.EmailAuthProvider());
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }

  getCurrentUser(): Observable<firebase.User> {
    return this.currentUser;
  }

  getDisplayName(): string {
    if (this.currentUser !== null) {
      return 'bla';//this.currentUser.displayName;
    } else {
      return '';
    }
  }
}
