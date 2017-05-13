import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {User} from "firebase/app";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public user: User;
  editForm: FormGroup;
  submitAttempt: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private viewCtrl: ViewController, private formBuilder: FormBuilder) {
    this.user = auth.getCurrentUser();
    this.editForm = this.formBuilder.group({
      id: [''],
      displayName: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(30), Validators.required])],
      country: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidEnter() {
    this.editForm.patchValue(this.user);
  }

  save() {
    this.viewCtrl.dismiss();

  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}
