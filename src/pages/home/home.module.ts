import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { HomePage } from './home';
import {ProfileModule} from "../profile/profile.module";

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    ProfileModule,
    IonicPageModule.forChild(HomePage),
    TranslateModule.forChild()
  ],
  exports: [
    HomePage
  ]
})
export class HomeModule {}
