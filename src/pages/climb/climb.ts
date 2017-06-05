import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-climb',
  templateUrl: 'climb.html',
})
export class ClimbPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private translator: TranslateService) {
  }

  ionViewDidEnter() {
  }

}
