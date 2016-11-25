var converter = require('number-to-words');
var nodes = require('./nodes.js');
var Tree = require('./tree.js');
var errors = require('./exception.js');
var utils = {};

var identity = function(number){
	return number;
}

utils.createVariableNode = function(variable){
	return new nodes.VariableNode(variable,'variable');
}

utils.createAssignNode = function(left, assign, right){
	return new nodes.OperatorNode(left, assign, right,'assign',
						function(table){
							table[this.left.sign] = valueOf(table,this.right);
							return table;
						});
}

utils.createPlusNode = function(left, plus, right){
	return new nodes.OperatorNode(left, plus, right,'arithmetic',
			 function(table){
			 	table['_'] = valueOf(table,this.left) + valueOf(table,this.right);
			 	return table;
			 });
}

utils.createMultiplyNode = function(left, multiply, right){
	return new nodes.OperatorNode(left, multiply, right,'arithmetic',
						 function(table){
						 	table['_'] = valueOf(table, this.left) * valueOf(table, this.right);
						 	return table;
						 });
}

utils.createNumberNode = function(number){
	return new nodes.NumberNode(number,'number');
}

utils.createMinusNode = function(left, minus, right) {
	return new nodes.OperatorNode(left, minus, right,'arithmetic',
					function(table){
						 	table['_'] = valueOf(table, this.left) - valueOf(table, this.right);
						 	return table;
						 });
}

utils.createPowNode = function(left, pow, right) {
	return new nodes.OperatorNode(left, pow, right,'arithmetic',
					function(table){
						 	table['_'] = Math.pow(valueOf(table, this.left),valueOf(table, this.right));
						 	return table;
						 });
}

var valueOf = function(table, node){
	var value = node.evaluate(table)['_'];
	if(table.hasOwnProperty(node.sign) ) {
		return table[node.sign]
	}
	else if(value){
		return value;
	}
	else{
		throw new errors.UndefinedVariableException(node.sign);
	}

}


utils.parse = function(list){
	return list;
}

module.exports = utils;