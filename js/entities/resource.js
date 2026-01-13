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
 * Clase que representa un recurso de video
 * Almacena la duración y el enlace al video
 */
class Resource {

    #duration;
    #link;

    /**
     * Constructor de la clase Resource
     * @param {number} duration - Duración del video en minutos (obligatorio)
     * @param {string} link - Enlace al recurso de video (obligatorio)
     */
    constructor(duration, link) {
        if (duration === undefined || duration === null) throw new RequiredValueException("duration");
        if(typeof duration !== "number" || Number.isNaN(duration)) throw new InvalidValueException("duration", "number", duration);
        if (!link) throw new RequiredValueException("link");
        
        this.#duration = duration;
        this.#link = link;
    }

    // Getters
    get duration() {
        return this.#duration;
    }

    get link() {
        return this.#link;
    }

    // Setters
    set duration(value) {
        if (value === undefined || value === null) throw new EmptyValueException("duration");
        if (Number.isNaN(value) || typeof value !== "number") {
            throw new InvalidValueException("duration", "number", value);
        }
        this.#duration = value;
    }

    set link(value) {
        if (!value) throw new EmptyValueException("link");
        this.#link = value;
    }

    /**
     * Representación en cadena de texto del recurso
     * @returns {string} Cadena formateada con el enlace y duración
     */
    toString() {
        return `Recurso: ${this.#link} - (${this.#duration} min)`;
    }
}

export default Resource;