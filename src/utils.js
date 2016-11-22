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

utils.add = function(leftChild,node,rightChild){
	return {"left":leftChild,"node":node,"right":rightChild};
}

var operations = {
	"+" : "plus",
	"*" : "times"
}

var convertToWord = function(elements){
	return converter.toWords(elements[0])+' '+operations[elements[1]]+' '+converter.toWords(elements[2]);
}


var replaceWithParenthesis = function(setOfElement){
	return setOfElement.toString();
}

var represent = function(list,convertFunc){
	return list;
}

utils.parse = function(list){
	console.log(list);
	return {id:represent(list,replaceWithParenthesis),
		words:represent(list,convertToWord)};
}

module.exports = utils;