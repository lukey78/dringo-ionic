import {NgModule, ErrorHandler} from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireOfflineModule } from 'angularfire2-offline';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import * as firebase from 'firebase/app';

import { MyApp } from './app.component';

import { LocationsModule } from '../pages/locations/locations.module';
import { LocationsPage } from '../pages/locations/locations';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { AuthService } from '../providers/auth-service';
import { LocationsProvider } from '../providers/locations';
import {UserProvider} from "../providers/users";
import {LoginPage} from "../pages/login/login";
import {LoginModule} from "../pages/login/login.module";
import {HomeModule} from "../pages/home/home.module";
import {GooglePlus} from "@ionic-native/google-plus";
import {RoutesProvider} from "../providers/routes";
import {RatingsProvider} from "../providers/ratings";
import {Facebook} from "@ionic-native/facebook";
import {ClimbModule} from "../pages/climb/climb.module";
import {ClimbPage} from "../pages/climb/climb";
import {StatsModule} from "../pages/stats/stats.module";
import {StatsPage} from "../pages/stats/stats";

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyDFqR24vjRDCTg5nFk7ia9L3oefSUpkWXM",
  authDomain: "dringo-f9348.firebaseapp.com",
  databaseURL: "https://dringo-f9348.firebaseio.com",
  projectId: "dringo-f9348",
  storageBucket: "dringo-f9348.appspot.com",
  messagingSenderId: "511139085903"
};

@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireOfflineModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),

    LoginModule,
    LocationsModule,
    ClimbModule,
    StatsModule,
    HomeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    LocationsPage,
    ClimbPage,
    StatsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    LocationsProvider,
    RoutesProvider,
    RatingsProvider,
    UserProvider,
    GooglePlus,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

