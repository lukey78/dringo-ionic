export class Route {

    private nameCanonical: string;

    constructor(
        public id: string,
        public locationId: string,
        public name: string,
        public ratingId: number,
        public sector: string,
        public builder: string,
        public active: boolean,
        public createdById: string,
        public createdByName: string
    ) {
        this.updateCanonicals();
    }

    static fromForm(data) {
        return new Route(null, null, data.name,  data.ratingId, data.sector, data.builder, true,  "", "");
    }

    public updateFromForm(data) {
        this.name = data.name;
        this.sector = data.sector;
        this.builder = data.builder;
        this.active = data.active == "true";
        this.ratingId = data.ratingId;
        this.updateCanonicals();
    }

    static fromJsonList(array): Route[] {
        return array.map(Route.fromJson);
    }

    static fromJson({$key, locationId, name, ratingId, sector, builder, active, createdById, createdByName}):Route {
        return new Route($key, locationId, name, ratingId, sector, builder, active, createdById, createdByName);
    }

    private updateCanonicals() {
        if (this.name) {
            this.nameCanonical = this.name.toLocaleLowerCase();
        }
    }
}
