import { Component } from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, ViewController} from 'ionic-angular';

import { Observable } from "rxjs/Observable";
import {LocationsProvider} from "../../../providers/locations";
import {Location} from "../../../models/location";


@IonicPage()
@Component({
  selector: 'page-choose-location',
  templateUrl: 'choose-location.html',
})
export class ChooseLocationPage {

  locations: Observable<Location[]>;

  constructor(private navCtrl: NavController, public navParams: NavParams,  private viewCtrl: ViewController, private locationsProvider: LocationsProvider) {
  }

  ionViewDidEnter() {
    this.locations = this.locationsProvider.getItems();
  }

  choose(loc: Location) {
    this.viewCtrl.dismiss(loc);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
  }

}
