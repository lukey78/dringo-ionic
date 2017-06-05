import {Md5} from 'ts-md5/dist/md5';
import {Location} from "./location";

export class User {

    private nameCanonical: string;

    constructor(
        public id: string,
        public name: string,
        public email: string,
        public city: string,
        public country: string,
        public language: string,
        public imageUrl: string,
        public currentLocation: string
    ) {
        this.updateCanonicals();
    }

    static fromNone() {
        return new User("", "", "", "", "", "", "", null);
    }

    static fromLoginData(data: firebase.User) {
        return new User(Md5.hashStr(data.email).toString(), data.displayName, data.email, "", "de", "de", data.photoURL, null);
    }

    public updateAfterLogin(data: firebase.User) {
        this.imageUrl = data.photoURL;
        this.email = data.email;
    }

    public updateFromForm(data) {
        this.name = data.name;
        this.city = data.city ? data.city : "";
        this.country = data.country;
        this.language = data.language ? data.language : "de";
        this.updateCanonicals();
    }

    static fromJson({$key, name, email, city, country, language, imageUrl, currentLocation}):User {
        return new User(Md5.hashStr(email).toString(), name, email, city ? city : "", country, language, imageUrl, currentLocation ? currentLocation : null);
    }
    
    public updateCurrentLocation(loc: Location) {
        this.currentLocation = loc.id;
    }

    public getCurrentLocation() {
        return this.currentLocation;
    }

    public isAnonymous() {
        return false;
    }

    private updateCanonicals() {
        if (this.name) {
            this.nameCanonical = this.name.toLocaleLowerCase();
        }
    }
}
