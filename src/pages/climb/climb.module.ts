import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import {ClimbPage} from "./climb";

@NgModule({
  declarations: [
    ClimbPage,
  ],
  imports: [
    IonicPageModule.forChild(ClimbPage),
    TranslateModule.forChild()
  ],
  exports: [
    ClimbPage
  ]
})
export class ClimbModule {}
