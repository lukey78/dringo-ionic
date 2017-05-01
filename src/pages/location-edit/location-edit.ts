import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Location } from "../../models/location";

@IonicPage()
@Component({
  selector: 'page-location-edit',
  templateUrl: 'location-edit.html',
})
export class LocationEditPage {

  location: Location;

  editForm: FormGroup;
  submitAttempt: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.location = navParams.get('location');

    this.editForm = formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(30), Validators.required])],
      city: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      indoor: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewCanLeave() {
    this.submitAttempt = true;
    return this.editForm.valid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationEdit');
  }

}
