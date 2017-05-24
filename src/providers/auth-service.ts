import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Platform } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { auth } from 'firebase'; //needed for the GoogleAuthProvider
import { GooglePlus } from '@ionic-native/google-plus';

@Injectable()
export class AuthService {

  private userObservable: Observable<firebase.User>;
  private currentUser: firebase.User;

  constructor(public afAuth: AngularFireAuth, private platform: Platform, private gplus: GooglePlus) {
    this.userObservable = afAuth.authState;
    this.userObservable.subscribe(user => {
      this.currentUser = user;
    });
  }

  signInAnonymously(): firebase.Promise<any> {
    return this.afAuth.auth.signInAnonymously();
  }

  signInWithGoogle(): firebase.Promise<any> {
    if (this.platform.is('cordova')) {

      return this.gplus.login({
        'webClientId':'511139085903-lja3jpnm65jb0lpss6csmglp8c8s0da1.apps.googleusercontent.com'
      }).then(userData => {
        const googleCredential = auth.GoogleAuthProvider.credential(userData.idToken, null);
        return this.afAuth.auth.signInWithCredential(googleCredential);
      }).catch(error => {
        console.log(error);
      });

    } else {
      return this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
  }

  // currently not used
  linkWithGoogle(): firebase.Promise<any> {
    let me = this;

    return this.afAuth.auth.currentUser.linkWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(function(result) {
        console.log("linked successfully", result);

        let newUserInfo = result.user.providerData[0];
        me.afAuth.auth.currentUser.updateEmail(newUserInfo.email);
        me.afAuth.auth.currentUser.updateProfile({
          "displayName": newUserInfo.displayName,
          "photoURL": newUserInfo.photoURL
        });

      }, function(err) {
        let error: any = err;
        console.log(error);

        let credential = error.credential;

        var prevUser = me.afAuth.auth.currentUser;
        // Sign in user with another account

        me.afAuth.auth.signInWithCredential(credential).then(function(user) {
          console.log("Sign In Success", user);
          let currentUser = user;
          // Merge prevUser and currentUser data stored in Firebase.
          // Note: How you handle this is specific to your application
          prevUser.updateProfile({
            "displayName": user.displayName,
            "photoURL": user.photoURL
          });

          // After data is migrated delete the duplicate user
          return user.delete().then(function() {
            // Link the OAuth Credential to original account
            return prevUser.link(credential);
          }).then(function() {
            // Sign in with the newly linked credential
            return me.afAuth.auth.signInWithCredential(credential);
          });
        }).catch(function(error) {
          console.log("Sign In Error", error);
        });

      });
  }

  linkWithFacebook(): firebase.Promise<any> {
    return this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }

  signInWithFacebook(): firebase.Promise<any> {
    return this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
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
