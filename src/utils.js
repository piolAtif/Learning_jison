var converter = require('number-to-words');
var nodes = require('./nodes.js')
var utils = {};

var identity = function(number){
	return number;
}

utils.createVariableNode = function(variable){
	return {name:variable, evaluation:function(){return variable;}};
}

utils.createAssignNode = function(assign){
	var first = 0;
	var second = 0;
	return {name:assign,setValues:function(firstArg, secondArg){first = firstArg; second = secondArg;}, evaluation: function(){return first = second;}}
}

utils.createPlusNode = function(plus){
	return new nodes.OperatorNode(plus, function(){return this.firstValue + this.secondValue;});
}

utils.createMultiplyNode = function(multiply){
	return new nodes.OperatorNode(multiply, function(){return this.first * this.second;});
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
	// list.map(function(element){
		console.log(list);
	// })
	// var data = JSON.parse(JSON.stringify(list));
	// data[1] = operatorFunc(data[1].name);
	// data[2] = ConvertFunc(data[2].name);
	// if(!(data[0] instanceof Array)){
	// 	data[0] = ConvertFunc(+data[0].name);
	// }
	// else{
	// 	data[0] = represent(data[0],delimiters,ConvertFunc,operatorFunc);
	// }
	// return delimiters[0]+data.join(' ')+delimiters[1];
}

var evaluateExpression = function(list){
	// console.log(list);
}

utils.parse = function(list){
	// return new Tree(list);
	return {id:represent(list,["( " , " )"],identity,identity),
		words:represent(list,["( " , " )"],converter.toWords,operatorToWord),
		eval:evaluateExpression(list)};
}

module.exports = utils;