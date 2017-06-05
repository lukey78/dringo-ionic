import { Component } from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, ViewController} from 'ionic-angular';


import { RouteDetailPage } from './route-detail/route-detail';
import { Observable } from "rxjs/Observable";
import {Route} from "../../../models/route";
import {RoutesProvider} from "../../../providers/routes";
import {RatingsProvider} from "../../../providers/ratings";
import {RouteNewPage} from "../../routes/route-new/route-new";
import {Location} from "../../../models/location";

@IonicPage()
@Component({
  selector: 'page-choose-route',
  templateUrl: 'choose-route.html',
})
export class ChooseRoutePage {

  location: Location;
  routes: Observable<Route[]>;

  constructor(private navCtrl: NavController, public navParams: NavParams,  private modalCtrl: ModalController, private routesProvider: RoutesProvider, public ratingsProvider: RatingsProvider, private viewCtrl: ViewController) {
  }

  ionViewDidEnter() {
    this.location = this.navParams.get('location');
    this.routes = this.routesProvider.getItems(this.location.id);
  }

  getItems(ev: any) {
    let val = ev.target.value;
    this.routes = this.routesProvider.getItemsFilteredByName(this.location.id, val);
  }

  choose(route: Route) {
    this.viewCtrl.dismiss(route)
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  add() {
    let editModal = this.modalCtrl.create(RouteNewPage, { "location": this.location });
    editModal.present();
  }

  ionViewDidLoad() {
  }

}
