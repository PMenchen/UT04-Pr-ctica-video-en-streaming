"use strict";

function BaseException(message = "Default Message", fileName, lineNumber) {
    let instance = new Error(message, fileName, lineNumber);
    instance.name = "BaseException";
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    if (Error.captureStrackTrace) {
        Error.captureStrackTrace(instance, BaseException);
    }

    return instance;
}

BaseException.prototype = Object.create(Error.prototype, {
    constructor: {
        value: BaseException,
        enumerable: false,
        writable: true,
        configurable: true
    }
})

//Excepción acceso inválido a constructor
function InvalidAccessConstructorException() {
	let instance = BaseException.call(this, "No se puede invocar el constructor sin el operador 'new'");
	instance.name = "InvalidAccessConstructorException";
	return instance;
}
InvalidAccessConstructorException.prototype = Object.create(BaseException.prototype);
InvalidAccessConstructorException.prototype.constructor = InvalidAccessConstructorException;

//Excepción personalizada para indicar valores vacios.
function EmptyValueException(param) {
	let instance = BaseException.call(this, "Error: El parámetro: " + param + " es vacío");
	instance.name = "EmptyValueException";
	instance.param = param;
	return instance;
}
EmptyValueException.prototype = Object.create(BaseException.prototype);
EmptyValueException.prototype.constructor = EmptyValueException;

function RequiredValueException(param){
    let instance = BaseException.call(this, "Error: El parámetro: " + param + " es obligatorio");
    instance.name = "RequiredValueException";
    instance.param = param;
    return instance;
}
RequiredValueException.prototype = Object.create(BaseException.prototype);
RequiredValueException.prototype.constructor = RequiredValueException;

//Excepción de valor inválido
function InvalidValueException(param, expected, value) {
	let instance = BaseException.call(this, "Error: El parámetro: " + param + " tiene un valor no válido, debe ser un " + expected);
	instance.name = "InvalidValueException";
	instance.param = param;
	instance.value = value;
	return instance;
}
InvalidValueException.prototype = Object.create(BaseException.prototype);
InvalidValueException.prototype.constructor = InvalidValueException;


function CategoryExistsException(category){
    let instance = BaseException.call(this, `Error: La categoría ${category.name} ya existe en el sistema`);
    instance.name = "CategoryExistsException";
    instance.param = category;

    return instance;
}
CategoryExistsException.prototype = Object.create(BaseException.prototype);
CategoryExistsException.prototype.constructor = CategoryExistsException;


function CategoryNotExistsException(category){
    let instance = BaseException.call(this, `Error: La categoría ${category.name} no está registrada en el sistema`);
    instance.name = "CategoryNotExistsException";
    instance.param = category;

    return instance;
}
CategoryNotExistsException.prototype = Object.create(BaseException.prototype);
CategoryNotExistsException.prototype.constructor = CategoryNotExistsException;


function UserExistsException(user){
    let instance = BaseException.call(this, `Error: El usuario ${user.username} ya existe en el sistema`);
    instance.name = "UserExistsException";
    instance.param = user;

    return instance;
}
UserExistsException.prototype = Object.create(BaseException.prototype);
UserExistsException.prototype.constructor = UserExistsException;


function UserNotExistsException(user){
    let instance = BaseException.call(this, `Error: El usuario ${user.username} no existe en el sistema`);
    instance.name = "UserNotExistsException";
    instance.param = user;

    return instance;
}
UserNotExistsException.prototype = Object.create(BaseException.prototype);
UserNotExistsException.prototype.constructor = UserNotExistsException;


function ProductionExistsException(production){
    let instance = BaseException.call(this, `Error: La producción ${production.title} ya existe en el sistema`);
    instance.name = "ProductionExistsException";
    instance.param = production;

    return instance;
}
ProductionExistsException.prototype = Object.create(BaseException.prototype);
ProductionExistsException.prototype.constructor = ProductionExistsException;


function ProductionNotExistsException(production){
    let instance = BaseException.call(this, `Error: La producción ${production.title} no está registrada en el sistema`);
    instance.name = "ProductionNotExistsException";
    instance.param = production;

    return instance;
}
ProductionNotExistsException.prototype = Object.create(BaseException.prototype);
ProductionNotExistsException.prototype.constructor = ProductionNotExistsException;


function PersonExistsException(person){
    let instance = BaseException.call(this, `Error: La persona ${person.name} ${person.lastname1} ya existe en el sistema`);
    instance.name = "PersonExistsException";
    instance.param = person;

    return instance;
}
PersonExistsException.prototype = Object.create(BaseException.prototype);
PersonExistsException.prototype.constructor = PersonExistsException;


function PersonNotExistsException(person){
    let instance = BaseException.call(this, `Error: La persona ${person.name} ${person.lastname1} no existe en el sistema`);
    instance.name = "PersonNotExistsException";
    instance.param = person;

    return instance;
}
PersonNotExistsException.prototype = Object.create(BaseException.prototype);
PersonNotExistsException.prototype.constructor = PersonNotExistsException;
