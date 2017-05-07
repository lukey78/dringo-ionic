import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IonicPage, ViewController, NavParams, AlertController } from 'ionic-angular';
import { LocationsProvider } from '../../../providers/locations';

import { Location } from "../../../models/location";
import { TranslateService } from "@ngx-translate/core";


@IonicPage()
@Component({
  selector: 'page-location-new',
  templateUrl: 'location-new.html',
})
export class LocationNewPage {

  location: Location;

  editForm: FormGroup;
  submitAttempt: boolean;

  constructor(private viewCtrl: ViewController, private navParams: NavParams, private formBuilder: FormBuilder, private locationsProvider: LocationsProvider, private alertCtrl: AlertController, private translator: TranslateService) {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(30), Validators.required])],
      city: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      indoor: ['', Validators.compose([Validators.required])]
    });
  }

  save() {
    this.submitAttempt = true;
    if (this.editForm.valid) {
      let newLocation = Location.fromForm(this.editForm.value);
      let id = this.locationsProvider.addItem(newLocation);
      this.viewCtrl.dismiss({ "id": id });
    }
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

}
