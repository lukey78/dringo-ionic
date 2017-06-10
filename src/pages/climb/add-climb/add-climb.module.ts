import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import {AddClimbPage} from "./add-climb";
import {Ionic2RatingModule} from "ionic2-rating";

@NgModule({
  declarations: [
    AddClimbPage,
  ],
  imports: [
    Ionic2RatingModule,
    IonicPageModule.forChild(AddClimbPage),
    TranslateModule.forChild()
  ],
  exports: [
    AddClimbPage
  ]
})
export class AddClimbModule {}
