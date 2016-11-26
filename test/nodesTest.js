var assert = require('assert');
var utils = require('../src/utils.js');

describe('Create single tree node', function() {
     var firstNumberNode = utils.createNumberNode(1);
     var secondNumberNode = utils.createNumberNode(2)

    it('should return number when node is a number', function() {
        assert.equal(1, firstNumberNode.evaluate({'_': undefined})['_']);
    })

    it('should return sum of two numbers when node is plus', function() {
        var plusNode = utils.createPlusNode(firstNumberNode,'+',secondNumberNode);
        assert.equal(3, plusNode.evaluate({'_': undefined})['_']);
    })

    it('should return multiplication of two numbers when node is a multiply', function() {
        var multiplyNode = utils.createMultiplyNode(firstNumberNode,'*',secondNumberNode);
        assert.equal(2, multiplyNode.evaluate({'_': undefined})['_']);
    })
})


describe('Evaluate expressions', function() {
    var firstNumberNode = utils.createNumberNode(1);
    var secondNumberNode = utils.createNumberNode(2);
    var plusNode = utils.createPlusNode(firstNumberNode,'+',secondNumberNode);
    var multiplyNode = utils.createPlusNode(firstNumberNode,'*',secondNumberNode);

    describe('Evaluate expressions with Parenthesis', function() {
        describe('should pass string when given expression is a single array', function() {
            it('should give expression for sum of two numbers', function() {
                var expectedResult = '( 1 + 2 )';
                assert.equal(plusNode.withParenthesis(), expectedResult);
            });

            it('should give expression for multiplication of two numbers', function() {
                var tree = [multiplyNode];
                var expectedResult = '( 1 * 2 )';
                assert.equal(utils.parse(tree).id, expectedResult);
            });
        });

        describe('should pass string when given expression is array of arrays', function() {
            var thirdNumberNode = utils.createNumberNode(3);
            it('should give expression for sum of two numbers multiply by third number', function() {
                var tree = [
                    [firstNumberNode, plusNode, secondNumberNode], multiplyNode, thirdNumberNode
                ];
                var expectedResult = '( ( 1 + 2 ) * 3 )';
                assert.equal(utils.parse(tree).id, expectedResult);
            });
        });

    });
    describe('Evaluate expression in words', function() {
        describe('should express string in word when given expression is a single array', function() {
            it('should give word expression for sum of two numbers', function() {
                var tree = [firstNumberNode, plusNode, secondNumberNode];
                var expectedResult = '( one plus two )';
                assert.equal(utils.parse(tree).words, expectedResult);
            });

            it('should give word expression for multiplication of two numbers', function() {
                var tree = [firstNumberNode, multiplyNode, secondNumberNode];
                var expectedResult = '( one times two )';
                assert.equal(utils.parse(tree).words, expectedResult);
            });
        });

        describe('should give word expression when given expression is array of arrays', function() {
            var thirdNumberNode = utils.createNumberNode(3);
            it('should give word expression for sum of two numbers multiply by third number', function() {
                var tree = [
                    [firstNumberNode, plusNode, secondNumberNode], multiplyNode, thirdNumberNode
                ];
                var expectedResult = '( ( one plus two ) times three )';
                assert.equal(utils.parse(tree).words, expectedResult);
            });
        });
    });
    describe('Evaluate expression when expressions are in multiple statement',function(){
        it('should return 25 after evaluating the expression',function(){
            var variableNode = utils.createVariableNode('x');
            var assignNode = utils.createAssignNode('=');
            var firstNumberNode = utils.createNumberNode(10);
            var secondNumberNode = utils.createNumberNode(5);
            var thirdNumberNode = utils.createNumberNode(2);
            var tree = [[[variableNode, assignNode, firstNumberNode],plusNode,secondNumberNode],multiplyNode,thirdNumberNode];
            assert.equal(25, utils.parse(tree).eval);
        })
    })
});
