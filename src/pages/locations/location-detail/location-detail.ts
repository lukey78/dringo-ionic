import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { LocationEditPage } from "../location-edit/location-edit";
import { LocationsProvider } from '../../../providers/locations';
import { Location } from '../../../models/location';
import {RoutesPage} from "../../routes/routes";
import {RoutesProvider} from "../../../providers/routes";
import {Observable} from "rxjs/Observable";
import {Route} from "../../../models/route";


@IonicPage()
@Component({
  selector: 'page-location-detail',
  templateUrl: 'location-detail.html',
})
export class LocationDetailPage {

  location: Location;
  routeCount: Observable<number>;
  routes: Observable<Route[]>;

  constructor(public navCtrl: NavController, private navParams: NavParams, private modalCtrl: ModalController, private locationProvider: LocationsProvider, private routesProvider: RoutesProvider) {
  }

  ionViewDidEnter() {
    this.locationProvider.getItem(this.navParams.get('id')).subscribe(item => {
      this.location = item;
      this.routes = this.routesProvider.getItems(this.location.id);
    });

  }

  openEditModal() {
    let editModal = this.modalCtrl.create(LocationEditPage, { "id": this.location.id });
    editModal.onDidDismiss(data => {
      if (data && 'delete' in data && data.delete === true) {
        this.navCtrl.popToRoot();
      }
    });
    editModal.present();
  }

  openRoutes() {
    this.navCtrl.push(RoutesPage, { "location": this.location })
  }

}
