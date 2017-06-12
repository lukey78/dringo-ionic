import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewClimbs } from './view-climbs';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ViewClimbs
  ],
  imports: [
    IonicPageModule.forChild(ViewClimbs),
    TranslateModule.forChild()
  ],
  exports: [
    ViewClimbs
  ]
})
export class ViewClimbsModule {}
