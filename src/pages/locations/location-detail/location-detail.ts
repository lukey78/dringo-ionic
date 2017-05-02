import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Location } from "../../../models/location";
import { LocationEditPage } from "../location-edit/location-edit";


@IonicPage()
@Component({
  selector: 'page-location-detail',
  templateUrl: 'location-detail.html',
})
export class LocationDetailPage {

  location: Location;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.location = navParams.get('location');
  }

  openEditModal() {
    let editModal = this.modalCtrl.create(LocationEditPage, { "location": this.location });
    editModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationDetail');
  }

}
