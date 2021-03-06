import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {RatingsProvider} from "../../providers/ratings";
import {Observable} from "rxjs/Observable";
import {Climb} from "../../models/climb";
import {ClimbsProvider} from "../../providers/climbs";

@IonicPage()
@Component({
  selector: 'page-climbs',
  templateUrl: 'climbs.html',
})
export class ClimbsPage {

  climbs: Observable<Climb[]>;

  constructor(private navCtrl: NavController, public navParams: NavParams,  private modalCtrl: ModalController, private climbsProvider: ClimbsProvider, public ratingsProvider: RatingsProvider) {
  }

  ionViewDidEnter() {
    let user = this.navParams.get('user');
    let route = this.navParams.get('route');
    let filter = this.navParams.get('filter');
    if (filter == 'user_route') {
      this.climbs = this.climbsProvider.getItemsFilteredByUserAndRoute(user.id, route.id);
    }
  }

  getItems(ev: any) {
    let val = ev.target.value;
    //this.climbs = this.climbsProvider.getItemsFilteredByName(this.location.id, val);
  }

}
