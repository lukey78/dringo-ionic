import {Md5} from 'ts-md5/dist/md5';

export class User {

    private nameCanonical: string;

    constructor(
        public id: string,
        public name: string,
        public email: string,
        public city: string,
        public country: string,
        public language: string,
        public imageUrl: string
    ) {
        this.updateCanonicals();
    }

    static fromNone() {
        return new User("", "", "", "", "", "", "");
    }

    static fromLoginData(data: firebase.User) {
        return new User(Md5.hashStr(data.email).toString(), data.displayName, data.email, "", "de", "de", data.photoURL);
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

    static fromJson({$key, name, email, city, country, language, imageUrl}):User {
        return new User(Md5.hashStr(email).toString(), name, email, city ? city : "", country, language, imageUrl);
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
