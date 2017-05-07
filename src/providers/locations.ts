import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Location } from '../models/location';

@Injectable()
export class LocationsProvider {

  items: FirebaseListObservable<any>;

  constructor(public http: Http, public db: AngularFireDatabase) {
    console.log('Hello Locations Provider');
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

  addItem(item: Location) {
    this.items.push(item);
  }

  updateItem(key: string, item: Location) {
    this.items.update(key, item);
  }

  deleteItem(key: string) {
    this.items.remove(key);
  }

  deleteEverything() {
    this.items.remove();
  }
}
