import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Location } from '../models/location';

@Injectable()
export class LocationsProvider {

  constructor(public http: Http) {
    console.log('Hello Locations Provider');
  }

  load(): Observable<Location[]> {
    return this.http.get('assets/mock/locations.json')
        .map(res => <Location[]>res.json());
  }

}
