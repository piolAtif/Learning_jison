var Tree = function() {
	this.nodes = [];
	this.varTable = {'_': undefined};
};

Tree.prototype = {
	withParenthesis: function() {
	   return this.nodes[0].withParenthesis();
	},
	add: function(node) {
		this.nodes.push(node);
	},
	toWords: function() {
		return this.nodes[0].toWords();	
	},
	evaluate: function(){
		for (var i = 0; i < this.nodes.length; i++) {
			this.varTable = this.nodes[i].evaluate(this.varTable);
		}
		return this.varTable['_']
	}

}


module.exports = Tree;