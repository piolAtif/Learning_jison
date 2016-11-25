var Parser = require('jison').Parser;
var fs = require('fs');
var assert = require('assert');
var utils = require('../src/utils.js');
var grammar = fs.readFileSync('./src/mathematicalExpressionEvaluator.jison', 'utf8');
var expect = require('expect.js');
var parser = new Parser(grammar);

describe('parseTree', function() {
	describe('parenthesis', function() {
		it('should give parenthesis expression of simple plus expression', function() {
			var tree = parser.parse('1+2;');
			var expected = '( 1 + 2 )';
			assert.equal(expected, tree.withParenthesis	());
		});

		it('should give parenthesis expression of simple multiply expression', function() {
			var tree = parser.parse('1*2;');
			var expected = '( 1 * 2 )';
			assert.equal(expected, tree.withParenthesis());
		});

		it('should give parenthesis expression of simple expression', function() {
			var tree = parser.parse('1 * 2 + 1;');
			var expected = '( ( 1 * 2 ) + 1 )';
			assert.equal(expected, tree.withParenthesis());
		});

		it('should give parenthesis expression of little complex expression', function() {
			var tree = parser.parse('2 + 3 * 4;');
			var expected = '( 2 + ( 3 * 4 ) )';
			assert.equal(expected, tree.withParenthesis());
		});

		it('should give parenthesis expression of a complex expression', function() {
			var tree = parser.parse('1 + 2 + 3 + 4;');
			var expected = '( ( ( 1 + 2 ) + 3 ) + 4 )';
			assert.equal(expected, tree.withParenthesis());
		});
	});

	describe('in words', function() {
		it('should give simple plus expression in words', function(){
			var tree = parser.parse('1+2;');
			var expected = '( one plus two )';
			assert.equal(expected, tree.toWords());
		})

		it('should give words expression of little complex expression', function() {
			var tree = parser.parse('2 + 3 * 4;');
			var expected = '( two plus ( three times four ) )';
			assert.equal(expected, tree.toWords());
		});

		it('should give words expression for billion number', function() {
			var tree = parser.parse('1000000000+2;');
			var expected = '( one billion plus two )';
			assert.equal(expected, tree.toWords());
		});

		it('should give words expression of more complex expression', function() {
			var tree = parser.parse('1 + 2 + 3 * 4 + 3 - 1;');
			var expected = '( ( ( ( one plus two ) plus ( three times four ) ) plus three ) minus one )';
			assert.equal(expected, tree.toWords());
		});

	});

	describe('evaluate', function(){
		
		it('should evaluate simple expression', function() {
			var tree = parser.parse('3+4+4;')
			assert.equal(11, tree.evaluate())
		})
		it('should assign value to x for simple expression', function(){
			var tree = parser.parse('x = 5;');
			assert.equal(5, tree.evaluate());
		});

		it('should give 25 for given expression', function(){
			var tree = parser.parse('a=5; b=5; b*a;');
			assert.equal(25, tree.evaluate());
		});

		it('should give 5 for given expression',function(){
			var tree = parser.parse('a=5; b=a;');
			assert.equal(5, tree.evaluate());
		})


		it('should give 10 for a complex expression',function(){
			var tree = parser.parse('a=5; b=a; a+b;');
			assert.equal(10, tree.evaluate());
		})

		it('should give 10 for given expression', function() {
			var tree = parser.parse('x=1; x + 2 + 3 + 4;');
			assert.equal(10, tree.evaluate());
		});

		it('should give minus 400 for given expression', function(){
			var tree = parser.parse('x=10;y=20;z=30; x^2+y^2-z^2;');
			assert.equal(-400,tree.evaluate());
		});

		it('should give error when evaluate variable before assign value to variable', function(){
			var tree = parser.parse('x^2; x=10;');
			expect(function(){tree.evaluate()}).to.throwException(/x is not defined/);
		});

		it('should return 35 for given expression',function(){
			var tree = parser.parse('x=10;y=x+20;y+5;');
			assert.equal(35, tree.evaluate());
		})

		it('should return 32 for given complex expression',function(){
			var tree = parser.parse('x=2;x=2^5;x;');
			assert.equal(32,tree.evaluate());
		})
	});
	
});


