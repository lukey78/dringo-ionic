import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {User} from "firebase/app";
import {LoginPage} from "../login/login";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user: User;

  constructor(public navCtrl: NavController, private auth: AuthService) {
    this.user = auth.getCurrentUser();
  }

  openProfile() {

  }

  logout() {
    this.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }
}
