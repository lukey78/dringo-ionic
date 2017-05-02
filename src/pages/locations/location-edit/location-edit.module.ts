import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationEditPage } from './location-edit';

@NgModule({
  declarations: [
    LocationEditPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationEditPage),
  ],
  exports: [
    LocationEditPage
  ]
})
export class LocationEditModule {}
