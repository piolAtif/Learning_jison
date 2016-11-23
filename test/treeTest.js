var Parser = require('jison').Parser;
var fs = require('fs');
var assert = require('assert');
var grammar = fs.readFileSync('./src/mathematicalExpressionEvaluator.jison', 'utf8');

var parser = new Parser(grammar);

describe('parseTree', function() {
	it('should give parenthesis expression of simple plus expression', function() {
		var tree = parser.parse('1+2');
		var expected = '( 1 + 2 )';
		assert.equal(expected, tree.id);
	});

	it('should give parenthesis expression of simple multiply expression', function() {
		var tree = parser.parse('1*2');
		var expected = '( 1 * 2 )';
		assert.equal(expected, tree.id);
	});

	it('should give parenthesis expression of simple expression', function() {
		var tree = parser.parse('1 * 2 + 1');
		var expected = '( ( 1 * 2 ) + 1 )';
		assert.equal(expected, tree.id);
	});

	it('should give words expression of simple expression', function() {
		var tree = parser.parse('2 + 3 * 4');
		var expected = '( 2 + ( 3 * 4 ) )';
		assert.equal(expected, tree.id);
	})

})


