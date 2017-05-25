import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { User } from '../models/user';

import { AfoObjectObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

@Injectable()
export class UserProvider {

  constructor(public http: Http, public db: AngularFireOfflineDatabase) {
  }

  getItem(key: string): Observable<User> {
    return this.db.object('/users/' + key).map(User.fromJson);
  }

  // updates or creates User if it doesn't exist yet
  updateOrCreateItemOnLogin(fbUser: firebase.User) {
    let key = fbUser.uid;

    this.db.object('/users/' + key).subscribe( obj => {
      if (obj.$exists()) {
        //console.log("item exists, updating");
        let existingUser = User.fromJson(obj);
        existingUser.updateAfterLogin(fbUser);
        //console.log(existingUser);
        this.db.object('/users/' + key).update(existingUser);
      } else {
        //console.log("item does not exist, creating");
        this.db.object('/users/' + key).set(User.fromLoginData(fbUser));
      }
    });
  }

  updateItem(key: string, item: User) {
    this.db.object('/users/' + key).update(item);
  }

}
