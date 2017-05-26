import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RouteEditPage } from './route-edit';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RouteEditPage,
  ],
  imports: [
    IonicPageModule.forChild(RouteEditPage),
    TranslateModule.forChild()
  ],
  exports: [
    RouteEditPage
  ]
})
export class RouteEditModule {}
