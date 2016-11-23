var assert = require('assert');
var utils = require('../src/utils.js');

describe('Create single tree node', function() {
    it('should return number when node is a number', function() {
        var numberNode = utils.createNumberNode(1);
        assert.equal(1, numberNode.evaluation());
    })

    it('should return sum of two numbers when node is plus', function() {
        var plusNode = utils.createPlusNode('+');
        plusNode.setValues(1,2);
        assert.equal(3, plusNode.evaluation());
    })

    it('should return multiplication of two numbers when node is a multiply', function() {
        var multiplyNode = utils.createMultiplyNode('*');
         multiplyNode.setValues(3,2);
        assert.equal(6, multiplyNode.evaluation());
    })
})


describe('Evaluate expressions', function() {
    var firstNumberNode = utils.createNumberNode(1);
    var secondNumberNode = utils.createNumberNode(2);
    var plusNode = utils.createPlusNode('+');
    var multiplyNode = utils.createPlusNode('*');

    describe('Evaluate expressions with Parenthesis', function() {
        describe('should pass string when given expression is a single array', function() {
            it('should give expression for sum of two numbers', function() {
                var tree = [firstNumberNode, plusNode, secondNumberNode];
                var expectedResult = '( 1 + 2 )';
                assert.equal(utils.parse(tree).id, expectedResult);
            });

            it('should give expression for multiplication of two numbers', function() {
                var tree = [firstNumberNode, multiplyNode, secondNumberNode];
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
