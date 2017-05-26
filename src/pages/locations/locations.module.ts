import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { LocationsPage } from './locations';

import { LocationNewModule } from './location-new/location-new.module';
import { LocationEditModule } from './location-edit/location-edit.module';
import { LocationDetailModule } from './location-detail/location-detail.module';
import {RoutesModule} from "../routes/routes.module";

@NgModule({
  declarations: [
    LocationsPage
  ],
  imports: [
    LocationNewModule,
    LocationEditModule,
    LocationDetailModule,
    RoutesModule,
    IonicPageModule.forChild(LocationsPage),
    TranslateModule.forChild()
  ],
  exports: [
    LocationsPage
  ]
})
export class LocationsModule {}
