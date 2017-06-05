import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Platform } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { auth } from 'firebase'; //needed for the GoogleAuthProvider
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import {UserProvider} from "./users";
import {User} from "../models/user";
import {TranslateService} from "@ngx-translate/core";
import {Md5} from 'ts-md5/dist/md5';

@Injectable()
export class AuthService {

  private userObservable: Observable<firebase.User>;
  private currentUser: Observable<User>;
  private loadedUser: User;

  constructor(public afAuth: AngularFireAuth, private platform: Platform, private gplus: GooglePlus, private fb: Facebook, private userProvider: UserProvider, private translator: TranslateService) {
    this.userObservable = afAuth.authState;
    this.userObservable.subscribe(user => {
      if (user) {
        this.userProvider.updateOrCreateItemOnLogin(user);
        this.currentUser = this.userProvider.getItem(user.email);
        this.currentUser.subscribe(appUser => {
          this.loadedUser = appUser;
          this.translator.use(appUser.language);
        });
      }
    });
  }

  signInAnonymously(): firebase.Promise<any> {
    return this.afAuth.auth.signInAnonymously();
  }

  handleError(err, rejectFn) {
    let me = this;
    let error: any = err;

    let email = error.email;

    if (error.code === 'auth/account-exists-with-different-credential') {
      this.afAuth.auth.fetchProvidersForEmail(email).then(function (providers) {
        if (providers.indexOf('facebook.com') !== -1) {
          rejectFn(me.translator.instant('welcome.error.emailAlreadyWithFacebook'));
        } else if (providers.indexOf('google.com') !== -1) {
          rejectFn(me.translator.instant('welcome.error.emailAlreadyWithGoogle'));
        } else {
          rejectFn(me.translator.instant('welcome.error.authProblem'));
        }
      });
    } else {
      rejectFn(me.translator.instant('welcome.error.authProblem'));
    }
  }

  signInWithGoogle(): Promise<any> {
    let me = this;

    return new Promise((resolve, reject) => {

      if (this.platform.is('cordova')) {

        return this.gplus.login({
          'webClientId': '511139085903-lja3jpnm65jb0lpss6csmglp8c8s0da1.apps.googleusercontent.com'
        }).then(userData => {
          const googleCredential = auth.GoogleAuthProvider.credential(userData.idToken, null);
          this.afAuth.auth.signInWithCredential(googleCredential).then(res => {
            resolve(res);
          }, err => {
            me.handleError(err, reject);
          });
        }, err => {
          reject(me.translator.instant('welcome.error.authProblem'));
        });

      } else {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then(function (result) {
            resolve(result);
          }, function (err) {
            me.handleError(err, reject);
          })
      }

    });
  }

  signInWithFacebook(): Promise<any> {
    let me = this;

    return new Promise((resolve, reject) => {

      if (this.platform.is('cordova')) {

        this.fb.login(['email', 'public_profile']).then(res => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          firebase.auth().signInWithCredential(facebookCredential).then(res => {
            resolve(res);
          }, err => {
            me.handleError(err, reject);
          });
        }, err => {
          reject(me.translator.instant('welcome.error.authProblem'));
        })

      } else {

        this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
          .then(function (result) {
            resolve(result);
          }, function (err) {
            me.handleError(err, reject);
          })
      }
    });
  }


  // currently not used
  linkWithGoogle(): firebase.Promise<any> {
    let me = this;

    return this.afAuth.auth.currentUser.linkWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(function(result) {
        console.log("linked successfully", result);
      }, function(err) {
        let error: any = err;
        console.log(error);
      });
  }

  linkWithFacebook(): firebase.Promise<any> {
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

  getCurrentUser(): Observable<User> {
    return this.currentUser;
  }

  getUserId(): string {
    return this.loadedUser ? Md5.hashStr(this.loadedUser.email).toString() : "";
  }

  getUserName(): string {
    return this.loadedUser ? this.loadedUser.name : "";
  }

  isAnonymous(): boolean {
    return false;
    //return this.currentUser && this.currentUser.isAnonymous;
  }
}
