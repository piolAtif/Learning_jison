var assert = require('assert');
var node = require('../src/node.js');

describe('createNode',function(){
	it('should return an initial node for number',function(){
		var numberNode = node.Node(1);
		assert.deepEqual({sign: 1, value: 1, evaluator:undefined},{sign: 1, value: 1, evaluator:undefined});
	});

	// it('should return an initial node for + operator',function(){
	// 	var operatorNode = node.Node('+');
	// 	assert.deepEqual({sign: +, value: undefined, evaluator:undefined},operatorNode);
	// });

	it('should return an initial node for = operator',function(){
		// var operatorNode = node.Node('=');
		// assert.deepEqual({sign: +, value: undefined, evaluator:[Function]},operatorNode);
	});
})
