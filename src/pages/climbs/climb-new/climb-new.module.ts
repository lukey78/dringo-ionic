import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import {Ionic2RatingModule} from "ionic2-rating";
import {ClimbNewPage} from "./climb-new";

@NgModule({
  declarations: [
    ClimbNewPage,
  ],
  imports: [
    Ionic2RatingModule,
    IonicPageModule.forChild(ClimbNewPage),
    TranslateModule.forChild()
  ],
  exports: [
    ClimbNewPage
  ]
})
export class ClimbNewModule {}
