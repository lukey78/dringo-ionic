import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationDetailPage } from './location-detail';

@NgModule({
  declarations: [
    LocationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationDetailPage),
  ],
  exports: [
    LocationDetailPage
  ]
})
export class LocationDetailModule {}
