import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IonicPage, ViewController, NavParams, App, AlertController, NavController} from 'ionic-angular';
import { LocationsProvider } from '../../../providers/locations';
import { TabsPage } from '../../tabs/tabs';

import { Location } from "../../../models/location";

@IonicPage()
@Component({
  selector: 'page-location-edit',
  templateUrl: 'location-edit.html',
})
export class LocationEditPage {

  location: Location;

  editForm: FormGroup;
  submitAttempt: boolean;

  constructor(private viewCtrl: ViewController, public navCtrl: NavController, private navParams: NavParams, private formBuilder: FormBuilder, private locationsProvider: LocationsProvider, private alertCtrl: AlertController) {

    locationsProvider.getItem(navParams.get('id')).subscribe(item => {
      this.location = item
    });

    this.editForm = formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(30), Validators.required])],
      city: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      country: [''],
      indoor: ['', Validators.compose([Validators.required])]
    });
  }

  save() {
    this.submitAttempt = true;
    if (this.editForm.valid) {
      this.locationsProvider.updateItem(this.location.id, this.location);
      this.viewCtrl.dismiss();
    }
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  delete() {
    let me = this;

    this.presentConfirm(this.location.name, "Möchten Sie diesen Ort wirklich löschen?", function() {
      me.locationsProvider.deleteItem(me.location.id);
      me.viewCtrl.dismiss({ "delete": true });
    })
  }

  presentConfirm(title: string, message: string, okHandler: Function) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Ok',
          handler: () => {
            okHandler()
          }
        }
      ]
    });
    alert.present();
  }


  ionViewCanLeave() {
    this.submitAttempt = true;
    return this.editForm.valid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationEdit');
  }

}
