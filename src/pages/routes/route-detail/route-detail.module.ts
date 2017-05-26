import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RouteDetailPage } from './route-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RouteDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RouteDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    RouteDetailPage
  ]
})
export class RouteDetailModule {}
