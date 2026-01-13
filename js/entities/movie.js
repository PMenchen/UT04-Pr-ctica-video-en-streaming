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
 * Clase que representa una película
 * Hereda de Production y añade recurso de video y ubicaciones de filmación
 */
import Production from "./production.js";

class Movie extends Production {
    #resource;
    #locations;

    /**
     * Constructor de la clase Movie
     * @param {string} title - Título de la película
     * @param {Date} publication - Fecha de publicación
     * @param {string} nationality - Nacionalidad (opcional)
     * @param {string} synopsis - Sinopsis (opcional)
     * @param {string} image - URL de la imagen (opcional)
     * @param {Resource} resource - Recurso de video (opcional)
     * @param {Array<Coordinate>} locations - Array de ubicaciones de filmación (opcional)
     */
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

    /**
     * Método para añadir una ubicación de filmación
     * @param {Coordinate} coordinate - Coordenada a añadir
     */
    addLocation(coordinate){
        this.#locations.push(coordinate);
    }
    
    /**
     * Representación en cadena de texto de la película
     * @returns {string} Cadena con el prefijo [Película] y la información de la producción
     */
    toString(){
        return `[Película] ${super.toString()}`;
    }
}

export default Movie;