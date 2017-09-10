import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import {AddClimbModule} from "./add-climb/add-climb.module";
import {ClimbingStyleHelpModule} from "../climbing-style-help/climbing-style-help.module";
import {ClimbsPage} from "./climbs";

@NgModule({
  declarations: [
    ClimbsPage,
  ],
  imports: [
    ClimbingStyleHelpModule,
    AddClimbModule,
    IonicPageModule.forChild(ClimbsPage),
    TranslateModule.forChild()
  ],
  exports: [
    ClimbsPage
  ]
})
export class ClimbsModule {}
