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
 * Clase que representa una categoría de contenido
 * Utilizada para clasificar producciones (películas y series)
 */
class Category {
    #name;
    #description;

    /**
     * Constructor de la clase Category
     * @param {string} name - Nombre de la categoría (obligatorio)
     * @param {string} description - Descripción de la categoría (opcional)
     */
    constructor(name, description = " "){
        if (!name) throw new RequiredValueException("name");

        this.#name = name;
        this.#description = description;
    }

    // Getters
    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    // Setters
    set name(value) {
        if (!value) throw new EmptyValueException("name");
        this.#name = value;
    }

    set description(value) {
        this.#description = value;
    }

    /**
     * Representación en cadena de texto de la categoría
     * @returns {string} Cadena formateada con el nombre y descripción
     */
    toString() {
        return `Categoría: ${this.#name}${this.#description ? " - " + this.#description : ""}`;
    }
}

export default Category;