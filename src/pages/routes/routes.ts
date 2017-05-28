import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';

import { RoutesProvider } from '../../providers/routes';
import { Route } from '../../models/route';

import { RouteDetailPage } from './route-detail/route-detail';
import { Observable } from "rxjs/Observable";
import {RouteNewPage} from "./route-new/route-new";
import {Location} from "../../models/location";
import {RatingsProvider} from "../../providers/ratings";
import {Rating} from "../../models/rating";

@IonicPage()
@Component({
  selector: 'page-routes',
  templateUrl: 'routes.html',
})
export class RoutesPage {

  location: Location;
  routes: Observable<Route[]>;

  constructor(private navCtrl: NavController, public navParams: NavParams,  private modalCtrl: ModalController, private routesProvider: RoutesProvider, public   ratingsProvider: RatingsProvider) {
  }

  ionViewDidEnter() {
    this.location = this.navParams.get('location');
    this.routes = this.routesProvider.getItems(this.location.id);
  }

  getItems(ev: any) {
    let val = ev.target.value;
    this.routes = this.routesProvider.getItemsFilteredByName(this.location.id, val);
  }

  edit(route: Route) {
    this.navCtrl.push(RouteDetailPage, { "id": route.id, "location": this.location })
  }

  add() {
    let editModal = this.modalCtrl.create(RouteNewPage, { "location": this.location });
    editModal.present();
  }

  ionViewDidLoad() {
  }

}
