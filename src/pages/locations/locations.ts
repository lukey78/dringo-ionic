import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LocationsProvider } from '../../providers/locations';
import { Location } from '../../models/location';

import { LocationDetailPage } from './location-detail/location-detail';

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {

  locations: Location[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private locationsProvider: LocationsProvider) {
    locationsProvider.load().subscribe(locations => {
      this.locations = locations;
    })
  }
  
  edit(location: Location) {
    this.navCtrl.push(LocationDetailPage, { location });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Locations');
  }

}
