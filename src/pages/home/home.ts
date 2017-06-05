import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {ProfilePage} from "../profile/profile";
import {User} from "../../models/user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user: User;

  //pulseState: boolean = false;

  constructor(public navCtrl: NavController, private auth: AuthService, private modalCtrl: ModalController) {
  }

  private updateUser() {
    this.auth.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  ionViewDidEnter() {
    this.updateUser();
  }

  openProfile() {
    //this.togglePulse();
    let editModal = this.modalCtrl.create(ProfilePage);
    editModal.present();
    editModal.onDidDismiss(() => {
      this.updateUser();
    });
  }

/*
  togglePulse() {
    this.pulseState = true;
    setTimeout(() => {
      this.pulseState = false;
    }, 1000);
  }
*/

}
