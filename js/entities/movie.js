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

import Production from "./production.js";

class Movie extends Production {
    #resource;
    #locations;

    constructor (title, publication, nationality = "", synopsis = "", image = "", resource = null, locations = []){
        super(title, publication, nationality, synopsis, image);
        this.#resource = resource;
        this.#locations = locations;
    }

    //Getters
    get resource(){
        return this.#resource;
    }

    get locations(){
        return this.#locations;
    }

    //Setters
    set resource(value){
        this.#resource = value;
    }

    set locations(value){
        if (!Array.isArray(value)) 
            throw new InvalidValueException("locations", "array", value);

        this.#locations = value;
    }

    //Método para añadir una ubicación
    addLocation(coordinate){
        this.#locations.push(coordinate);
    }

    toString(){
        return `[Película] ${super.toString()}`;
    }
}

export default Movie;