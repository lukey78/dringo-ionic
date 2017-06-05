import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {ChooseLocationPage} from "./choose-location/choose-location";
import {AuthService} from "../../providers/auth-service";
import {User} from "../../models/user";
import {UserProvider} from "../../providers/users";
import {LocationsProvider} from "../../providers/locations";
import {Location} from "../../models/location";

@IonicPage()
@Component({
  selector: 'page-climb',
  templateUrl: 'climb.html',
})
export class ClimbPage {

  private currentLocation: Location;
  private currentUser: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private translator: TranslateService, private auth: AuthService, private userProvider: UserProvider, private locationsProvider: LocationsProvider) {
    auth.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      let currentLocationId = this.currentUser.getCurrentLocation();
      if (currentLocationId) {
        this.locationsProvider.getItem(currentLocationId).subscribe(loc => {
          this.currentLocation = loc;
        });
      }
    });
  }

  ionViewDidEnter() {
  }

  changeLocation() {
    let chooseModal = this.modalCtrl.create(ChooseLocationPage, {});
    chooseModal.present();

    chooseModal.onDidDismiss(loc => {
      if (loc) {
        this.currentLocation = loc;
        // update "currentLocation" on user
        this.currentUser.updateCurrentLocation(loc);
        this.userProvider.updateItem(this.currentUser.email, this.currentUser);
      }
    });

  }

  addClimb() {

  }

}
