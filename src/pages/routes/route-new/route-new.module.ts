import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RouteNewPage } from './route-new';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RouteNewPage,
  ],
  imports: [
    IonicPageModule.forChild(RouteNewPage),
    TranslateModule.forChild()
  ],
  exports: [
    RouteNewPage
  ]
})
export class RouteNewModule {}
