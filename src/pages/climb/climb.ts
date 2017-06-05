import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {ChooseLocationPage} from "./choose-location/choose-location";
import {AuthService} from "../../providers/auth-service";
import {User} from "../../models/user";
import {UserProvider} from "../../providers/users";
import {LocationsProvider} from "../../providers/locations";
import {Location} from "../../models/location";
import {ChooseRoutePage} from "./choose-route/choose-route";
import {Route} from "../../models/route";
import {Rating} from "../../models/rating";
import {RatingsProvider} from "../../providers/ratings";

@IonicPage()
@Component({
  selector: 'page-climb',
  templateUrl: 'climb.html',
})
export class ClimbPage {

  private currentLocation: Location;
  private currentRoute: Route;
  private rating: Rating;
  private currentUser: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private translator: TranslateService, private auth: AuthService, private userProvider: UserProvider, private locationsProvider: LocationsProvider, private ratingsProvider: RatingsProvider) {
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
        this.currentRoute = null;
        // update "currentLocation" on user
        this.currentUser.updateCurrentLocation(loc);
        this.userProvider.updateItem(this.currentUser.email, this.currentUser);
      }
    });

  }

  chooseRoute() {
    let chooseModal = this.modalCtrl.create(ChooseRoutePage, { "location": this.currentLocation });
    chooseModal.present();

    chooseModal.onDidDismiss(chosenRoute => {
      if (chosenRoute) {
        this.currentRoute = chosenRoute;
        this.rating = this.ratingsProvider.getItem(this.currentRoute.ratingId);
      }
    });
  }

  addClimb() {

  }

}
