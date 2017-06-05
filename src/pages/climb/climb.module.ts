import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import {ClimbPage} from "./climb";
import {ChooseLocationModule} from "./choose-location/choose-location.module";

@NgModule({
  declarations: [
    ClimbPage,
  ],
  imports: [
    ChooseLocationModule,
    IonicPageModule.forChild(ClimbPage),
    TranslateModule.forChild()
  ],
  exports: [
    ClimbPage
  ]
})
export class ClimbModule {}