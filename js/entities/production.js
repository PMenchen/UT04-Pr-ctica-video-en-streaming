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
 * Clase abstracta que representa una producción audiovisual
 * Clase base para Movie y Serie
 * No se puede instanciar directamente
 */
class Production{
    #title;
    #nationality;
    #publication;
    #synopsis;
    #image;

    /**
     * Constructor de la clase Production
     * @param {string} title - Título de la producción (obligatorio)
     * @param {Date} publication - Fecha de publicación (obligatorio)
     * @param {string} nationality - Nacionalidad de la producción (opcional)
     * @param {string} synopsis - Sinopsis de la producción (opcional)
     * @param {string} image - URL de la imagen (opcional)
     */
    constructor(title, publication, nationality = "", synopsis = "", image = "") {
        // Verificar que no se instancie directamente (clase abstracta)
        if (new.target === Production) {
            throw new Error("Production es una clase abstracta y no puede ser instanciada directamente");
        }

        if (!title) throw new RequiredValueException("title");
        if (!publication) throw new RequiredValueException("publication");
        if (!(publication instanceof Date)) {
            throw new InvalidValueException("publications", "objeto Date", publication);
        }

        this.#title = title;
        this.#nationality = nationality;
        this.#publication = publication;
        this.#synopsis = synopsis;
        this.#image = image;
    }

    // Getters
    get title() {
        return this.#title;
    }

    get nationality() {
        return this.#nationality;
    }

    get publication() {
        return this.#publication;
    }

    get synopsis() {
        return this.#synopsis;
    }

    get image() {
        return this.#image;
    }

    //Setters
    set title(value){
        if (!value) throw new EmptyValueException("title");
        this.#title = value;
    }

    set nationality(value) {
        this.#nationality = value;
    }

    set publication(value) {
        if (!(value instanceof Date)) {
            throw new InvalidValueException("publications", "objeto Date", value);
        }
        this.#publication = value;
    }

    set synopsis(value) {
        this.#synopsis = value;
    }

    set image(value) {
        this.#image = value;
    }

    /**
     * Representación en cadena de texto de la producción
     * @returns {string} Cadena formateada con título, año y nacionalidad
     */
    toString() {
        return `${this.#title} (${this.#publication.getFullYear()})${this.#nationality ? " - " + this.#nationality : ""}`;
    }
}

export default Production;