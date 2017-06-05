import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';

import { LocationsProvider } from '../../providers/locations';
import { Location } from '../../models/location';

import { LocationDetailPage } from './location-detail/location-detail';
import { Observable } from "rxjs/Observable";
import {LocationNewPage} from "./location-new/location-new";


@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {

  locations: Observable<Location[]>;

  constructor(private navCtrl: NavController, public navParams: NavParams,  private modalCtrl: ModalController, private locationsProvider: LocationsProvider) {
  }

  ionViewDidEnter() {
    this.locations = this.locationsProvider.getItems();
  }
  
  edit(location: Location) {
    this.navCtrl.push(LocationDetailPage, { "id": location.id })
  }

  add() {
    let editModal = this.modalCtrl.create(LocationNewPage, {});
    editModal.present();

    editModal.onDidDismiss(data => {
      if (data && 'id' in data) {
        this.navCtrl.push(LocationDetailPage, { "id": data.id })
      }
    });
  }

  ionViewDidLoad() {
  }

}
