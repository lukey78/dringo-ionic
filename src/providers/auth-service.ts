import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  private userObservable: Observable<firebase.User>;
  private currentUser: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    this.userObservable = afAuth.authState;
    this.userObservable.subscribe(user => {
      this.currentUser = user;
    });
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
    return this.afAuth.auth.signInWithEmailAndPassword("test@test.ch", "testpass");
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }

  getUserObservable(): Observable<firebase.User> {
    return this.userObservable;
  }

  getCurrentUser(): firebase.User {
    return this.currentUser;
  }

  getUserId(): string {
    return this.currentUser ? this.currentUser.uid : "";
  }

  getUserName(): string {
    return this.currentUser ? this.currentUser.displayName : "";
  }

  isAnonymous(): boolean {
    return this.currentUser && this.currentUser.isAnonymous;
  }

  getDisplayName(): string {
    if (this.userObservable !== null) {
      return 'bla';//this.userObservable.displayName;
    } else {
      return '';
    }
  }
}
