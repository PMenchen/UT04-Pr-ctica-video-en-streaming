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
 * Clase que representa una persona (actor o director)
 * Almacena información personal y foto
 */
class Person {
    #name;
    #lastname1;
    #lastname2;
    #born;
    #picture;

    /**
     * Constructor de la clase Person
     * @param {string} name - Nombre (obligatorio)
     * @param {string} lastname1 - Primer apellido (obligatorio)
     * @param {string} lastname2 - Segundo apellido (opcional)
     * @param {Date} born - Fecha de nacimiento (obligatorio)
     * @param {string} picture - URL de la foto (opcional)
     */
    constructor(name, lastname1, lastname2 = " ", born, picture = " "){
        if (!name) throw new RequiredValueException("name");
        if (!lastname1) throw new RequiredValueException("lastname1");
        if (!born) throw new RequiredValueException("born");
        if (!(born instanceof Date)) 
            throw new InvalidValueException("born", "objeto Date", born);

        this.#name = name;
        this.#lastname1 = lastname1;
        this.#lastname2 = lastname2;
        this.#born = born;
        this.#picture = picture;
    }

    //Getters
    get name(){
        return this.#name;
    }

    get lastname1() {
        return this.#lastname1;
    }

    get lastname2() {
        return this.#lastname2;
    }

    get born() {
        return this.#born;
    }

    get picture() {
        return this.#picture;
    }

    // Setters
    set name(value) {
        if (!value) throw new EmptyValueException("name");
        this.#name = value;
    }

    set lastname1(value) {
        if (!value) throw new EmptyValueException("lastname1");
        this.#lastname1 = value;
    }

    set lastname2(value) {
        this.#lastname2 = value;
    }

    set born(value) {
        if (!value) throw new EmptyValueException("born");
        if (!(value instanceof Date)) 
            throw new InvalidValueException("born", "objeto Date", value);
        this.#born = value;
    }

    set picture(value) {
        this.#picture = value;
    }

    /**
     * Representación en cadena de texto de la persona
     * @returns {string} Cadena formateada con nombre, apellidos y fecha de nacimiento
     */
    toString() {
        return `Persona: ${this.#name} - ${this.#lastname1}${this.#lastname2 ? " - " + this.#lastname2 : ""} - (${this.#born.toLocaleDateString()})`;
    }
}

export default Person;