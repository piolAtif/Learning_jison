var converter = require('number-to-words');

var utils = {};

var identity = function(number){
	return number;
}

utils.add = function(leftChild,node,rightChild){
	return [leftChild,node,rightChild];
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
	data[1] = operatorFunc(data[1]);
	data[2] = ConvertFunc(data[2]);
	if(!(data[0] instanceof Array)){
		data[0] = ConvertFunc(+data[0]);
	}
	else{
		data[0] = represent(data[0],delimiters,ConvertFunc,operatorFunc);
	}
	return delimiters[0]+data.join(' ')+delimiters[1];
}

utils.parse = function(list){
	console.log(represent(list,["( " , " )"],identity,identity));
	console.log(represent(list,["( " , " )"],converter.toWords,operatorToWord));
}

module.exports = utils;