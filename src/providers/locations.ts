import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Parse } from 'parse';

import { Location } from '../models/location';

@Injectable()
export class LocationsProvider {

  constructor(public http: Http) {
    console.log('Hello Locations Provider');
    Parse.serverURL = 'http://parse.parse.044adf9d.svc.dockerapp.io:1337/parse'
    Parse.initialize("dringo893278239823747");
  }

  load(): Observable<Location[]> {
    return this.http.get('assets/mock/locations.json')
        .map(res => <Location[]>res.json());
  }

}
