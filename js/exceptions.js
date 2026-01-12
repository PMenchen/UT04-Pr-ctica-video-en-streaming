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