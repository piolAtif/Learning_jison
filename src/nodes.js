var nodes = {};

nodes.OperatorNode = function(sign, evatuator) {
	this.sign = sign;
	this.evatuator = evatuator;
	this.firstValue = undefined;
	this.secondValue = undefined;
}

nodes.OperatorNode.prototype = {
	setValues: function(firstValue, secondValue) {
		this.firstValue = firstValue;
		this.secondValue = secondValue;
	},
	representation: function() {
		return this.sign;
	}
}

module.exports = nodes;