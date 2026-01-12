"use strict";

class Category {
    #name;
    #description;

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

    toString() {
        return `Categoría: ${this.#name}${this.#description ? " - " + this.#description : ""}`;
    }
}

export default Category;