import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import {ChooseLocationPage} from "./choose-location";

@NgModule({
  declarations: [
    ChooseLocationPage
  ],
  imports: [
    IonicPageModule.forChild(ChooseLocationPage),
    TranslateModule.forChild()
  ],
  exports: [
    ChooseLocationPage
  ]
})
export class ChooseLocationModule {}
