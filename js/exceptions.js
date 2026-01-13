"use strict";

/**
 * Excepción base para el sistema
 * @param {string} message - Mensaje de error
 * @param {string} fileName - Nombre del archivo donde ocurrió el error
 * @param {number} lineNumber - Número de línea donde ocurrió el error
 * @returns {Error} Instancia de error personalizada
 */
function BaseException(message = "Default Message", fileName, lineNumber) {
    let instance = new Error(message, fileName, lineNumber);
    instance.name = "BaseException";
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    if (Error.captureStrackTrace) {
        Error.captureStrackTrace(instance, BaseException);
    }

    return instance;
}

// Configuración del prototipo de BaseException
BaseException.prototype = Object.create(Error.prototype, {
    constructor: {
        value: BaseException,
        enumerable: false,
        writable: true,
        configurable: true
    }
})

/**
 * Excepción para acceso inválido a constructor
 * Se lanza cuando se intenta invocar un constructor sin el operador 'new'
 */
function InvalidAccessConstructorException() {
	let instance = BaseException.call(this, "No se puede invocar el constructor sin el operador 'new'");
	instance.name = "InvalidAccessConstructorException";
	return instance;
}
InvalidAccessConstructorException.prototype = Object.create(BaseException.prototype);
InvalidAccessConstructorException.prototype.constructor = InvalidAccessConstructorException;

/**
 * Excepción para valores vacíos
 * @param {string} param - Nombre del parámetro vacío
 */
function EmptyValueException(param) {
	let instance = BaseException.call(this, "Error: El parámetro: " + param + " es vacío");
	instance.name = "EmptyValueException";
	instance.param = param;
	return instance;
}
EmptyValueException.prototype = Object.create(BaseException.prototype);
EmptyValueException.prototype.constructor = EmptyValueException;

/**
 * Excepción para valores requeridos
 * @param {string} param - Nombre del parámetro obligatorio
 */
function RequiredValueException(param){
    let instance = BaseException.call(this, "Error: El parámetro: " + param + " es obligatorio");
    instance.name = "RequiredValueException";
    instance.param = param;
    return instance;
}
RequiredValueException.prototype = Object.create(BaseException.prototype);
RequiredValueException.prototype.constructor = RequiredValueException;

/**
 * Excepción para valores inválidos
 * @param {string} param - Nombre del parámetro
 * @param {string} expected - Tipo esperado
 * @param {*} value - Valor actual recibido
 */
function InvalidValueException(param, expected, value) {
	let instance = BaseException.call(this, "Error: El parámetro: " + param + " tiene un valor no válido, debe ser un " + expected);
	instance.name = "InvalidValueException";
	instance.param = param;
	instance.value = value;
	return instance;
}
InvalidValueException.prototype = Object.create(BaseException.prototype);
InvalidValueException.prototype.constructor = InvalidValueException;


/**
 * Excepción para parámetros inválidos
 * @param {string} param - Nombre del parámetro inválido
 * @param {*} value - Valor recibido
 */
function InvalidParameterException(param, value) {
	let instance = BaseException.call(this, "Error: El parámetro: " + param + " no es válido");
	instance.name = "InvalidParameterException";
	instance.param = param;
	instance.value = value;
	return instance;
}
InvalidParameterException.prototype = Object.create(BaseException.prototype);
InvalidParameterException.prototype.constructor = InvalidParameterException;

/**
 * Excepción cuando una categoría ya existe en el sistema
 * @param {Category} category - La categoría que ya existe
 */
function CategoryExistsException(category){
    let instance = BaseException.call(this, `Error: La categoría ${category.name} ya existe en el sistema`);
    instance.name = "CategoryExistsException";
    instance.param = category;

    return instance;
}
CategoryExistsException.prototype = Object.create(BaseException.prototype);
CategoryExistsException.prototype.constructor = CategoryExistsException;


/**
 * Excepción cuando una categoría no existe en el sistema
 * @param {Category} category - La categoría que no existe
 */
function CategoryNotExistsException(category){
    let instance = BaseException.call(this, `Error: La categoría ${category.name} no está registrada en el sistema`);
    instance.name = "CategoryNotExistsException";
    instance.param = category;

    return instance;
}
CategoryNotExistsException.prototype = Object.create(BaseException.prototype);
CategoryNotExistsException.prototype.constructor = CategoryNotExistsException;

/**
 * Excepción cuando un usuario ya existe en el sistema
 * @param {User} user - El usuario que ya existe
 */
function UserExistsException(user){
    let instance = BaseException.call(this, `Error: El usuario ${user.username} ya existe en el sistema`);
    instance.name = "UserExistsException";
    instance.param = user;

    return instance;
}
UserExistsException.prototype = Object.create(BaseException.prototype);
UserExistsException.prototype.constructor = UserExistsException;

/**
 * Excepción cuando un usuario no existe en el sistema
 * @param {User} user - El usuario que no existe
 */
function UserNotExistsException(user){
    let instance = BaseException.call(this, `Error: El usuario ${user.username} no existe en el sistema`);
    instance.name = "UserNotExistsException";
    instance.param = user;

    return instance;
}
UserNotExistsException.prototype = Object.create(BaseException.prototype);
UserNotExistsException.prototype.constructor = UserNotExistsException;

/**
 * Excepción cuando una producción ya existe en el sistema
 * @param {Production} production - La producción que ya existe
 */
function ProductionExistsException(production){
    let instance = BaseException.call(this, `Error: La producción ${production.title} ya existe en el sistema`);
    instance.name = "ProductionExistsException";
    instance.param = production;

    return instance;
}
ProductionExistsException.prototype = Object.create(BaseException.prototype);
ProductionExistsException.prototype.constructor = ProductionExistsException;

/**
 * Excepción cuando una producción no existe en el sistema
 * @param {Production} production - La producción que no existe
 */
function ProductionNotExistsException(production){
    let instance = BaseException.call(this, `Error: La producción ${production.title} no está registrada en el sistema`);
    instance.name = "ProductionNotExistsException";
    instance.param = production;

    return instance;
}
ProductionNotExistsException.prototype = Object.create(BaseException.prototype);
ProductionNotExistsException.prototype.constructor = ProductionNotExistsException;

/**
 * Excepción cuando una persona ya existe en el sistema
 * @param {Person} person - La persona que ya existe
 */
function PersonExistsException(person){
    let instance = BaseException.call(this, `Error: La persona ${person.name} ${person.lastname1} ya existe en el sistema`);
    instance.name = "PersonExistsException";
    instance.param = person;

    return instance;
}
PersonExistsException.prototype = Object.create(BaseException.prototype);
PersonExistsException.prototype.constructor = PersonExistsException;

/**
 * Excepción cuando una persona no existe en el sistema
 * @param {Person} person - La persona que no existe
 */
function PersonNotExistsException(person){
    let instance = BaseException.call(this, `Error: La persona ${person.name} ${person.lastname1} no existe en el sistema`);
    instance.name = "PersonNotExistsException";
    instance.param = person;

    return instance;
}
PersonNotExistsException.prototype = Object.create(BaseException.prototype);
PersonNotExistsException.prototype.constructor = PersonNotExistsException;


export {
    BaseException,
    InvalidAccessConstructorException,
    InvalidValueException,
    InvalidParameterException,
    EmptyValueException,
    RequiredValueException,
    CategoryExistsException,
    CategoryNotExistsException,
    UserExistsException,
    UserNotExistsException,
    ProductionExistsException,
    ProductionNotExistsException,
    PersonExistsException,
    PersonNotExistsException
}