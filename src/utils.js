var converter = require('number-to-words');
var nodes = require('./nodes.js');
var Tree = require('./tree.js');
var utils = {};

var identity = function(number){
	return number;
}

utils.createVariableNode = function(variable){
	return {sign:variable, evaluate:function(){return this.sign;}};
}

utils.createAssignNode = function(left, assign, right){
	return new nodes.OperatorNode(left, assign, right,
						function(table){
							table[this.left.evaluate()] = valueOf(table,this.right);
							return table;
						});
}

utils.createPlusNode = function(left, plus, right){
	return new nodes.OperatorNode(left, plus, right,
			 function(table){
			 	table['_'] = valueOf(table,this.left) + valueOf(table,this.right);
			 	return table;
			 });
}

utils.createMultiplyNode = function(left, multiply, right){
	return new nodes.OperatorNode(left, multiply, right,
						 function(table){
						 	table['_'] = valueOf(table, this.left) * valueOf(table, this.right);
						 	return table;
						 });
}

utils.createNumberNode = function(number){
	return {sign:number, evaluate: function(table){ table['_'] = number; return table}};
}

utils.createMinusNode = function(left, minus, right) {
	return new nodes.OperatorNode(left, minus, right,
					function(table){
						 	table['_'] = valueOf(table, this.left) - valueOf(table, this.right);
						 	return table;
						 });
}

utils.createPowNode = function(left, pow, right) {
	return new nodes.OperatorNode(left, pow, right,
					function(table){
						 	table['_'] = Math.pow(valueOf(table, this.left),valueOf(table, this.right));
						 	return table;
						 });
}

utils.UndefinedVariableException = function(value){
	this.value = value;
	this.message = this.value+' is not defined';
	this.toString = function(){
		return this.value+this.message;
	}
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
		throw new utils.UndefinedVariableException(node.sign);
	}

}


utils.parse = function(list){
	return list;
}

module.exports = utils;