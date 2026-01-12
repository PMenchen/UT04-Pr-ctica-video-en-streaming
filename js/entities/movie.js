"use strict";

import Production from "./production";

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
        if (!Array.isArray(value)) throw new Error("Las ubicaciones deben ser un array");

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