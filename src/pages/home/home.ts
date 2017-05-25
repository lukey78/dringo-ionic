import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {User} from "firebase/app";
import {ProfilePage} from "../profile/profile";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user: User;

  //pulseState: boolean = false;

  constructor(public navCtrl: NavController, private auth: AuthService, private modalCtrl: ModalController) {
    this.user = auth.getCurrentUser();
  }

  openProfile() {
    //this.togglePulse();
    let editModal = this.modalCtrl.create(ProfilePage);
    editModal.present();
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
