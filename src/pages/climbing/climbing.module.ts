import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import {ClimbingPage} from "./climbing";
import {ChooseLocationModule} from "./choose-location/choose-location.module";
import {ChooseRouteModule} from "./choose-route/choose-route.module";
import {ClimbingStyleHelpModule} from "../climbing-style-help/climbing-style-help.module";
import {ClimbsModule} from "../climbs/climbs.module";

@NgModule({
  declarations: [
    ClimbingPage,
  ],
  imports: [
    ChooseLocationModule,
    ChooseRouteModule,
    ClimbingStyleHelpModule,
    ClimbsModule,
    IonicPageModule.forChild(ClimbingPage),
    TranslateModule.forChild()
  ],
  exports: [
    ClimbingPage
  ]
})
export class ClimbingModule {}
