var Parser = require('jison').Parser;
var fs = require('fs');
var assert = require('assert');
var grammar = fs.readFileSync('./src/mathematicalExpressionEvaluator.jison', 'utf8');

var parser = new Parser(grammar);

describe('parseTree', function() {
	describe('parenthesis', function() {
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

		it('should give parenthesis expression of little complex expression', function() {
			var tree = parser.parse('2 + 3 * 4');
			var expected = '( 2 + ( 3 * 4 ) )';
			assert.equal(expected, tree.id);
		});
	});

	describe('in words', function() {
		it('should give simple plus expression in words',function(){
			var tree = parser.parse('1+2');
			var expected = '( one plus two )';
			assert.equal(expected, tree.words);
		})

		it('should give words expression of little complex expression', function() {
			var tree = parser.parse('2 + 3 * 4');
			var expected = '( two plus ( three times four ) )';
			assert.equal(expected, tree.words);
		});
	})
	
})


