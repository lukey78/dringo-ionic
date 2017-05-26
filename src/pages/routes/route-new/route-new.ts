import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IonicPage, ViewController, NavParams, AlertController } from 'ionic-angular';
import { RoutesProvider } from '../../../providers/routes';

import { Route } from "../../../models/route";
import { TranslateService } from "@ngx-translate/core";
import {RatingsProvider} from "../../../providers/ratings";
import {Rating} from "../../../models/rating";
import {Location} from "../../../models/location";


@IonicPage()
@Component({
  selector: 'page-route-new',
  templateUrl: 'route-new.html',
})
export class RouteNewPage {

  route: Route;
  location: Location;
  ratings: Array<Rating>;

  editForm: FormGroup;
  submitAttempt: boolean;

  constructor(private viewCtrl: ViewController, private navParams: NavParams, private formBuilder: FormBuilder, private routesProvider: RoutesProvider, private alertCtrl: AlertController, private translator: TranslateService, private ratingsProvider: RatingsProvider) {

    this.location = navParams.get('location');
    this.ratings = ratingsProvider.getItems();

    this.editForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(30), Validators.required])],
      sector: [''],
      ratingId: ['', Validators.compose([Validators.required])],
      builder: [''],
      active: ['']
    });

  }

  save() {
    this.submitAttempt = true;
    if (this.editForm.valid) {
      let newRoute = Route.fromForm(this.editForm.value);
      newRoute.locationId = this.location.id;

      let id = this.routesProvider.addItem(newRoute);
      this.viewCtrl.dismiss({ "id": id });
    }
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

}
