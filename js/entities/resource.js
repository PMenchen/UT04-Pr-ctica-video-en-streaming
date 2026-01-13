"use strict";

class Resource {

    #duration;
    #link;

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

    toString() {
        return `Recurso: ${this.#link} - (${this.#duration} min)`;
    }
}

export default Resource;