"use strict";

import VideoSystem from "./video-system.js";
import Person from "./entities/person.js";
import Category from "./entities/category.js";
import Movie from "./entities/movie.js";
import Serie from "./entities/serie.js";
import User from "./entities/user.js";
import Resource from "./entities/resource.js";
import Coordinate from "./entities/coordinate.js";
import Production from "./entities/production.js";

(function () {

    /* ================= PATRÓN SINGLETON ================= */
    console.log("\n\n--- Verificar Patrón Singleton ---");
    let system1 = VideoSystem.getInstance("Netflix Clone");
    let system2 = VideoSystem.getInstance("HBO Clone");

    console.log("Sistema 1 === Sistema 2:", system1 === system2);
    console.log("Nombre del sistema1: ", system1.name);
    console.log("Nombre del sistema2: ", system2.name);

    /* ================= CATEGORÍAS ================= */
    console.log("\n\n--- Gestión de Categorías ---");
    let c1 = new Category("Acción", "Películas de acción");
    let c2 = new Category("Drama", "Películas dramáticas");
    let c3 = new Category("Comedia", "Películas de comedia");

    console.log("Añadir categorías:", system1.addCategory(c1, c2, c3));

    try {
        console.log("Añadir categoría duplicada:", system1.addCategory(c1));
    } catch (e) {
        console.log(e.toString());
    }

    console.log("\nListado de categorías")
    for (let cat of system1.categories) {
        console.log(cat.toString())
    }

    /* ================= USUARIOS ================= */
    console.log("\n\n--- Gestión de Usuarios ---");
    let u1 = new User("fernando_00", "fernando00@mail.com", "1234");
    let u2 = new User("aliciamaf51", "aliciamaf51@mail.com", "5678");
    let u3 = new User("jajajabi", "jajajabi@mail.com", "9012");

    console.log("\nAñadir usuario:", system1.addUser(u1, u2, u3));

    console.log("Total de usuarios: ", [...system1.users].length);

    try {
        console.log("Añadir usuario duplicado:", system1.addUser(u1));
    } catch (e) {
        console.log(e.toString());
    }

    try {
        let userDupli1 = new User("fernando_00", "user@mail.com", "patata");
        console.log("Añadir usuario duplicado username:", system1.addUser(userDupli1));
    } catch (e) {
        console.log(e.toString());
    }

    try {
        let userDupli2 = new User("user", "jajajabi@mail.com", "patata");
        console.log("Añadir usuario duplicado mail:", system1.addUser(userDupli2));
    } catch (e) {
        console.log(e.toString());
    }

    console.log("\nListado de usuarios");
    for (let user of system1.users) {
        console.log(user.toString());
    }

    /* ================= PERSONAS (ACTORES Y DIRECTORES) ================= */
    console.log("\n\n--- Personas (Actores y Directores) ---");
    let a1 = new Person("Leonardo", "DiCaprio", "", new Date(1974, 10, 11));
    let a2 = new Person("Tom", "Hanks", "", new Date(1956, 6, 9));
    let a3 = new Person("Christopher", "Lee", "", new Date(1922, 5, 27));
    let d1 = new Person("Christopher", "Nolan", "", new Date(1970, 6, 30));
    let d2 = new Person("Robert", "Zemeckis", "", new Date(1952, 5, 14));

    console.log("\nAñadir actores:", system1.addActor(a1, a2, a3));
    console.log("Añadir directores:", system1.addDirector(d1, d2));

    console.log("Total de actores:", [...system1.actors].length);
    console.log("Total de directores:", [...system1.directors].length);

    console.log("\nListado actores")
    for (let actor of system1.actors) {
        console.log(actor.toString())
    }

    console.log("\nListado directores")
    for (let director of system1.directors) {
        console.log(director.toString())
    }

    /* ================= PRODUCCIONES (PELÍCULAS Y SERIES) ================= */

    console.log("\n\n--- Gestión de Producciones (Películas y series) ---");
    let m1 = new Movie("Inception", new Date(2010, 6, 16), "USA", "Sueños dentro de sueños...");
    let m2 = new Movie("Forrest Gump", new Date(1997, 11, 19), "USA", "Un hombre con un coeficiente intelectual bajo pero con un corazón bondadoso...");
    let m3 = new Movie("El Caballero Oscuro", new Date(2008, 6, 18), "USA", "Bruce debe aceptar una de las pruebas...");

    let s1 = new Serie("Breaking Bad", new Date(2008, 0, 20), "USA", "Profesor de química");
    s1.seasons = 5;
    let s2 = new Serie("Peaky Blinders", new Date(2013, 9, 12), "USA", "Familia de gánsteres");
    s2.seasons = 6;

    m1.resource = new Resource(148, "/videos/inception.mp4");
    m2.resource = new Resource(194, "/videos/forrest-gump.mp4");
    m3.resource = new Resource(152, "/videos/dark-night.mp4");

    s1.addResource(new Resource(47, "/videos/aa-s01e01.mp4"));
    s1.addResource(new Resource(48, "/videos/aa-s01e02.mp4"));

    s2.addResource(new Resource(49, "/videos/bb-s02e01.mp4"));
    s2.addResource(new Resource(55, "/videos/bb-s02e02.mp4"));

    m1.addLocation(new Coordinate(34.0522, -118.2437));
    m2.addLocation(new Coordinate(41.8781, -87.6298));

    console.log("\nAñadir producciónes:", system1.addProduction(m1, m2, m3, s1, s2));

    console.log("Total de producciones:", [...system1.productions].length);

    console.log("\nListado producciones");
    for (let prod of system1.productions) {
        console.log(prod.toString());
    }

    /* ================= ASIGNACIONES ================= */
    console.log("\n\nAsignar categoría Acción:", system1.assignCategory(c1, m1, m3));
    console.log("Asignar categoría Drama:", system1.assignCategory(c2, m2, s1, s2));
    console.log("Asignar categoría Comedia:", system1.assignCategory(c3, m2, s1));

    console.log("\nProducciones en Acción");
    for (let prod of system1.getProductionsCategory(c1)) {
        console.log(prod.title);
    }

    console.log("\nProducciones en Drama");
    for (let prod of system1.getProductionsCategory(c2)) {
        console.log(prod.title);
    }

    console.log("\nProducciones en Comedia");
    for (let prod of system1.getProductionsCategory(c3)) {
        console.log(prod.title);
    }

    // ========== ASIGNAR DIRECTORES ==========
    console.log("\n\n--- Asignar Directores a Producciones ---");
    console.log("\nAsignar director:", system1.assignDirector(d1, m1, m3));
    console.log("\nAsignar director:", system1.assignDirector(d2, m2));


    console.log("\nProducciones de Christopher Nolan:");
    for (let prod of system1.getProductionsDirector(d1)) {
        console.log(prod.title);
    }

    console.log("\nProducciones de Robert Zemeckis:");
    for (let prod of system1.getProductionsDirector(d2)) {
        console.log(prod.title);
    }

    // ========== ASIGNAR ACTORES CON PERSONAJES ==========
    console.log("\n\n--- Asignar Actores con Personajes ---");

    console.log("Asignar actor:", system1.assignActor(a1, m1, "Dom Cobb"));
    console.log("Asignar actor:", system1.assignActor(a1, s2, "John Doe"));
    console.log("Asignar actor:", system1.assignActor(a2, m2, "Forrest Gump"));
    console.log("Asignar actor:", system1.assignActor(a3, s1, "Proffessor"));
    console.log("Asignar actor:", system1.assignActor(a2, m1, "Almirante  Benbow"));

    console.log("\nProducciones de Tom Hanks");
    for (let item of system1.getProductionsActor(a2)) {
        console.log(`${item.production.title} como "${item.character}"`);
    }

    console.log("\nReparto de Inception");
    for (let cast of system1.getCast(m1)) {
        console.log(`${cast.actor.name} ${cast.actor.lastname1} como "${cast.character}"\n`);
    }

    // ========== MÉTODOS FLYWEIGHT (CREATE) ==========
    console.log("\n\n--- Patrón Flyweight (Métodos Create) ---");

    let existingActor = system1.createPerson("Tom", "Hanks", "", new Date(1956, 6, 9));
    console.log("Actor existente recuperado:", existingActor === a2);

    let newActor = system1.createPerson("Johnny", "Deep", "", new Date(1963, 6, 9));
    console.log("Nuevo actor creado (no añadido);", newActor.toString());
    console.log("Está en el sistema?:", [...system1.actors].some((a) => a.name === newActor.name && a.lastame1 === newActor.lastame1));


    let existingMovie = system1.createProduction("movie", "Inception", new Date(2010, 9, 15), "USA");
    console.log("Película existente recuperada:", existingMovie === m1);

    let newMovie = system1.createProduction("movie", "Sweenew Todd", new Date(2007, 12, 21), "USA");
    console.log("Nueva película creada (no añadida)", newMovie.toString());
    console.log("Está en el sistema?;", [...system1.productions].some((p) => p.title === newMovie.title));


    // ========== BÚSQUEDA Y FILTRADO ==========
    console.log("\n\n--- Búsqueda y Filtrado ---");

    //Buscar todas las películas
    console.log("Todas las películas:");
    let movies = system1.findProductions((p) => p instanceof Movie);
    for (let movie of movies) {
        console.log(movie.title);
    }

    //Buscar producciones de 2005 en adelante
    console.log("\nProducciones desde 2005");
    let recent = system1.findProductions(
        (p) => p.publication.getFullYear() >= 2005, 
        (a, b) => b.publication - a.publication
    );
    for (let prod of recent){
        console.log(`${prod.title} (${prod.publication.getFullYear()})`);
    }

    //Filtrar por categoría
    console.log("\nPelículas de acción ordenadas por título:");
    let actionMovies = system1.filterProductionsInCategory(
        c1,
        (p) => p instanceof Movie,
        (a, b) => a.title.localeCompare(b.title)
    );

    for(let movie of actionMovies){
        console.log(movie.title);
    }

    /* ================= ELIMINAR ELEMENTOS ================= */
    console.log("\n\n--- Eliminar Elementos ---");

    console.log("\nTotal categorías:", [...system1.categories].length);
    console.log("Eliminar categoría Comedia:", system1.removeCategory(c3));
    console.log("Total categorías después de eliminar:", [...system1.categories].length);

    console.log("\nTotal producciones:", [...system1.productions].length);
    console.log("Eliminar producción El Caballero Oscuro:", system1.removeProduction(m3));
    console.log("Total producciones después de eliminar:", [...system1.productions].length);

    console.log("\nTotal actores :", [...system1.actors].length);
    console.log("Eliminar actor Christopher Lee:", system1.removeActor(a3));
    console.log("Total actores después de eliminar:", [...system1.actors].length);


    /* ================= DESASIGNAR RELACIONES ================= */
    console.log("\n\n--- Desasignar Relaciones ---");

    console.log("Producciones de Christopher Nolan antes:", [...system1.getProductionsDirector(d1)].length);
    console.log("Desasignar director de película:", system1.deassignDirector(d1, m1));
    console.log("Producciones de Christopher Nolan después:", [...system1.getProductionsDirector(d1)].length);

    console.log("\nProducciones de Tom Hanks antes:", [...system1.getProductionsActor(a2)].length);
    console.log("Desasignar actor de película:", system1.deassignActor(a2, m1));
    console.log("Producciones de Tom Hanks después:", [...system1.getProductionsActor(a2)].length);

    console.log("\nProducciones de acción antes:", [...system1.getProductionsCategory(c1)].length);
    console.log("Desasignar categoría de película:", system1.deassignCategory(c1, m1));
    console.log("Producciones de acción después:", [...system1.getProductionsCategory(c1)].length);


    // ========== VALIDACIÓN DE OBJETOS ==========
    console.log("\n\n--- Validación de Objetos ---");

    //Verificar que Production no se puede instanciar
    try {
        new Production("test", new Date());
        console.log("Debería haber lanzado excepción al ser abstracta");
    } catch (error) {
        console.log("\n" + error.toString());
        console.log("Producción es abstracta");
    }

    try {
        new Person("", "Smith", "", new Date());
        console.log("Debería haber lanzado excepción al faltar el nombre");
    } catch (error) {
        console.log("\n" + error.toString());
        console.log("Validación correcta de nombre");
    }

    try {
        new Resource("not-a-number", "/link");
        console.log("Debería haber lanzado excepción al no ser número la duración");
    } catch (error) {
        console.log("\n" + error.toString());
        console.log("Validación correcta de duración");
    }
    

})();
