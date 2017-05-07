import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationNewPage } from './location-new';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LocationNewPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationNewPage),
    TranslateModule.forChild()
  ],
  exports: [
    LocationNewPage
  ]
})
export class LocationNewModule {}
