import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { RouteEditPage } from "../route-edit/route-edit";
import { RoutesProvider } from '../../../providers/routes';
import { Route } from '../../../models/route';
import {Location} from "../../../models/location";
import {Rating} from "../../../models/rating";
import {RatingsProvider} from "../../../providers/ratings";


@IonicPage()
@Component({
  selector: 'page-route-detail',
  templateUrl: 'route-detail.html',
})
export class RouteDetailPage {

  route: Route;
  rating: Rating;
  location: Location;

  constructor(public navCtrl: NavController, private navParams: NavParams, private modalCtrl: ModalController, private routeProvider: RoutesProvider, private ratingsProvider: RatingsProvider) {
  }

  ionViewDidEnter() {
    this.location = this.navParams.get('location');
    this.routeProvider.getItem(this.navParams.get('id')).subscribe(item => {
      this.route = item;
      this.rating = this.ratingsProvider.getItem(item.ratingId);
    });
  }

  openEditModal() {
    let editModal = this.modalCtrl.create(RouteEditPage, { "id": this.route.id });
    editModal.onDidDismiss(data => {
      if (data && 'delete' in data && data.delete === true) {
        this.navCtrl.popToRoot();
      }
    });
    editModal.present();
  }

}
