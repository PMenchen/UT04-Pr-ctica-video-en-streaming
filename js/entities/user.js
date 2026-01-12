"use strict";

class User {
    #username;
    #email;
    #password;

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

    toString() {
        return `Usuario: ${this.#username} - (${this.#email})`;
    }
}

export default User;
