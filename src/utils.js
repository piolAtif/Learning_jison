var converter = require('number-to-words');

var utils = {};

var identity = function(number){
	return number;
}


utils.createPlusNode = function(plus){
	return {name:plus, evaluation: function(first,second){return first+second;}}
}

utils.createMultiplyNode = function(multiply){
	return {name:multiply,evaluation:function(first,second){return first*second;}}
}

utils.createNumberNode = function(number){
	return {name:number, evaluation: function(){return +number;}};
}


var operations = {
	"+" : "plus",
	"*" : "times"
}

var operatorToWord = function(operator){
	return operations[operator];
}

var represent = function(list,delimiters,ConvertFunc,operatorFunc){
	var data = JSON.parse(JSON.stringify(list));
	data[1] = operatorFunc(data[1].name);
	data[2] = ConvertFunc(data[2].name);
	if(!(data[0] instanceof Array)){
		data[0] = ConvertFunc(+data[0].name);
	}
	else{
		data[0] = represent(data[0],delimiters,ConvertFunc,operatorFunc);
	}
	return delimiters[0]+data.join(' ')+delimiters[1];
}

utils.parse = function(list){
	return {id:represent(list,["( " , " )"],identity,identity),
		words:represent(list,["( " , " )"],converter.toWords,operatorToWord)};
}

module.exports = utils;