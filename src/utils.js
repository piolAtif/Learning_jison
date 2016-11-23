var converter = require('number-to-words');
var nodes = require('./nodes.js');
var Tree = require('./tree.js');
var utils = {};

var identity = function(number){
	return number;
}

utils.createVariableNode = function(variable){
	return {name:variable, evaluation:function(){return this.value;}, value:undefined};
}

utils.createAssignNode = function(assign){
	return new nodes.OperatorNode(assign, function(){return this.firstValue.value = this.secondValue;});
}

utils.createPlusNode = function(plus){
	return new nodes.OperatorNode(plus, function(){return this.firstValue + this.secondValue;});
}

utils.createMultiplyNode = function(multiply){
	return new nodes.OperatorNode(multiply, function(){return this.first * this.second;});
}

utils.createNumberNode = function(number){
	return {name:number, evaluation: function(){return number;}};
}

utils.createMinusNode = function(minus) {
	return new nodes.OperatorNode(minus, function(){return this.first - this.second;});
}

var operations = {
	"+" : "plus",
	"*" : "times",
	"-"	: "minus"
}

var operatorToWord = function(operator){
	return operations[operator];
}

var withParenthesis = function(list){
	var expression = list.reduce(function(initial, ele) {
		if (ele instanceof Array)
			 initial.push(withParenthesis(ele)) ;
		else 
			initial.push(ele.name);
		return initial
	}, []);
	return '( ' + expression.join(' ') + ' )';
};

var flattenToWord = function(element){
	if(element instanceof Array)
		return toWords(element)
	else 
		return converter.toWords(element.name);
}

var toWords = function(list) {
	var left = flattenToWord(list[0]);
	var right = flattenToWord(list[2])
	var operator = operatorToWord(list[1].name);
	return '( ' + [left, operator, right].join(' ') + ' )';
};

var evaluateExpression = function(list){
	// console.log(list);
}

utils.parse = function(list){
	// return new Tree(list);
	return {id:withParenthesis(list),
		words:toWords(list),
		eval:evaluateExpression(list)};
}

module.exports = utils;