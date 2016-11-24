var converter = require('number-to-words');
var nodes = require('./nodes.js');
var Tree = require('./tree.js');
var utils = {};

var identity = function(number){
	return number;
}

utils.createVariableNode = function(variable){
	return {sign:variable, evaluation:function(){return this.value;}, value:undefined};
}

utils.createAssignNode = function(left, assign, right){
	return new nodes.OperatorNode(left, assign, right,
						function(){return this.firstValue.value = this.secondValue.evaluation();});
}

utils.createPlusNode = function(left, plus, right){
	return new nodes.OperatorNode(left, plus, right,
			 function(){return this.firstValue + this.secondValue;});
}

utils.createMultiplyNode = function(left, multiply, right){
	return new nodes.OperatorNode(left, multiply, right,
						 function(){return this.first * this.second;});
}

utils.createNumberNode = function(number){
	return {sign:number, evaluation: function(){return number;}};
}

utils.createMinusNode = function(left, minus, right) {
	return new nodes.OperatorNode(left, minus, right,
					 function(){return this.first - this.second;});
}



var operatorToWord = function(operator){
	return operations[operator];
}

var withParenthesis = function(list){
	var expression = list.reduce(function(initial, ele) {
		if (ele instanceof Array)
			 initial.push(withParenthesis(ele)) ;
		else 
			initial.push(ele.sign);
		return initial
	}, []);
	return '( ' + expression.join(' ') + ' )';
};


var evaluateExpression = function(list){
 	// return a.evaluation();

}

utils.parse = function(list){
	return list;
}

module.exports = utils;