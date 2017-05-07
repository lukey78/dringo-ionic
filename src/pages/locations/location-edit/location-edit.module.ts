import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationEditPage } from './location-edit';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LocationEditPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationEditPage),
    TranslateModule.forChild()
  ],
  exports: [
    LocationEditPage
  ]
})
export class LocationEditModule {}
