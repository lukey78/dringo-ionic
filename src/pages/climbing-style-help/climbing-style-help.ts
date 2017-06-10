import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-climbing-style-help',
  templateUrl: 'climbing-style-help.html',
})
export class ClimbingStyleHelp {

  constructor(private viewCtrl: ViewController) {
  }

  ok() {
    this.viewCtrl.dismiss();
  }
}
