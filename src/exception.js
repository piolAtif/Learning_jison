var util = require('util');
var customErrors = {};


customErrors.UndefinedVariableException = function(value){
	this.message = value +' is not defined';
}

util.inherits(customErrors.UndefinedVariableException, Error);


module.exports = customErrors;