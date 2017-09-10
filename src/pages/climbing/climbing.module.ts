import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import {ClimbingPage} from "./climbing";
import {ChooseLocationModule} from "./choose-location/choose-location.module";
import {ChooseRouteModule} from "./choose-route/choose-route.module";
import {AddClimbModule} from "./add-climb/add-climb.module";
import {ClimbingStyleHelpModule} from "../climbing-style-help/climbing-style-help.module";
import {ViewClimbsModule} from "./view-climbs/view-climbs.module";

@NgModule({
  declarations: [
    ClimbingPage,
  ],
  imports: [
    ChooseLocationModule,
    ChooseRouteModule,
    ClimbingStyleHelpModule,
    AddClimbModule,
    ViewClimbsModule,
    IonicPageModule.forChild(ClimbingPage),
    TranslateModule.forChild()
  ],
  exports: [
    ClimbingPage
  ]
})
export class ClimbingModule {}
