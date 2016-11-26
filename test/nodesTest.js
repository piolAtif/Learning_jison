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
    var multiplyNode = utils.createMultiplyNode(firstNumberNode,'*',secondNumberNode);

    describe('Evaluate expressions with Parenthesis', function() {
        describe('should pass string when given expression is a single array', function() {
            it('should give expression for sum of two numbers', function() {
                var expectedResult = '( 1 + 2 )';
                assert.equal(plusNode.withParenthesis(), expectedResult);
            });

            it('should give expression for multiplication of two numbers', function() {
                var expectedResult = '( 1 * 2 )';
                assert.equal(multiplyNode.withParenthesis(), expectedResult);
            });
        });

        describe('should pass string when given expression is array of arrays', function() {
            var thirdNumberNode = utils.createNumberNode(3);
            var multiplyNode = utils.createPlusNode(plusNode,'*',thirdNumberNode);
            it('should give expression for sum of two numbers multiply by third number', function() {
                var expectedResult = '( ( 1 + 2 ) * 3 )';
                assert.equal(multiplyNode.withParenthesis(), expectedResult);
            });
        });

    });
    describe('Evaluate expression in words', function() {
        describe('should express string in word when given expression is a single array', function() {
            it('should give word expression for sum of two numbers', function() {
                var expectedResult = '( one plus two )';
                assert.equal(plusNode.toWords(), expectedResult);
            });

            it('should give word expression for multiplication of two numbers', function() {
                var expectedResult = '( one times two )';
                assert.equal(multiplyNode.toWords(), expectedResult);
            });
        });

        describe('should give word expression when given expression is array of arrays', function() {
             var thirdNumberNode = utils.createNumberNode(3);
            var multiplyNode = utils.createMultiplyNode(plusNode,'*',thirdNumberNode);
            it('should give word expression for sum of two numbers multiply by third number', function() {
                var expectedResult = '( ( one plus two ) times three )';
                assert.equal(multiplyNode.toWords(), expectedResult);
            });
        });
    });
    describe('Evaluate expression when expressions are in multiple statement',function(){
        it('should return 30 after evaluating the expression',function(){
            var variableNode = utils.createVariableNode('x');
            var firstNumberNode = utils.createNumberNode(10);
            var assignNode = utils.createAssignNode(variableNode,'=',firstNumberNode);
            var secondNumberNode = utils.createNumberNode(5);
            var plusNode = utils.createPlusNode(assignNode,'+',secondNumberNode)
            var thirdNumberNode = utils.createNumberNode(2);
            var multiplyNode = utils.createMultiplyNode(plusNode,'*', thirdNumberNode);
            assert.equal(30, multiplyNode.evaluate({'_': undefined})['_']);
        })
    })
});
