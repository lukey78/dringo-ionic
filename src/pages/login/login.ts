import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { TabsPage } from "../tabs/tabs";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService) {
    // forward to TabsPage if we are already logged in
    auth.getUserObservable().subscribe(user => {
      if (this.navCtrl && user) {
        this.navCtrl.setRoot(TabsPage);
      }
    });
  }

  loginAnon() {
    let me = this;
    this.auth.signInAnonymously().then(function() {
      me.navCtrl.setRoot(TabsPage);
    });
  }

  loginWithGoogle() {
    let me = this;
    this.auth.signInWithGoogle().then(function() {
      me.navCtrl.setRoot(TabsPage);
    });
  }


  loginWithFacebook() {
    let me = this;
    this.auth.signInWithFacebook().then(function() {
      me.navCtrl.setRoot(TabsPage);
    });
  }

  loginWithUsername() {
    //let me = this;
    //this.auth.signInWithUserAndPassword().then(function() {
    //  me.navCtrl.setRoot(TabsPage);
    //});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}
