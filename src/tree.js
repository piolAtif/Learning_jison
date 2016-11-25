var Tree = function() {
	this.nodes = [];
	this.varTable = {'_': undefined};
};

var typeOperation = {
	variable:function(value){
		return 'console.log('+value+');';
	},
	number: function(value){
		return 'console.log('+value+');';
	},
	assign: function(value){
		return 'var '+value+';';
	},
	arithmetic: function(value){
		return 'console.log'+value+';';
	},
	method: function(value){
		return 'console.log('+value+');';
	}

}

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
		for (var i = 0; i < this.nodes.length; i++) 
			this.varTable = this.nodes[i].evaluate(this.varTable);
		return this.varTable['_']
	},
	toJS: function(){
	var jsCode = '';		
		for (var i = 0; i < this.nodes.length; i++) {
			 jsCode += typeOperation[this.nodes[i].getType()](this.nodes[i].asString())+'\n';
		}
		return jsCode;
	}

}


module.exports = Tree;