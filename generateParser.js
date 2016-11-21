var file = require('fs').readFileSync('./expressMathematicalExpression.jison', 'UTF-8');
var Parser = require("jison").Parser;
var parser = new Parser(file);
parser.parse("2+3*4");