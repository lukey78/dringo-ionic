import {Route} from "./route";
import {Location} from "./location";
import * as moment from 'moment';

export enum ClimbingStyle {
    Onsight = 1,
    Redpoint = 2,
    Attempt = 3
}

export class Climb {

    public id: string;
    public locationId: string;
    public locationName: string;
    public locationIndoor: boolean;
    public routeId: string;
    public routeName: string;
    public routeRatingId: number;
    public date: string;
    public realRatingId: number;
    public style: number;
    public blocks: number;
    public myRating: number;
    public comment: string;
    public createdById: string;
    public createdByName: string;

    private user_date: string;
    private user_route: string;
    private user_location_date: string;
    private user_location_route: string;
    private user_rating: string;
    private user_location_rating: string;
    private user_style_rating: string;
    private user_location_style: string;

    constructor(
      id: string,
      date: string,
      realRatingId: number,
      style: any,
      blocks: any,
      myRating: number,
      comment: string
    ) {
        this.id = id;
        this.date = moment(date).format('YYYY-MM-DD');
        this.realRatingId = realRatingId;
        this.style = parseInt(style);
        this.blocks = parseInt(blocks);
        this.myRating = myRating;
        this.comment = comment;
    }

    static fromForm(data, location: Location, route: Route) {
        let climb = new Climb(null, data.datetime, data.realRatingId, data.style, data.blocks, data.myRating, data.comment);

        climb.locationId = location.id;
        climb.locationName = location.name;
        climb.locationIndoor = location.indoor;

        climb.routeId = route.id;
        climb.routeName = route.name;
        climb.routeRatingId = route.ratingId;

        climb.updateCanonicals();

        return climb;
    }

    public setUser(userId, userName) {
        this.createdById = userId;
        this.createdByName = userName;
        this.updateCanonicals();
    }

    public updateFromForm(data) {
        this.updateCanonicals();
    }

    static fromJsonList(array): Climb[] {
      array.sort(function(a, b) {
        return moment(a.date) < moment(b.date);
      });

      return array.map(Climb.fromJson);
    }

    static fromJson({$key, locationId, locationName, locationIndoor, routeId, routeName, routeRatingId, date, realRatingId, style, blocks, myRating, comment, createdById, createdByName}):Climb {
        let climb = new Climb($key, date, realRatingId, style, blocks, myRating, comment);

        climb.locationId = locationId;
        climb.locationName = locationName;
        climb.locationIndoor = locationIndoor;

        climb.routeId = routeId;
        climb.routeName = routeName;
        climb.routeRatingId = routeRatingId;

        climb.createdByName = createdByName;
        climb.createdById = createdById;

        return climb;
    }

    private updateCanonicals() {
        this.user_location_date = this.createdById + '_' + this.locationId + '_' + this.date;
        this.user_date = this.createdById + '_' + this.date;
        this.user_route = this.createdById + '_' + this.routeId;
        this.user_location_rating = this.createdById + '_' + this.locationId + '_' + this.routeRatingId;
        this.user_location_route = this.createdById + '_' + this.locationId + '_' + this.routeId;
        this.user_location_style = this.createdById + '_' + this.locationId + '_' + this.style;
        this.user_rating = this.createdById + '_' + this.routeRatingId;
        this.user_style_rating = this.createdById + '_' + this.style + '_' + this.routeRatingId;
    }
    
    public getLocalDate() {
        return moment(this.date).format('DD.MM.YYYY')
    }

}
