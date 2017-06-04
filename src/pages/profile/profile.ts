import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginPage} from "../login/login";
import {UserProvider} from "../../providers/users";
import {User} from "../../models/user";
import {Observable} from "rxjs/Observable";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public user: User;
  editForm: FormGroup;
  submitAttempt: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private viewCtrl: ViewController, private formBuilder: FormBuilder, private userProvider: UserProvider, private translator: TranslateService) {
    auth.getCurrentUser().subscribe(user => {
      this.user = user;
    });
    this.editForm = this.formBuilder.group({
      id: [''],
      language: ['', Validators.compose([Validators.required])],
      city: [''],
      name: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(30), Validators.required])],
      country: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidEnter() {
    this.editForm.patchValue(this.user);
  }

  linkWithGoogle() {
    this.auth.linkWithGoogle().then(userInfo => {
      //this.user = this.auth.getCurrentUser();
      this.editForm.patchValue(this.user);
    });
  }

  linkWithFacebook() {
    this.auth.linkWithFacebook().then(userInfo => {
      //this.user = this.auth.getCurrentUser();
      this.editForm.patchValue(this.user);
    });
  }

  save() {
    if (this.editForm.valid) {
      this.user.updateFromForm(this.editForm.value);
      this.userProvider.updateItem(this.user.email, this.user);
      this.viewCtrl.dismiss();
      this.translator.use(this.user.language);
    }
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  logout() {
    this.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }
}
