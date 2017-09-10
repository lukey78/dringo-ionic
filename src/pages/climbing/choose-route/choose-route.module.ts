import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import {ChooseRoutePage} from "./choose-route";
import {RouteNewModule} from "../../routes/route-new/route-new.module";
import {RouteEditModule} from "../../routes/route-edit/route-edit.module";

@NgModule({
  declarations: [
    ChooseRoutePage
  ],
  imports: [
    RouteNewModule,
    RouteEditModule,
    IonicPageModule.forChild(ChooseRoutePage),
    TranslateModule.forChild()
  ],
  exports: [
    ChooseRoutePage
  ]
})
export class ChooseRouteModule {}
