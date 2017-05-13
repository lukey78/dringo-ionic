import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {User} from "firebase/app";
import {LoginPage} from "../login/login";
import {ProfilePage} from "../profile/profile";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user: User;

  constructor(public navCtrl: NavController, private auth: AuthService, private modalCtrl: ModalController) {
    this.user = auth.getCurrentUser();
  }

  openProfile() {
    let editModal = this.modalCtrl.create(ProfilePage);
    editModal.present();
  }

  logout() {
    this.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }
}
