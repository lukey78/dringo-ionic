import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IonicPage, ViewController, NavParams, AlertController } from 'ionic-angular';
import { RoutesProvider } from '../../../providers/routes';

import { Route } from "../../../models/route";
import { TranslateService } from "@ngx-translate/core";
import {Rating} from "../../../models/rating";
import {RatingsProvider} from "../../../providers/ratings";


@IonicPage()
@Component({
  selector: 'page-route-edit',
  templateUrl: 'route-edit.html',
})
export class RouteEditPage {

  route: Route;
  ratings: Array<Rating>;

  editForm: FormGroup;
  submitAttempt: boolean;

  constructor(private viewCtrl: ViewController, private navParams: NavParams, private formBuilder: FormBuilder, private routesProvider: RoutesProvider, private alertCtrl: AlertController, private translator: TranslateService, private ratingsProvider: RatingsProvider) {
    this.ratings = ratingsProvider.getItems();

    this.editForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(30), Validators.required])],
      sector: [''],
      ratingId: ['', Validators.compose([Validators.required])],
      builder: [''],
      active: ['']
    });
  }

  ionViewDidEnter() {
    this.routesProvider.getItem(this.navParams.get('id')).subscribe(item => {
      this.route = item;
      this.editForm.patchValue(item);
    });
  }

  save() {
    this.submitAttempt = true;
    if (this.editForm.valid) {
      this.route.updateFromForm(this.editForm.value);
      this.routesProvider.updateItem(this.route.id, this.route);
      this.viewCtrl.dismiss();
    }
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  delete() {
    let me = this;

    this.presentConfirm(this.route.name, this.translator.instant('route.delete.confirm'), function() {
      me.routesProvider.deleteItem(me.route.id);
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

}
