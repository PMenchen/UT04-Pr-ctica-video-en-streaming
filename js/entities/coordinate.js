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

/**
 * Clase que representa coordenadas geográficas
 * Utilizada para almacenar ubicaciones de filmación de producciones
 */
class Coordinate {
    #latitude
    #longitude

    /**
     * Constructor de la clase Coordinate
     * @param {number} latitude - Latitud (obligatoria)
     * @param {number} longitude - Longitud (obligatoria)
     */
    constructor(latitude, longitude) {
        // Validar que la latitud sea obligatoria
        if (latitude === undefined || latitude === null) throw new RequiredValueException("latitude");
        // Validar que la latitud sea un número válido
        if (typeof latitude !== "number" || Number.isNaN(latitude)) throw new InvalidValueException("latitude", "number", latitude);

        // Validar que la longitud sea obligatoria
        if (longitude === undefined || longitude === null) throw new RequiredValueException("longitude");
        // Validar que la longitud sea un número válido
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

    /**
     * Representación en cadena de texto de las coordenadas
     * @returns {string} Cadena formateada con latitud y longitud
     */
    toString() {
        return `Coordenadas: (${this.#latitude}, ${this.#longitude})`;
    }
}

export default Coordinate;
