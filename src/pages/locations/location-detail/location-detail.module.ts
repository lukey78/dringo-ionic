import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationDetailPage } from './location-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LocationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    LocationDetailPage
  ]
})
export class LocationDetailModule {}
