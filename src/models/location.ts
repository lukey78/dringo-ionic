export class Location {


    constructor(
        public id: string,
        public name: string,
        public city: string,
        public country: string,
        public indoor: boolean,
        public routeCount: number
    ) {
    }

    public updateFromForm(data) {
        this.id = data.id;
        this.name = data.name;
        this.city = data.city;
        this.country = data.country;
        this.indoor = data.indoor == "true";
    }

    static fromJsonList(array): Location[] {
        return array.map(Location.fromJson);
    }

    static fromJson({$key, name, city, country, indoor}):Location {
        return new Location($key, name, city, country, indoor, 0);
    }
}