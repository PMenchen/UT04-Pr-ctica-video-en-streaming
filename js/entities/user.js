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
 * Clase que representa un usuario del sistema
 * Almacena credenciales de acceso
 */
class User {
    #username;
    #email;
    #password;

    
    /**
     * Constructor de la clase User
     * @param {string} username - Nombre de usuario (obligatorio)
     * @param {string} email - Correo electrónico (obligatorio)
     * @param {string} password - Contraseña (obligatorio)
     */
    constructor(username, email, password) {
        if (!username) throw new RequiredValueException("username");
        if (!email) throw new RequiredValueException("email");
        if (!password) throw new RequiredValueException("password");

        this.#username = username;
        this.#email = email;
        this.#password = password;
    }

    // Getters
    get username() {
        return this.#username;
    }

    get email() {
        return this.#email;
    }

    get password() {
        return this.#password;
    }

    // Setters
    set username(value) {
        if (!value) throw new EmptyValueException("username");
        this.#username = value;
    }

    set email(value) {
        if (!value) throw new EmptyValueException("email");
        this.#email = value;
    }

    set password(value) {
        if (!value) throw new EmptyValueException("password");
        this.#password = value;
    }

    /**
     * Representación en cadena de texto del usuario
     * @returns {string} Cadena formateada con el nombre de usuario y email
     */
    toString() {
        return `Usuario: ${this.#username} - (${this.#email})`;
    }
}

export default User;
