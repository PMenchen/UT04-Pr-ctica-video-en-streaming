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


/**
 * Clase que representa una serie
 * Hereda de Production y añade recursos (episodios), ubicaciones y número de temporadas
 */
class Serie extends Production{
    #resources
    #locations
    #seasons

    /**
     * Constructor de la clase Serie
     * @param {string} title - Título de la serie
     * @param {Date} publication - Fecha de publicación
     * @param {string} nationality - Nacionalidad (opcional)
     * @param {string} synopsis - Sinopsis (opcional)
     * @param {string} image - URL de la imagen (opcional)
     * @param {Array<Resource>} resources - Array de recursos/episodios (opcional)
     * @param {Array<Coordinate>} locations - Array de ubicaciones de filmación (opcional)
     * @param {number} seasons - Número de temporadas (opcional)
     */
    constructor(title, publication, nationality = "", synopsis = "", image = "", resources = [], locations = [], seasons = 0) {
        // Llamar al constructor de la clase padre
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

    /**
     * Método para añadir un recurso/episodio a la serie
     * @param {Resource} resource - Recurso a añadir
     */
    addResource(resource) {
        this.#resources.push(resource);
    }

    /**
     * Método para añadir una ubicación de filmación
     * @param {Coordinate} coordinate - Coordenada a añadir
     */
    addLocation(coordinate) {
        this.#locations.push(coordinate);
    }

    /**
     * Representación en cadena de texto de la serie
     * @returns {string} Cadena con el prefijo [Serie], información de la producción y número de temporadas
     */
    toString() {
        return `[Serie] ${super.toString()}${this.#seasons > 0 ? " - " + this.#seasons + " temporadas" : ""}`;
    }
}

export default Serie;