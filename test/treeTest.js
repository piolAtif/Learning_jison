var Parser = require('jison').Parser;
var fs = require('fs');
var assert = require('assert');
var grammar = fs.readFileSync('./src/mathematicalExpressionEvaluator.jison', 'utf8');

var parser = new Parser(grammar);

describe('parseTree', function() {
	describe('parenthesis', function() {
		it('should give parenthesis expression of simple plus expression', function() {
			var tree = parser.parse('1+2;');
			var expected = '( 1 + 2 )';
			assert.equal(expected, tree.id);
		});

		it('should give parenthesis expression of simple multiply expression', function() {
			var tree = parser.parse('1*2;');
			var expected = '( 1 * 2 )';
			assert.equal(expected, tree.id);
		});

		it('should give parenthesis expression of simple expression', function() {
			var tree = parser.parse('1 * 2 + 1;');
			var expected = '( ( 1 * 2 ) + 1 )';
			assert.equal(expected, tree.id);
		});

		it('should give parenthesis expression of little complex expression', function() {
			var tree = parser.parse('2 + 3 * 4;');
			var expected = '( 2 + ( 3 * 4 ) )';
			assert.equal(expected, tree.id);
		});

		it('should give parenthesis expression of a complex expression', function() {
			var tree = parser.parse('1 + 2 + 3 + 4;');
			var expected = '( ( ( 1 + 2 ) + 3 ) + 4 )';
			assert.equal(expected, tree.id);
		});
	});

	describe('in words', function() {
		it('should give simple plus expression in words', function(){
			var tree = parser.parse('1+2;');
			var expected = '( one plus two )';
			assert.equal(expected, tree.words);
		})

		it('should give words expression of little complex expression', function() {
			var tree = parser.parse('2 + 3 * 4;');
			var expected = '( two plus ( three times four ) )';
			assert.equal(expected, tree.words);
		});

		it('should give words expression for billion number', function() {
			var tree = parser.parse('1000000000+2;');
			var expected = '( one billion plus two )';
			assert.equal(expected, tree.words);
		});

		it('should give words expression of more complex expression', function() {
			var tree = parser.parse('1 + 2 + 3 * 4 + 3 - 1;');
			var expected = '( ( ( ( one plus two ) plus ( three times four ) ) plus three ) minus one )';
			assert.equal(expected, tree.words);
		});

	});

	describe('evaluate', function(){
		
		it('should give 25 after evaluate expression', function(){
			var tree = parser.parse('x = 5;x*5;');
			assert.equal(25, tree.eval);
		});

		it('should give 10 for given expression', function() {
			var tree = parser.parse('x=1; x + 2 + 3 + 4;');
			assert.equal(10, tree.eval);
		});

		it('should give minus 400 for given expression', function(){
			var tree = parser.parse('x=10;y=20;z=30;(x^2)+(y^2)-(z^2);');
			assert.equal(-400,tree.eval);
		});

		it('should give error when evaluate variable before assign value to variable', function(){
			var tree = parser.parse('x^2; x=10;');
			assert.equal("x is not defined",tree.eval);
		});
	});
	
});


