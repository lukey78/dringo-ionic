import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import {ClimbPage} from "./climb";
import {ChooseLocationModule} from "./choose-location/choose-location.module";
import {ChooseRouteModule} from "./choose-route/choose-route.module";
import {AddClimbModule} from "./add-climb/add-climb.module";
import {ClimbingStyleHelpModule} from "../climbing-style-help/climbing-style-help.module";
import {ViewClimbsModule} from "./view-climbs/view-climbs.module";

@NgModule({
  declarations: [
    ClimbPage,
  ],
  imports: [
    ChooseLocationModule,
    ChooseRouteModule,
    ClimbingStyleHelpModule,
    AddClimbModule,
    ViewClimbsModule,
    IonicPageModule.forChild(ClimbPage),
    TranslateModule.forChild()
  ],
  exports: [
    ClimbPage
  ]
})
export class ClimbModule {}
