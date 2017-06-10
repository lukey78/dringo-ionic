import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClimbingStyleHelp } from './climbing-style-help';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ClimbingStyleHelp,
  ],
  imports: [
    IonicPageModule.forChild(ClimbingStyleHelp),
    TranslateModule.forChild()
  ],
  exports: [
    ClimbingStyleHelp
  ]
})
export class ClimbingStyleHelpModule {}
