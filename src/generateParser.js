var grammar = require('fs').readFileSync(process.argv[2], 'UTF-8');
var input = require('fs').readFileSync(process.argv[3], 'UTF-8');
var Parser = require("jison").Parser;
var parser = new Parser(grammar);
parser.parse(input);