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

  signInWithGoogle(): Promise<any> {
    let me = this;

    return new Promise((resolve, reject) => {

      if (this.platform.is('cordova')) {

        return this.gplus.login({
          'webClientId': '511139085903-lja3jpnm65jb0lpss6csmglp8c8s0da1.apps.googleusercontent.com'
        }).then(userData => {
          const googleCredential = auth.GoogleAuthProvider.credential(userData.idToken, null);
          return this.afAuth.auth.signInWithCredential(googleCredential);
        }, err => {
          let error: any = err;

          let email = error.email;
          let credential = error.credential;

          if (error.code === 'auth/account-exists-with-different-credential') {
            me.afAuth.auth.fetchProvidersForEmail(email).then(function (providers) {
              if (providers.indexOf('google.com') !== -1) {
                reject(me.translator.instant('welcome.error.emailAlreadyWithFacebook'));
              } else {
                reject(me.translator.instant('welcome.error.authProblem'));
              }
            });
          } else {
            reject(me.translator.instant('welcome.error.authProblem'));
          }

        });

      } else {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then(function (result) {
            resolve(result);
          }, function (err) {
            let error: any = err;

            let email = error.email;
            let credential = error.credential;

            if (error.code === 'auth/account-exists-with-different-credential') {
              me.afAuth.auth.fetchProvidersForEmail(email).then(function (providers) {
                console.log(providers);
                if (providers.indexOf('facebook,com') !== -1) {
                  reject(me.translator.instant('welcome.error.emailAlreadyWithFacebook'));
                } else {
                  reject(me.translator.instant('welcome.error.authProblem'));
                }
              });
            } else {
              reject(me.translator.instant('welcome.error.authProblem'));
            }
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
          return firebase.auth().signInWithCredential(facebookCredential).then(res => {
            resolve(res);
          }, err => {
            let error: any = err;

            let email = error.email;
            let credential = error.credential;

            if (error.code === 'auth/account-exists-with-different-credential') {
              me.afAuth.auth.fetchProvidersForEmail(email).then(function (providers) {
                if (providers.indexOf('google.com') !== -1) {
                  reject(me.translator.instant('welcome.error.emailAlreadyWithGoogle'));
                } else {
                  reject(me.translator.instant('welcome.error.authProblem'));
                }
              });
            } else {
              reject(me.translator.instant('welcome.error.authProblem'));
            }
          });
        }, err => {
          reject(me.translator.instant('welcome.error.authProblem'));
        })

      } else {

        this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
          .then(function (result) {
            resolve(result);
          }, function (err) {
            console.log(err);

            let error: any = err;

            let email = error.email;
            let credential = error.credential;

            if (error.code === 'auth/account-exists-with-different-credential') {
              me.afAuth.auth.fetchProvidersForEmail(email).then(function (providers) {
                if (providers.indexOf('google.com') !== -1) {
                  reject(me.translator.instant('welcome.error.emailAlreadyWithGoogle'));
                } else {
                  reject(me.translator.instant('welcome.error.authProblem'));
                }
              });
            } else {
              reject(me.translator.instant('welcome.error.authProblem'));
            }
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
