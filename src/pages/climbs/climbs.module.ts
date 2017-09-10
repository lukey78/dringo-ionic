import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import {ClimbingStyleHelpModule} from "../climbing-style-help/climbing-style-help.module";
import {ClimbsPage} from "./climbs";
import {ClimbNewModule} from "./climb-new/climb-new.module";

@NgModule({
  declarations: [
    ClimbsPage,
  ],
  imports: [
    ClimbingStyleHelpModule,
    ClimbNewModule,
    IonicPageModule.forChild(ClimbsPage),
    TranslateModule.forChild()
  ],
  exports: [
    ClimbsPage
  ]
})
export class ClimbsModule {}
