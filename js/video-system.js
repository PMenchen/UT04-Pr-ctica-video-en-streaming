"use strict";

// Importación de excepciones personalizadas
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
} from "./exceptions.js";

// Importación de entidades del sistema
import Person from "./entities/person.js";
import Category from "./entities/category.js";
import Resource from "./entities/resource.js";
import Production from "./entities/production.js";
import Movie from "./entities/movie.js";
import Serie from "./entities/serie.js";
import User from "./entities/user.js";
import Coordinates from "./entities/coordinate.js";
/**
 * Patrón Singleton para videosystem
 * Garantiza que solo exista una instancia del sistema en toda la aplicación
 */
let VideoSystem  = (() => {
    let instance;

    /**
     * Función que crea la instancia única del sistema
     * @returns {VideoSystem} Instancia del sistema de video
     */
    function createInstance() {
        
        /**
         * Clase principal del sistema de gestión de videosystem
         * Gestiona usuarios, producciones, categorías, actores y directores
         */
        class VideoSystem{
            // Propiedades privadas del sistema
            #name;
            #users;
            #productions;
            #categories;
            #actors;
            #directors;
            #productionCategories; // Map: Relación categoría -> [producciones]
            #productionDirectors; // Map: Relación director -> [producciones]
            #productionActors; // Map: Relación actor -> [{producción, personaje}]
            #defaultCategory;

            /**
             * Constructor del sistema de video
             * @param {string} name - Nombre del sistema (por defecto "VideoSystem")
             */
            constructor (name = "VideoSystem"){
                // Verificar que se use el operador 'new'
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

                // Crear categoría por defecto
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
            
            /**
             * Getter que devuelve un iterador de categorías
             * @returns {Iterator<Category>} Iterador de categorías
             */
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

            /**
             * Añade una o más categorías al sistema
             * @param {...Category} categories - Categorías a añadir
             * @returns {number} Número total de categorías en el sistema
             * @throws {CategoryExistsException} Si la categoría ya existe
             */
            addCategory(...categories){
                for(let category of categories){
                    if(!category || !(category instanceof Category)) throw new Error("La categoría no es válida");

                    let exists = this.#categories.some((c) => c.name === category.name);
                    if (exists) throw new CategoryExistsException(category);

                    this.#categories.push(category);
                }

                return this.#categories.length;
            }

            /**
             * Elimina una o más categorías del sistema
             * Las producciones asociadas se mueven a la categoría por defecto
             * @param {...Category} categories - Categorías a eliminar
             * @returns {number} Número total de categorías restantes
             * @throws {CategoryNotExistsException} Si la categoría no existe
             */
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
            
            /**
             * Getter que devuelve un iterador de usuarios
             * @returns {Iterator<User>} Iterador de usuarios
             */
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

            /**
             * Añade uno o más usuarios al sistema
             * Valida que username y email sean únicos
             * @param {...User} users - Usuarios a añadir
             * @returns {number} Número total de usuarios en el sistema
             * @throws {UserExistsException} Si el usuario ya existe
             */
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

            /**
             * Elimina uno o más usuarios del sistema
             * @param {...User} users - Usuarios a eliminar
             * @returns {number} Número total de usuarios restantes
             * @throws {UserNotExistsException} Si el usuario no existe
             */
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

            /**
             * Getter que devuelve un iterador de producciones
             * @returns {Iterator<Production>} Iterador de producciones
             */
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

            /**
             * Añade una o más producciones al sistema
             * @param {...Production} productions - Producciones a añadir
             * @returns {number} Número total de producciones en el sistema
             * @throws {ProductionExistsException} Si la producción ya existe
             */
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

            /**
             * Elimina una o más producciones del sistema
             * También elimina todas las relaciones asociadas (categorías, directores, actores)
             * @param {...Production} productions - Producciones a eliminar
             * @returns {number} Número total de producciones restantes
             * @throws {ProductionNotExistsException} Si la producción no existe
             */
            removeProduction(...productions) {
                for (let production of productions) {
                    if (!production || !(production instanceof Production)) throw new InvalidParameterException("production");

                    let index = this.#productions.findIndex((p) => p.title === production.title);
                    if (index === -1) throw new ProductionNotExistsException(production);
                    
                    // Eliminar la producción de todas las relaciones con categorías
                    for (let [key, value] of this.#productionCategories.entries()) {
                        let prodIndex = value.findIndex((p) => p.title === production.title);
                        if (prodIndex !== -1) {
                            value.splice(prodIndex, 1);
                        }
                    }

                    // Eliminar la producción de todas las relaciones con directores
                    for (let [key, value] of this.#productionDirectors.entries()) {
                        let prodIndex = value.findIndex((p) => p.title === production.title);
                        if (prodIndex !== -1) {
                            value.splice(prodIndex, 1);
                        }
                    }

                    // Eliminar la producción de todas las relaciones con actores
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

            /**
             * Getter que devuelve un iterador de actores
             * @returns {Iterator<Person>} Iterador de actores
             */
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

            /**
             * Añade uno o más actores al sistema
             * @param {...Person} actors - Actores a añadir
             * @returns {number} Número total de actores en el sistema
             * @throws {PersonExistsException} Si el actor ya existe
             */
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

            /**
             * Elimina uno o más actores del sistema
             * También elimina todas las relaciones del actor con producciones
             * @param {...Person} actors - Actores a eliminar
             * @returns {number} Número total de actores restantes
             * @throws {PersonNotExistsException} Si el actor no existe
             */
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

            /**
             * Getter que devuelve un iterador de directores
             * @returns {Iterator<Person>} Iterador de directores
             */
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

            /**
             * Añade uno o más directores al sistema
             * @param {...Person} directors - Directores a añadir
             * @returns {number} Número total de directores en el sistema
             * @throws {PersonExistsException} Si el director ya existe
             */
            addDirector(...directors){
                for (let director of directors){
                    if (!director || !(director instanceof Person)) throw new InvalidParameterException("director");

                    let exists = this.#directors.some((d) => d.name === director.name && d.lastname1 === director.lastname1);
                    if (exists) throw new PersonExistsException(director);

                    this.#directors.push(director);
                }

                return this.#directors.length;
            }

            /**
             * Elimina uno o más directores del sistema
             * También elimina todas las relaciones del director con producciones
             * @param {...Person} directors - Directores a eliminar
             * @returns {number} Número total de directores restantes
             * @throws {PersonNotExistsException} Si el director no existe
             */
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

            /**
             * Asigna una categoría a una o más producciones
             * Si la categoría o producciones no existen, se añaden automáticamente
             * @param {Category} category - Categoría a asignar
             * @param {...Production} productions - Producciones a las que asignar la categoría
             * @returns {number} Número de producciones en la categoría
             */
            assignCategory(category, ...productions){
                if (!category) throw new EmptyValueException("category");

                if (productions.length === 0) throw new InvalidParameterException("production");

                //añadir categoría si no existe
                if (!this.#categories.some((c) => c.name === category.name)) {
                    this.addCategory(category);
                }

                // Inicializar array de producciones para la categoría si no existe
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

            /**
             * Desasigna una categoría de una o más producciones
             * @param {Category} category - Categoría a desasignar
             * @param {...Production} productions - Producciones de las que desasignar la categoría
             * @returns {number} Número de producciones restantes en la categoría
             */
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

            /**
             * Asigna un director a una o más producciones
             * Si el director o producciones no existen, se añaden automáticamente
             * @param {Person} person - Director a asignar
             * @param {...Production} productions - Producciones a las que asignar el director
             * @returns {number} Número de producciones del director
             */
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

            /**
             * Desasigna un director de una o más producciones
             * @param {Person} person - Director a desasignar
             * @param {...Production} productions - Producciones de las que desasignar el director
             * @returns {number} Número de producciones restantes del director
             */
            deassignDirector(person, ...productions) {
                if (!person) throw new InvalidParameterException("person");
                if (productions.length === 0) throw new InvalidParameterException("production");

                // Si el director no tiene producciones, devolver 0
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

            /**
             * Asigna un actor a una producción con un personaje específico
             * Si el actor o producción no existen, se añaden automáticamente
             * @param {Person} person - Actor a asignar
             * @param {Production} production - Producción a la que asignar el actor
             * @param {string} character - Nombre del personaje (opcional)
             * @returns {number} Número de producciones del actor
             */
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

            /**
             * Desasigna un actor de una o más producciones
             * @param {Person} person - Actor a desasignar
             * @param {...Production} productions - Producciones de las que desasignar el actor
             * @returns {number} Número de producciones restantes del actor
             */
            deassignActor(person, ...productions) {
                if (!person) throw new InvalidParameterException("person");
                if (productions.length === 0) throw new InvalidParameterException("production");

                // Si el actor no tiene producciones, devolver 0
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

            /**
             * Obtiene el reparto (cast) de una producción
             * @param {Production} production - Producción de la que obtener el reparto
             * @returns {Iterator<Object>} Iterador con objetos {actor, character}
             */
            getCast(production) {
                if (!production) throw new InvalidParameterException("production");

                let cast = [];
                // Buscar en todas las relaciones actor-producción
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

            /**
             * Obtiene todas las producciones dirigidas por una persona
             * @param {Person} person - Director del que obtener las producciones
             * @returns {Iterator<Production>} Iterador de producciones
             */
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

            /**
             * Obtiene todas las producciones en las que actúa una persona
             * @param {Person} person - Actor del que obtener las producciones
             * @returns {Iterator<Object>} Iterador con objetos {production, character}
             */
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

            /**
             * Obtiene todas las producciones de una categoría
             * @param {Category} category - Categoría de la que obtener las producciones
             * @returns {Iterator<Production>} Iterador de producciones
             */
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

            /**
             * Crea o devuelve una persona existente
             * Busca primero si ya existe para evitar duplicados
             * @param {string} name - Nombre
             * @param {string} lastname1 - Primer apellido
             * @param {Date} born - Fecha de nacimiento
             * @param {string} lastname2 - Segundo apellido (opcional)
             * @param {string} picture - URL de la foto (opcional)
             * @returns {Person} Instancia de Person (nueva o existente)
             */
            createPerson(name, lastname1, born, lastname2 = "", picture = "") {
                // Buscar si ya existe
                let existing =
                    this.#actors.find((p) => p.name === name && p.lastname1 === lastname1) ||
                    this.#directors.find((p) => p.name === name && p.lastname1 === lastname1);

                if (existing) return existing;

                // Crear nueva persona
                return new Person(name, lastname1, born, lastname2, picture);
            }

            /**
             * Crea o devuelve una producción existente
             * @param {string} type - Tipo de producción ("movie" o "serie")
             * @param {string} title - Título
             * @param {Date} publication - Fecha de publicación
             * @param {string} nationality - Nacionalidad (opcional)
             * @param {string} synopsis - Sinopsis (opcional)
             * @param {string} image - URL de la imagen (opcional)
             * @returns {Production} Instancia de Movie o Serie (nueva o existente)
             */
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

            /**
             * Crea o devuelve un usuario existente
             * @param {string} username - Nombre de usuario
             * @param {string} email - Email
             * @param {string} password - Contraseña
             * @returns {User} Instancia de User (nueva o existente)
             */
            createUser(username, email, password) {
                // Buscar si ya existe
                let exists = this.#users.find((u) => u.username === username);
                if (exists) return exists;

                // Crear nuevo usuario
                return new User(username, email, password);
            }

            /**
             * Crea o devuelve una categoría existente
             * @param {string} name - Nombre de la categoría
             * @param {string} description - Descripción (opcional)
             * @returns {Category} Instancia de Category (nueva o existente)
             */
            createCategory(name, description = "") {
                // Buscar si ya existe
                let exists = this.#categories.find((c) => c.name === name);
                if (exists) return exists;

                // Crear nueva categoría
                return new Category(name, description);
            }


            // ======== MÉTODOS DE BÚSQUEDA Y FILTRADO ==========

            /**
             * Busca producciones que cumplan un criterio y opcionalmente las ordena
             * @param {Function} filterFn - Función de filtrado (recibe production, devuelve boolean)
             * @param {Function} sortFn - Función de ordenamiento (opcional)
             * @returns {Iterator<Production>} Iterador de producciones que cumplen el criterio
             */
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

            /**
             * Filtra y ordena las producciones de una categoría específica
             * @param {Category} category - Categoría a filtrar
             * @param {Function} filterFn - Función de filtrado (opcional)
             * @param {Function} sortFn - Función de ordenamiento (opcional)
             * @returns {Iterator<Production>} Iterador de producciones filtradas
             * @throws {CategoryNotExistsException} Si la categoría no existe
             */
            filterProductionsInCategory (category, filterFn = null, sortFn = null){
                if (!category) throw new InvalidParameterException("category");

                let categoryProds = this.#productionCategories.get(category);
                if (!categoryProds) throw new CategoryNotExistsException(category);

                // Aplicar filtro si se proporciona, sino devolver todas
                let result = filterFn ? categoryProds.filter(filterFn) : [...categoryProds];

                // Aplicar ordenamiento si se proporciona
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

        // Crear y devolver la instancia del sistema
        return new VideoSystem ("Video streaming");
    }

    // Retornar objeto con el método getInstance (patrón Singleton)
    return {
        /**
         * Obtiene la instancia única del sistema
         * @param {string} name - Nombre del sistema (opcional)
         * @returns {VideoSystem} Instancia única del sistema
         */
        getInstance: (name = "VideoSystem") => {
            // Crear la instancia solo si no existe
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
