import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import {StatsPage} from "./stats";

@NgModule({
  declarations: [
    StatsPage,
  ],
  imports: [
    IonicPageModule.forChild(StatsPage),
    TranslateModule.forChild()
  ],
  exports: [
    StatsPage
  ]
})
export class StatsModule {}
