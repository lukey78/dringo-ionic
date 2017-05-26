import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { RoutesPage } from './routes';

import { RouteNewModule } from './route-new/route-new.module';
import { RouteEditModule } from './route-edit/route-edit.module';
import { RouteDetailModule } from './route-detail/route-detail.module';

@NgModule({
  declarations: [
    RoutesPage
  ],
  imports: [
    RouteNewModule,
    RouteEditModule,
    RouteDetailModule,
    IonicPageModule.forChild(RoutesPage),
    TranslateModule.forChild()
  ],
  exports: [
    RoutesPage
  ]
})
export class RoutesModule {}
