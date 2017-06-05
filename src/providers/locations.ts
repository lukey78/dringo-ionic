import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Location } from '../models/location';
import { AuthService } from "./auth-service";

import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import {RoutesProvider} from "./routes";


@Injectable()
export class LocationsProvider {

  items: AfoListObservable<any>;

  constructor(public http: Http, public db: AngularFireOfflineDatabase, private auth: AuthService, private routesProvider: RoutesProvider) {
    this.items = this.db.list('/locations', {
      query: {
        orderByChild: 'nameCanonical'
      }
    });
  }

  getItems(): Observable<Location[]> {
    return this.items.map(Location.fromJsonList);
  }

  getItem(key: string): Observable<Location> {
    return this.db.object('/locations/' + key).map(Location.fromJson);
  }

  addItem(item: Location): string {
    item.createdById = this.auth.getUserId();
    item.createdByName = this.auth.getUserName();
    return this.items.push(item).key;
  }

  updateItem(key: string, item: Location) {
    this.items.update(key, item);
  }

  deleteItem(key: string) {
    this.routesProvider.deleteForLocation(key);
    this.items.remove(key);
  }

  deleteEverything() {
    this.items.remove();
  }
}
