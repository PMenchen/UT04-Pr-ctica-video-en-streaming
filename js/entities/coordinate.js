"use strict";

class Coordinate {
    #latitude
    #longitude

    constructor(latitude, longitude) {
        if (!latitude) throw new RequiredValueException("latitude");
        if (typeof latitude !== "number" || Number.isNaN(latitude)) throw new InvalidValueException("latitude", "number", latitude);

        if (!longitude) throw new RequiredValueException("longitude");
        if (typeof longitude !== "number" || Number.isNaN(longitude)) throw new InvalidValueException("longitude", "number", longitude);

        this.#latitude = latitude;
        this.#longitude = longitude;
    }

    // Getters
    get latitude() {
        return this.#latitude;
    }

    get longitude() {
        return this.#longitude;
    }

    // Setters
    set latitude(value) {
        if (!value) throw new EmptyValueException("latitude");
        if (typeof value !== "number" || Number.isNaN(value)) throw new InvalidValueException("latitude", "number", value);
        this.#latitude = value;
    }

    set longitude(value) {
        if (!value) throw new EmptyValueException("longitude");
        if (typeof value !== "number" || Number.isNaN(value)) throw new InvalidValueException("longitude", "number", value);
        this.#longitude = value;
    }

    toString() {
        return `Coordenadas: (${this.#latitude}, ${this.#longitude})`;
    }
}

export default Coordinate;
