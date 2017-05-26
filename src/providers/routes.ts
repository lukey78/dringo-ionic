import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Location } from '../models/location';
import { Route } from '../models/route';
import { AuthService } from "./auth-service";

import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import {RatingsProvider} from "./ratings";
import {Subject} from "rxjs/Subject";


@Injectable()
export class RoutesProvider {

  items: AfoListObservable<any>;
  locationId: string;
  locationSubject: Subject<string>;

  constructor(public http: Http, public db: AngularFireOfflineDatabase, private auth: AuthService, private ratingsProvider: RatingsProvider) {
    this.locationSubject = new Subject();

    this.items = this.db.list('/routes', {
      query: {
        orderByChild: 'locationId',
        equalTo: this.locationSubject
      }
    });
  }

  getItems(locationId: string): Observable<Route[]> {
    this.locationSubject.next(locationId);
    return this.items.map(Route.fromJsonList);
  }

  getItem(key: string): Observable<Route> {
    return this.db.object('/route/' + key).map(Route.fromJson);
  }

  addItem(item: Route): string {
    item.createdById = this.auth.getUserId();
    item.createdByName = this.auth.getUserName();
    return this.items.push(item).key;
  }

  updateItem(key: string, item: Route) {
    this.items.update(key, item);
  }

  deleteItem(key: string) {
    this.items.remove(key);
  }

  deleteEverything() {
    this.items.remove();
  }
}
