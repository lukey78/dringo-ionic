import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {IonicPage, ViewController, NavParams, AlertController, ModalController} from 'ionic-angular';

import { TranslateService } from "@ngx-translate/core";
import {Route} from "../../../models/route";
import {Rating} from "../../../models/rating";
import {RatingsProvider} from "../../../providers/ratings";
import { ClimbingStyle } from "../../../models/climb";
import {ClimbingStyleHelp} from "../../climbing-style-help/climbing-style-help";

@IonicPage()
@Component({
  selector: 'page-add-climb',
  templateUrl: 'add-climb.html',
})
export class AddClimbPage {

  route: Route;
  realRatings: Array<Rating>;

  editForm: FormGroup;
  submitAttempt: boolean;

  constructor(private viewCtrl: ViewController, private navParams: NavParams, private modalCtrl: ModalController, private formBuilder: FormBuilder,  private alertCtrl: AlertController, private translator: TranslateService, private ratingsProvider: RatingsProvider) {

    this.route = navParams.get('route');
    this.realRatings = ratingsProvider.getItemsForRealRating(this.route.ratingId);

    this.editForm = this.formBuilder.group({
      datetime: [new Date().toISOString(), Validators.compose([Validators.required])],
      realRatingId: [this.route.ratingId, Validators.compose([Validators.required])],
      style: ['', Validators.compose([Validators.required])],
      blocks: [0, Validators.compose([Validators.required])],
      comment: [''],
      rating: ['', Validators.compose([Validators.required, Validators.pattern('[1-5]')])]
    }, {
      "validator": this.validateBlocks
    });
  }

  validateBlocks(g: FormGroup): ValidationErrors {
    if (g.controls.style.value == ClimbingStyle.Attempt && g.controls.blocks.value == 0) {
      g.controls.blocks.setErrors({
        "noBlockValue": true
      });
    } else {
      g.controls.blocks.setErrors(null);
    }

    return null;
  }

  save() {
    this.submitAttempt = true;
    if (this.editForm.valid) {
      console.log("ok, saved");
      /**
      let newClimb = Route.fromForm(this.editForm.value);
      newRoute.locationId = this.location.id;

      let id = this.routesProvider.addItem(newRoute);
      this.viewCtrl.dismiss({ "id": id });
       */
    }
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  openStyleHelp() {
    let infoModal = this.modalCtrl.create(ClimbingStyleHelp);
    infoModal.present();
  }

}
