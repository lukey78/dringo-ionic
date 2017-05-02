import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationsPage } from './locations';

import { LocationEditModule } from './location-edit/location-edit.module';
import { LocationDetailModule } from './location-detail/location-detail.module';

@NgModule({
  declarations: [
    LocationsPage
  ],
  imports: [
    LocationEditModule,
    LocationDetailModule,
    IonicPageModule.forChild(LocationsPage),
  ],
  exports: [
    LocationsPage
  ]
})
export class LocationsModule {}
