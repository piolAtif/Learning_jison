var converter = require('number-to-words');


var operations = {
	"+" : "plus",
	"*" : "times",
	"-"	: "minus"
};


var nodes = {};

nodes.OperatorNode = function(left, sign, right, evaluator) {
	this.sign = sign;
	this.evaluator = evaluator;
	this.left = left;
	this.right = right;

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
