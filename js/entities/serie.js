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

import Production from "./production.js";

class Serie extends Production{
    #resources
    #locations
    #seasons

    constructor(title, publication, nationality = "", synopsis = "", image = "", resources = [], locations = [], seasons = 0) {
        super(title, publication, nationality, synopsis, image);
        this.#resources = resources;
        this.#locations = locations;
        this.#seasons = seasons;
    }

    // Getters
    get resources() {
        return this.#resources;
    }

    get locations() {
        return this.#locations;
    }

    get seasons() {
        return this.#seasons;
    }

    // Setters
    set resources(value) {
        if (!Array.isArray(value)) {
            throw new InvalidValueException("resources", "array", value);
        }
        this.#resources = value;
    }

    set locations(value) {
        if (!Array.isArray(value)) {
            throw new InvalidValueException("locations", "array", value);
        }
        this.#locations = value;
    }

    set seasons(value) {
        if (typeof value !== "number" || Number.isNaN(value)) {
            throw new InvalidValueException("seasons", "number", value);
        }
        this.#seasons = value;
    }

    // Métodos auxiliares
    addResource(resource) {
        this.#resources.push(resource);
    }

    addLocation(coordinate) {
        this.#locations.push(coordinate);
    }

    toString() {
        return `[Serie] ${super.toString()}${this.#seasons > 0 ? " - " + this.#seasons + " temporadas" : ""}`;
    }
}

export default Serie;