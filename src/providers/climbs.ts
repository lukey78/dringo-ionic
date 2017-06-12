import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Route } from '../models/route';
import { AuthService } from "./auth-service";

import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import {RatingsProvider} from "./ratings";
import {Subject} from "rxjs/Subject";
import {Climb} from "../models/climb";


@Injectable()
export class ClimbsProvider {

  items: AfoListObservable<any>;
  locationId: string;
  orderSubject: Subject<string>;
  climbsSubject: Subject<string>;

  constructor(public http: Http, public db: AngularFireOfflineDatabase, private auth: AuthService, private ratingsProvider: RatingsProvider) {
    this.climbsSubject = new Subject();
    this.orderSubject = new Subject();

    this.items = this.db.list('/climbs', {
      query: {
        orderByChild: this.orderSubject,
        equalTo: this.climbsSubject
      }
    });
  }

  getItems(locationId: string): Observable<Climb[]> {
    this.climbsSubject.next(locationId);
    return this.items.map(Climb.fromJsonList);
  }

  getItemsFilteredByUserAndRoute(userId: string, routeId: string) {
    this.orderSubject.next('user_route');
    this.climbsSubject.next(userId + '_' + routeId);

    return this.items.map(Climb.fromJsonList);
  }

  getItem(key: string): Observable<Climb> {
    return this.db.object('/climbs/' + key).map(Climb.fromJson);
  }

  addItem(item: Climb): string {
    item.setUser(this.auth.getUserId(), this.auth.getUserName());
    return this.items.push(item).key;
  }

  updateItem(key: string, item: Route) {
    this.items.update(key, item);
  }

  deleteItem(key: string) {
    this.items.remove(key);
  }

  deleteForLocation(locationKey: string) {
    let me = this;

    let itemsToDelete = this.db.list('/climbs', {
      query: {
        orderByChild: 'locationId',
        equalTo: locationKey
      }
    });

    itemsToDelete.first().subscribe(function(res) {
      res.forEach(route => {
        me.db.object(route.$key).remove();
      });
    });
  }

  deleteForRoute(routeKey: string) {
    let me = this;

    let itemsToDelete = this.db.list('/climbs', {
      query: {
        orderByChild: 'routeId',
        equalTo: routeKey
      }
    });

    itemsToDelete.first().subscribe(function(res) {
      res.forEach(route => {
        me.db.object(route.$key).remove();
      });
    });
  }

  deleteEverything() {
    this.items.remove();
  }
}
