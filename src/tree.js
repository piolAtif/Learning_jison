var Tree = function(list) {
	this.nodes = list;
};

Tree.prototype = {
	withParenthesis: function() {
	    var expression = this.nodes.reduce(function(initial, ele) {
	        if (ele instanceof Array)
	            initial.push(withParenthesis(ele));
	        else
	            initial.push(ele.name);
	        return initial
		}, []);
    	return '( ' + expression.join(' ') + ' )';
	}

}


module.exports = Tree;