"use strict";

import{
    BaseException,
    InvalidAccessConstructorException,
    InvalidValueException,
    EmptyValueException,
    RequiredValueException,
    CategoryExistsException,
    CategoryNotExistsException,
    UserExistsException,
    UserNotExistsException,
    ProductionExistsException,
    ProductionNotExistsException,
    PersonExistsException,
    PersonNotExistsException,
    InvalidParameterException
} from "./exceptions.js";

import Person from "./entities/person.js";
import Category from "./entities/category.js";
import Resource from "./entities/resource.js";
import Production from "./entities/production.js";
import Movie from "./entities/movie.js";
import Serie from "./entities/serie.js";
import User from "./entities/user.js";
import Coordinates from "./entities/coordinate.js";

let VideoSystem = (function(){
    let instance;

    function createInstance() {
        
        class VideoSystem{
            #name;
            #users;
            #productions;
            #categories;
            #actors;
            #directors;
            #productionCategories; // Relación producción-categorías
            #productionDirectors; // Relación producción-directores
            #productionActors; // Relación producción-actores (con personajes)
            #defaultCategory;

            constructor (name = "VideoSystem"){
                if (!new.target) throw new InvalidAccessConstructorException();

                this.#name = name;
                this.#users = [];
                this.#productions = [];
                this.#categories = [];
                this.#actors = [];
                this.#directors = [];
                this.#productionCategories = new Map();
                this.#productionDirectors = new Map();
                this.#productionActors = new Map();

                this.#defaultCategory = new Category("Sin categoría", "Producciones sin categoría asignada");
                this.#categories.push(this.#defaultCategory);
            }

            //Getter/Setter name
            get name(){
                return this.#name;
            }

            set name(value){
                if (!value) throw new EmptyValueException("name");
                this.#name = value;
            }

            // ============= MÉTODOS DE CATEGORÍAS ================
            
            get categories(){
                let self = this;
                return {
                    *[Symbol.iterator](){
                        for(let category of self.#categories){
                            yield category;
                        }
                    }
                }
            }

            addCategory(...categories){
                for(let category of categories){
                    if(!category || !(category instanceof Category)) throw new Error("La categoría no es válida");

                    let exists = this.#categories.some((c) => c.name === category.name);
                    if (exists) throw new CategoryExistsException(category);

                    this.#categories.push(category);
                }

                return this.#categories.length;
            }

            removeCategory(...categories){
                for(let category of categories){
                    if(!category || !(category instanceof Category)) throw new InvalidParameterException("category");

                    let index = this.#categories.findIndex((c) => c.name === category.name);
                    if (index === -1) throw new CategoryNotExistsException(category);

                    if (this.#productionCategories.has(category)) {
                        let productions = this.#productionCategories.get(category);
                        if (!this.#productionCategories.has(this.#defaultCategory)) {
                            this.#productionCategories.set(this.#defaultCategory, []);
                        }
                        this.#productionCategories.get(this.#defaultCategory).push(...productions);
                        this.#productionCategories.delete(category);
                    }

                    this.#categories.splice(index, 1);
                    
                }

                return this.#categories.length;
            }


            // ============= MÉTODOS DE USUARIOS ============
            
            get users(){
                let self = this;
                return{
                    *[Symbol.iterator](){
                        for (let user of self.#users){
                            yield user;
                        }
                    }
                }
            }

            addUser(...users){
                for(let user of users){
                    if(!user || !(user instanceof User)) throw new InvalidParameterException("user");

                    // Verificar username único
                    if (this.#users.some((u) => u.username === user.username)) {
                        throw new UserExistsException(user);
                    }

                    // Verificar email único
                    if (this.#users.some((u) => u.email === user.email)) {
                        throw new UserExistsException(user);
                    }

                    this.#users.push(user);
                }

                return this.#users.length;
            }

            removeUser(...users) {
                for (let user of users) {
                    if (!user || !(user instanceof User)) {
                        throw new InvalidParameterException("user");
                    }

                    let index = this.#users.findIndex((u) => u.username === user.username);
                    if (index === -1) throw new UserNotExistsException(user);

                    this.#users.splice(index, 1);
                }
                return this.#users.length;
            }


            //  ================= MÉTODOS DE PRODUCCIONES  =============

            get productions(){
                let self = this;
                return {
                    *[Symbol.iterator](){
                        for(let production of self.#productions){
                            yield production;
                        }
                    }
                }
            }

            addProduction(...productions) {
                for (let production of productions) {
                    if (!production || !(production instanceof Production)) throw new InvalidParameterException("production");

                    // Verificar si ya existe
                    let exists = this.#productions.some((p) => p.title === production.title);
                    if (exists) throw new ProductionExistsException(production);

                    this.#productions.push(production);
                }
                return this.#productions.length;
            }

            removeProduction(...productions) {
                for (let production of productions) {
                    if (!production || !(production instanceof Production)) throw new InvalidParameterException("production");

                    let index = this.#productions.findIndex((p) => p.title === production.title);
                    if (index === -1) throw new ProductionNotExistsException(production);
                    
                    // Eliminar relaciones
                    for (let [key, value] of this.#productionCategories.entries()) {
                        let prodIndex = value.findIndex((p) => p.title === production.title);
                        if (prodIndex !== -1) {
                            value.splice(prodIndex, 1);
                        }
                    }

                    for (let [key, value] of this.#productionDirectors.entries()) {
                        let prodIndex = value.findIndex((p) => p.title === production.title);
                        if (prodIndex !== -1) {
                            value.splice(prodIndex, 1);
                        }
                    }

                    for (let [key, value] of this.#productionActors.entries()) {
                        let prodIndex = value.findIndex((item) => item.production.title === production.title);
                        if (prodIndex !== -1) {
                            value.splice(prodIndex, 1);
                        }
                    }

                    this.#productions.splice(index, 1);
                }
                return this.#productions.length;
            }

            
            // ========== MÉTODOS DE ACTORES ==========

            get actors() {
                let self = this;
                return {
                    *[Symbol.iterator]() {
                        for (let actor of self.#actors) {
                            yield actor;
                        }
                    }
                }
            }

            addActor(...actors) {
                for (let actor of actors) {
                    if (!actor || !(actor instanceof Person)) throw new InvalidParameterException("actor");

                    let exists = this.#actors.some((a) => a.name === actor.name && a.lastname1 === actor.lastname1);
                    if (exists) {
                        throw new PersonExistsException(actor);
                    }

                    this.#actors.push(actor);
                }
                return this.#actors.length;
            }

            removeActor(...actors) {
                for (let actor of actors) {
                    if (!actor || !(actor instanceof Person)) throw new InvalidParameterException("actor");

                    let index = this.#actors.findIndex((a) => a.name === actor.name && a.lastname1 === actor.lastname1);
                    if (index === -1) {
                        throw new PersonNotExistsException(actor);
                    }

                    // Eliminar relaciones
                    this.#productionActors.delete(actor);

                    this.#actors.splice(index, 1);
                }
                return this.#actors.length;
            }


            // ============ MÉTODOS DE DIRECTORES ====================

            get directors() {
                let self = this;
                return {
                    *[Symbol.iterator]() {
                        for (let director of self.#directors) {
                            yield director;
                        }
                    }
                }
            }

            addDirector(...directors){
                for (let director of directors){
                    if (!director || !(director instanceof Person)) throw new InvalidParameterException("director");

                    let exists = this.#directors.some((d) => d.name === director.name && d.lastname1 === director.lastname1);
                    if (exists) throw new PersonExistsException(director);

                    this.#directors.push(director);
                }

                return this.#directors.length;
            }

            removeDirector(...directors) {
                for (let director of directors) {
                    if (!director || !(director instanceof Person)) throw new InvalidParameterException("director");

                    let index = this.#directors.findIndex((d) => d.name === director.name && d.lastname1 === director.lastname1);
                    if (index === -1) throw new PersonNotExistsException(director);

                    // Eliminar relaciones
                    this.#productionDirectors.delete(director);

                    this.#directors.splice(index, 1);
                }
                return this.#directors.length;
            }


            // ========== MÉTODOS DE ASIGNACIÓN ==========

            assignCategory(category, ...productions){
                if (!category) throw new EmptyValueException("category");

                if (productions.length === 0) throw new InvalidParameterException("production");

                //añadir categoría si no existe
                if (!this.#categories.some((c) => c.name === category.name)) {
                    this.addCategory(category);
                }

                if (!this.#productionCategories.has(category)) {
                    this.#productionCategories.set(category, []);
                }

                for (let production of productions) {
                    if (!production) throw new InvalidParameterException("production");

                    //añadir producción si no existe
                    if (!this.#productions.some((p) => p.title === production.title)) {
                        this.addProduction(production);
                    }

                    // Evitar duplicados
                    let categoryProds = this.#productionCategories.get(category);
                    if (!categoryProds.some((p) => p.title === production.title)) {
                        categoryProds.push(production);
                    }
                }

                return this.#productionCategories.get(category).length;
                
            }

            deassignCategory(category, ...productions) {
                if (!category) throw new InvalidParameterException("category");
                if (productions.length === 0) throw new InvalidParameterException("production");

                if (!this.#productionCategories.has(category)) return 0;

                let categoryProds = this.#productionCategories.get(category);
                for (let production of productions) {
                    if (!production) throw new InvalidParameterException("production");

                    let index = categoryProds.findIndex((p) => p.title === production.title);
                    if (index !== -1) {
                        categoryProds.splice(index, 1);
                    }
                }

                return categoryProds.length;
            }

            assignDirector(person, ...productions) {
                if (!person) throw new InvalidParameterException("person");
                if (productions.length === 0) throw new InvalidParameterException("production");

                // Añadir director si no existe
                if (!this.#directors.some((d) => d.name === person.name && d.lastname1 === person.lastname1)) {
                    this.addDirector(person);
                }

                if (!this.#productionDirectors.has(person)) {
                    this.#productionDirectors.set(person, []);
                }

                for (let production of productions) {
                    if (!production) throw new InvalidParameterException("production");

                    // Añadir producción si no existe
                    if (!this.#productions.some((p) => p.title === production.title)) {
                        this.addProduction(production);
                    }

                    // Evitar duplicados
                    let directorProds = this.#productionDirectors.get(person);
                    if (!directorProds.some((p) => p.title === production.title)) {
                        directorProds.push(production);
                    }
                }

                return this.#productionDirectors.get(person).length;
            }

            deassignDirector(person, ...productions) {
                if (!person) throw new InvalidParameterException("person");
                if (productions.length === 0) throw new InvalidParameterException("production");

                if (!this.#productionDirectors.has(person)) return 0;

                let directorProds = this.#productionDirectors.get(person);
                for (let production of productions) {
                    if (!production) throw new InvalidParameterException("production");

                    let index = directorProds.findIndex((p) => p.title === production.title);
                    if (index !== -1) {
                        directorProds.splice(index, 1);
                    }
                }

                return directorProds.length;
            }

            assignActor(person, production, character = "") {
                if (!person) throw new InvalidParameterException("person");
                if (!production) throw new InvalidParameterException("production");

                // Añadir actor si no existe
                if (!this.#actors.some((a) => a.name === person.name && a.lastname1 === person.lastname1)) {
                    this.addActor(person);
                }

                // Añadir producción si no existe
                if (!this.#productions.some((p) => p.title === production.title)) {
                    this.addProduction(production);
                }

                if (!this.#productionActors.has(person)) {
                    this.#productionActors.set(person, []);
                }

                // Evitar duplicados
                let actorProds = this.#productionActors.get(person);
                if (!actorProds.some((item) => item.production.title === production.title)) {
                    actorProds.push({ production, character });
                }

                return actorProds.length;
            }

            deassignActor(person, ...productions) {
                if (!person) throw new InvalidParameterException("person");
                if (productions.length === 0) throw new InvalidParameterException("production");

                if (!this.#productionActors.has(person)) return 0;

                let actorProds = this.#productionActors.get(person);
                for (let production of productions) {
                    if (!production) throw new InvalidParameterException("production");

                    let index = actorProds.findIndex((item) => item.production.title === production.title);
                    if (index !== -1) {
                        actorProds.splice(index, 1);
                    }
                }

                return actorProds.length;
            }


            // ========== MÉTODOS DE CONSULTA ===========

            getCast(production) {
                if (!production) throw new InvalidParameterException("production");

                let cast = [];
                for (let [actor, productions] of this.#productionActors.entries()) {
                    let item = productions.find((p) => p.production.title === production.title);
                    if (item) {
                        cast.push({ actor, character: item.character });
                    }
                }

                return {
                    *[Symbol.iterator]() {
                        for (let item of cast) {
                            yield item;
                        }
                    }
                }
            }

            getProductionsDirector(person) {
                if (!person) throw new InvalidParameterException("person");

                let productions = this.#productionDirectors.get(person) || [];

                return {
                    *[Symbol.iterator]() {
                        for (let production of productions) {
                            yield production;
                        }
                    }
                }
            }

            getProductionsActor(person) {
                if (!person) throw new InvalidParameterException("person");

                let productions = this.#productionActors.get(person) || [];

                return {
                    *[Symbol.iterator]() {
                        for (let item of productions) {
                            yield item;
                        }
                    }
                }
            }

            getProductionsCategory(category) {
                if (!category) throw new InvalidParameterException("category");

                let productions = this.#productionCategories.get(category) || [];

                return {
                    *[Symbol.iterator]() {
                        for (let production of productions) {
                            yield production;
                        }
                    }
                }
            }


            // =========== MÉTODOS CREATE =================

            createPerson(name, lastname1, born, lastname2 = "", picture = "") {
                // Buscar si ya existe
                let existing =
                    this.#actors.find((p) => p.name === name && p.lastname1 === lastname1) ||
                    this.#directors.find((p) => p.name === name && p.lastname1 === lastname1);

                if (existing) return existing;

                // Crear nueva persona
                return new Person(name, lastname1, born, lastname2, picture);
            }

            createProduction(type, title, publication, nationality = "", synopsis = "", image = ""){
                //Buscar si ya existe
                let exists = this.#productions.find((p) => p.title === title);
                if (exists) return exists;

                //Crear nueva producción según el tipo
                if (type === "movie") {
                    return new Movie(title, publication, nationality, synopsis, image);
                } else if (type === "serie") {
                    return new Serie (title, publication, nationality, synopsis, image);
                } else {
                    throw new Error ("Tipo de producción no válido");
                }
            }

            createUser(username, email, password) {
                // Buscar si ya existe
                let exists = this.#users.find((u) => u.username === username);
                if (exists) return exists;

                // Crear nuevo usuario
                return new User(username, email, password);
            }

            createCategory(name, description = "") {
                // Buscar si ya existe
                let exists = this.#categories.find((c) => c.name === name);
                if (exists) return exists;

                // Crear nueva categoría
                return new Category(name, description);
            }


            // ======== MÉTODOS DE BÚSQUEDA Y FILTRADO ==========

            findProductions(filterFn, sortFn = null){
                let result = this.#productions.filter(filterFn);

                if (sortFn) result = result.sort(sortFn);

                return {
                    *[Symbol.iterator](){
                        for (let production of result) {
                            yield production;
                        }
                    }
                }
            }

            filterProductionsInCategory (category, filterFn = null, sortFn = null){
                if (!category) throw new InvalidParameterException("category");

                let categoryProds = this.#productionCategories.get(category);
                if (!categoryProds) throw new CategoryNotExistsException(category);

                let result = filterFn ? categoryProds.filter(filterFn) : [...categoryProds];

                if (sortFn) result = result.sort(sortFn);

                return{
                    *[Symbol.iterator](){
                        for (let production of result){
                            yield production;
                        }
                    }
                }

            }

        }

        return new VideoSystem ("Video en streaming");
    }

    return {
        getInstance: (name = "VideoSystem") => {
            if (!instance) {
                instance = createInstance();
                if (name !== "VideoSystem") {
                    instance.name = name;
                }
            }
            return instance;
        }
    }
})();

export default VideoSystem;
