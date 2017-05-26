export class Rating {
    constructor(
      public id: number,
      public french: string,
      public uiaa: string,
      public usa: string
    ) {
    }
}

export class Ratings {
    private items: Array<Rating>;

    private ratings = [
        { "id": 1, "french": "1", "uiaa": "1", "usa": "5.0" },
        { "id": 2, "french": "2", "uiaa": "2", "usa": "5.1" },
        { "id": 3, "french": "3", "uiaa": "3", "usa": "5.2" },
        { "id": 4, "french": "4a", "uiaa": "4", "usa": "5.3" },
        { "id": 5, "french": "4a", "uiaa": "4+", "usa": "5.4" },

        { "id": 6, "french": "4b", "uiaa": "5-", "usa": "5.5" },
        { "id": 7, "french": "4c", "uiaa": "5", "usa": "5.6" },
        { "id": 8, "french": "5a", "uiaa": "5+", "usa": "5.7" },

        { "id": 9, "french": "5b", "uiaa": "6-", "usa": "5.8" },
        { "id": 10, "french": "5c", "uiaa": "6", "usa": "5.9" },
        { "id": 11, "french": "5c+", "uiaa": "6(+)", "usa": "5.9(+)" },
        { "id": 12, "french": "6a", "uiaa": "6+", "usa": "5.10a" },

        { "id": 13, "french": "6a+", "uiaa": "7-", "usa": "5.10b" },
        { "id": 14, "french": "6b", "uiaa": "7", "usa": "5.10c/d" },
        { "id": 15, "french": "6b+", "uiaa": "7+", "usa": "5.11a" },
        { "id": 16, "french": "6c", "uiaa": "8-", "usa": "5.11b" },
        { "id": 17, "french": "6c+", "uiaa": "8(-)", "usa": "5.11c" },

        { "id": 18, "french": "7a", "uiaa": "8", "usa": "5.11d" },
        { "id": 19, "french": "7a+", "uiaa": "8(+)", "usa": "5.12a" },
        { "id": 20, "french": "7b", "uiaa": "8+", "usa": "5.12b" },
        { "id": 21, "french": "7b+", "uiaa": "9-", "usa": "5.12c" },
        { "id": 22, "french": "7c", "uiaa": "9", "usa": "5.12d" },
        { "id": 23, "french": "7c+", "uiaa": "9(+)", "usa": "5.13a" },

        { "id": 20, "french": "8a", "uiaa": "9+", "usa": "5.13b" },
        { "id": 21, "french": "8a+", "uiaa": "10-", "usa": "5.13c" },
        { "id": 22, "french": "8b", "uiaa": "10", "usa": "5.13d" },
        { "id": 23, "french": "8b+", "uiaa": "10+", "usa": "5.14a" },
        { "id": 24, "french": "8c", "uiaa": "11-", "usa": "5.14b" },
        { "id": 25, "french": "8c+", "uiaa": "11(-)", "usa": "5.14c" },

        { "id": 26, "french": "9a", "uiaa": "11", "usa": "5.14d" },
        { "id": 27, "french": "9a+", "uiaa": "11(+)", "usa": "5.15a" },
        { "id": 28, "french": "9b", "uiaa": "11+", "usa": "5.15b" },
        { "id": 29, "french": "9b+", "uiaa": "12-", "usa": "5.15c" },
        { "id": 30, "french": "9c", "uiaa": "12", "usa": "5.15d" }
    ];

    constructor() {
        let me = this;
        this.items = [];
        this.ratings.forEach(function(r) {
            me.items[r.id] = new Rating(r.id, r.french, r.uiaa, r.usa);
        });
    }

    public getItems() {
        return this.items;
    }

    public getItem(id) {
        return this.items[id];
    }
}
