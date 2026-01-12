"use strict";

class Resource {

    #duration;
    #link;

    constructor(duration, link) {
        if (!duration) throw new RequiredValueException("duration");
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
        if (!value) throw new EmptyValueException("duration");
        if (Number.isNaN(duration) || typeof value !== "number") {
            throw new InvalidValueException("duration", "number", duration);
        }
        this.#duration = value;
    }

    set link(value) {
        if (!value) throw new EmptyValueException("link");
        this.#link = value;
    }

    toString() {
        return `Recurso: ${this.#link} - (${this.#duration} min)`;
    }
}

export default Resource;