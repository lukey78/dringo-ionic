import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { User } from '../models/user';

import { AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class UserProvider {

  constructor(public http: Http, public db: AngularFireOfflineDatabase) {
  }

  getItem(email: string): Observable<User> {
    return this.db.object('/users/' + Md5.hashStr(email)).map(User.fromJson);
  }

  // updates or creates User if it doesn't exist yet
  updateOrCreateItemOnLogin(fbUser: firebase.User) {
    let key = Md5.hashStr(fbUser.email);

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

  updateItem(email: string, item: User) {
    this.db.object('/users/' + Md5.hashStr(email)).update(item);
  }

}
