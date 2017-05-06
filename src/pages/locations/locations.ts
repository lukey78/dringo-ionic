import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LocationsProvider } from '../../providers/locations';
import { Location } from '../../models/location';

import { LocationDetailPage } from './location-detail/location-detail';
import { Observable } from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {

  locations: Observable<Location[]>;

  constructor(private navCtrl: NavController, public navParams: NavParams, private locationsProvider: LocationsProvider) {
    this.locations = locationsProvider.getItems();
  }
  
  edit(location: Location) {
    this.navCtrl.push(LocationDetailPage, { "id": location.id })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Locations');
  }

}
