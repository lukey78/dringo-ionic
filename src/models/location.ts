export class Location {

    private nameCanonical: string;

    constructor(
        public id: string,
        public name: string,
        public city: string,
        public country: string,
        public indoor: boolean,
        public routeCount: number,
        public createdById: string,
        public createdByName: string
    ) {
        if (this.name) {
            this.nameCanonical = name.toLocaleLowerCase();
        }
        this.createdById = "";
        this.createdByName = "";
    }

    static fromForm(data) {
        return new Location(null, data.name, data.city, data.country, data.indoor == "true", 0, "", "");
    }

    public updateFromForm(data) {
        this.name = data.name;
        this.nameCanonical = this.name.toLocaleLowerCase();
        this.city = data.city;
        this.country = data.country;
        this.indoor = data.indoor == "true";
    }

    static fromJsonList(array): Location[] {
        return array.map(Location.fromJson);
    }

    static fromJson({$key, name, city, country, indoor, createdById, createdByName}):Location {
        return new Location($key, name, city, country, indoor, 0, createdById, createdByName);
    }
}