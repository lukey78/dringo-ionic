export class Location {

    private nameCanonical: string;

    constructor(
        public id: string,
        public name: string,
        public city: string,
        public country: string,
        public indoor: boolean,
        public createdById: string,
        public createdByName: string
    ) {
        if (this.name) {
            this.nameCanonical = name.toLocaleLowerCase();
        }
    }

    static fromForm(data) {
        return new Location(null, data.name, data.city, data.country, data.indoor == "true", "", "");
    }

    public updateFromForm(data) {
        this.name = data.name;
        this.city = data.city;
        this.country = data.country;
        this.indoor = data.indoor == "true";
    }

    static fromJsonList(array): Location[] {
        return array.map(Location.fromJson);
    }

    static fromJson({$key, name, city, country, indoor, createdById, createdByName}):Location {
        return new Location($key, name, city, country, indoor, createdById ? createdById  :"", createdByName ? createdByName : "");
    }
}
