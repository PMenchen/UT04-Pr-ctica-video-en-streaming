"use strict";

class Person {
    #name;
    #lastname1;
    #lastname2;
    #born;
    #picture;

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

    toString() {
        return `Persona: ${this.#name} - ${this.#lastname1}${this.#lastname2 ? " - " + this.#lastname2 : ""} - (${this.#born.toLocaleDateString()})`;
    }
}

export default Person;