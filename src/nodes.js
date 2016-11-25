var converter = require('number-to-words');


var operations = {
	"+" : "plus",
	"*" : "times",
	"-"	: "minus"
};


var nodes = {};

nodes.OperatorNode = function(left, sign, right, type, evaluator) {
	this.sign = sign;
	this.evaluator = evaluator;
	this.left = left;
	this.right = right;
	this.type = type;
}

nodes.OperatorNode.prototype = {
	toWords: function() {
		var left = funcs.flattenToWord(this.left);
		var right = funcs.flattenToWord(this.right)
		var operator = funcs.operatorToWord(this.sign);
		return '( ' + [left, operator, right].join(' ') + ' )';
	},
	withParenthesis: function(){
		var left = funcs.flattenWithParenthesis(this.left);
		var right = funcs.flattenWithParenthesis(this.right)
		return '( ' + [left, this.sign, right].join(' ') + ' )';
	},
	evaluate: function(varTable) {
		return this.evaluator(varTable);
	},
	signature: function() {
		return this.sign;
	},
	asString:function(){
		var stringRepresentation = this.left.asString()+' '+this.signature()+' '+this.right.asString();
		if(this.type == 'assign')
			return  stringRepresentation;
		return '('+stringRepresentation+')';
	},
	getType: function() {
		return this.type;
	}
}


nodes.NumberNode = function(number,type){
	this.sign= number;
	this.type = type;
};

nodes.NumberNode.prototype = {
	evaluate: function(table){
		table['_'] = this.sign;
		return table;
	},

	asString:function(){return this.sign;},

	getType:function(){
		return this.type;
	}
}

nodes.VariableNode = function(variable,type){
	this.sign = variable;
	this.type = type;
}

nodes.VariableNode.prototype = {
	evaluate: function(table){
		return table;
	},

	asString:function(){
		return this.sign;
	},
	getType:function(){
		return this.type;
	}

}

nodes.FactorialNode = function(value, sign, type, evaluator ){
	this.sign = sign;
	this.value = value;
	this.type = type;
	this.evaluator = evaluator;
}

nodes.FactorialNode.prototype = {
	evaluate: function(varTable){
		return this.evaluator(varTable);
	},

	asString:function(){
		return this.type.toString()+'('+this.value.asString()+');';
	},
	getType:function(){
		return 'method';
	}
}


module.exports = nodes;



var funcs = {
	flattenToWord: function(element){
		if(element instanceof nodes.OperatorNode)
			return element.toWords()
		else {
			return converter.toWords(element.sign);
		}
	},
	operatorToWord: function(operator){
		return operations[operator];
	},

	flattenWithParenthesis : function(element){
		if(element instanceof nodes.OperatorNode)
			return element.withParenthesis();
		else
			return element.sign;
	}		
};
