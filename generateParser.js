var file = require('fs').readFileSync(process.argv[2], 'UTF-8');
var Parser = require("jison").Parser;
var parser = new Parser(file);
parser.parse("2+3*4");