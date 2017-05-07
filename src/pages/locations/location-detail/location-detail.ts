import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { LocationEditPage } from "../location-edit/location-edit";
import { LocationsProvider } from '../../../providers/locations';
import { Location } from '../../../models/location';


@IonicPage()
@Component({
  selector: 'page-location-detail',
  templateUrl: 'location-detail.html',
})
export class LocationDetailPage {

  location: Location;

  constructor(public navCtrl: NavController, private navParams: NavParams, private modalCtrl: ModalController, private locationProvider: LocationsProvider) {
  }

  ionViewDidEnter() {
    this.locationProvider.getItem(this.navParams.get('id')).subscribe(item => {
      this.location = item
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationDetail');
  }

}
