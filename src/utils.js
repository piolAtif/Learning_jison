var converter = require('number-to-words');
var nodes = require('./nodes.js');
var Tree = require('./tree.js');
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

utils.createMinusNode = function(minus) {
	return new nodes.OperatorNode(minus, function(){return this.first - this.second;});
}

var operations = {
	"+" : "plus",
	"*" : "times"
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
}

var toWords = function(list) {

}
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