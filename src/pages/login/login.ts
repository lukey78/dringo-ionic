import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { TabsPage } from "../tabs/tabs";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService, private alertCtrl: AlertController, private translator: TranslateService, private loadingCtrl: LoadingController) {
    // forward to TabsPage if we are already logged in
    auth.getUserObservable().subscribe(user => {
      if (this.navCtrl && user) {
        this.navCtrl.setRoot(TabsPage);
      }
    });
  }

  // disabled at the moment
  loginAnon() {
    let me = this;

    this.presentConfirm(this.translator.instant('welcome.loginAnon'), this.translator.instant('welcome.anonInfo'), function() {
      me.auth.signInAnonymously().then(function() {
        me.navCtrl.setRoot(TabsPage);
      });
    })
  }

  presentError(title: string, message: string, okHandler: Function) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: this.translator.instant('controls.ok'),
          handler: () => {
            okHandler()
          }
        }
      ]
    });
    alert.present();
  }

  presentConfirm(title: string, message: string, okHandler: Function) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: this.translator.instant('controls.cancel'),
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: this.translator.instant('controls.ok'),
          handler: () => {
            okHandler()
          }
        }
      ]
    });
    alert.present();
  }

  loginWithGoogle() {
    let me = this;

    let loading = this.loadingCtrl.create({
      content: this.translator.instant('controls.pleaseWait')
    });

    loading.present();

    this.auth.signInWithGoogle().then(function() {
      loading.dismiss();
      me.navCtrl.setRoot(TabsPage);
    }, function(errorMessage) {
      loading.dismiss();
      me.presentError(me.translator.instant('welcome.loginGoogle'), errorMessage, function() {});
    });
  }


  loginWithFacebook() {
    let me = this;

    let loading = this.loadingCtrl.create({
      content: this.translator.instant('controls.pleaseWait')
    });

    loading.present();

    this.auth.signInWithFacebook().then(function(result) {
      loading.dismiss();
      me.navCtrl.setRoot(TabsPage);
    }, function(errorMessage) {
      loading.dismiss();
      me.presentError(me.translator.instant('welcome.loginFacebook'), errorMessage, function() {});
    });
  }

  loginWithUsername() {
    //let me = this;
    //this.auth.signInWithUserAndPassword().then(function() {
    //  me.navCtrl.setRoot(TabsPage);
    //});
  }

  ionViewDidLoad() {
  }

}
