"use strict";

import{
    InvalidAccessConstructorException,
    InvalidValueException,
    EmptyValueException,
    InvalidParameterException,
    RequiredValueException,
    CategoryExistsException,
    CategoryNotExistsException,
    UserExistsException,
    UserNotExistsException,
    ProductionExistsException,
    ProductionNotExistsException,
    PersonExistsException,
    PersonNotExistsException
} from "../exceptions.js";

class Coordinate {
    #latitude
    #longitude

    constructor(latitude, longitude) {
        if (latitude === undefined || latitude === null) throw new RequiredValueException("latitude");
        if (typeof latitude !== "number" || Number.isNaN(latitude)) throw new InvalidValueException("latitude", "number", latitude);

        if (longitude === undefined || longitude === null) throw new RequiredValueException("longitude");
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
        if (value=== undefined || value === null) throw new EmptyValueException("latitude");
        if (typeof value !== "number" || Number.isNaN(value)) throw new InvalidValueException("latitude", "number", value);
        this.#latitude = value;
    }

    set longitude(value) {
        if (value=== undefined || value === null) throw new EmptyValueException("longitude");
        if (typeof value !== "number" || Number.isNaN(value)) throw new InvalidValueException("longitude", "number", value);
        this.#longitude = value;
    }

    toString() {
        return `Coordenadas: (${this.#latitude}, ${this.#longitude})`;
    }
}

export default Coordinate;
