import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IonicPage, ViewController, NavParams, AlertController } from 'ionic-angular';
import { LocationsProvider } from '../../../providers/locations';

import { Location } from "../../../models/location";
import { TranslateService } from "@ngx-translate/core";


@IonicPage()
@Component({
  selector: 'page-location-edit',
  templateUrl: 'location-edit.html',
})
export class LocationEditPage {

  location: Location;

  editForm: FormGroup;
  submitAttempt: boolean;

  constructor(private viewCtrl: ViewController, private navParams: NavParams, private formBuilder: FormBuilder, private locationsProvider: LocationsProvider, private alertCtrl: AlertController, private translator: TranslateService) {
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(30), Validators.required])],
      city: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      indoor: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidEnter() {
    this.locationsProvider.getItem(this.navParams.get('id')).subscribe(item => {
      this.location = item;
      this.editForm.patchValue(item);
    });
  }

  save() {
    this.submitAttempt = true;
    if (this.editForm.valid) {
      this.location.updateFromForm(this.editForm.value);
      this.locationsProvider.updateItem(this.location.id, this.location);
      this.viewCtrl.dismiss();
    }
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  delete() {
    let me = this;

    this.presentConfirm(this.location.name, this.translator.instant('location.delete.confirm'), function() {
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
          text: this.translator.instant('controls.cancel'),
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: this.translator.instant('controls.ok'),
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
