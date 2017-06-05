import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

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

  getItemsFilteredByName(locationId: string, searchTerm: string): Observable<Route[]> {
    if (searchTerm.length > 0) {
      this.locationSubject.next(locationId);
      return this.items.map(data => data.filter(item => item.nameCanonical.indexOf(searchTerm.toLowerCase()) > -1)).map(Route.fromJsonList);
    } else {
      return this.getItems(locationId);
    }
  }

  /** there's no simple way to just query the count, so we query all and return the count... pff
  getItemCount(locationId: string): Observable<number> {
    /**
    this.locationSubject.next(locationId);

    return Observable.create(observer => {
      this.items.subscribe(data => {
        observer.next(data.length);
        observer.complete();
      });
    });
  }
  */

  getItem(key: string): Observable<Route> {
    return this.db.object('/routes/' + key).map(Route.fromJson);
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

  deleteForLocation(locationKey: string) {
    let me = this;

    let itemsToDelete = this.db.list('/routes', {
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

  deleteEverything() {
    this.items.remove();
  }
}
