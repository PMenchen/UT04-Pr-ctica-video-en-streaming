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
                for (const production of productions) {
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

        }
    }
});

