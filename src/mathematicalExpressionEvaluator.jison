/* lexical grammar */
%{
    var parseTree = require('./utils.js');
%}

%lex
%%

\s+         	{/* skip whitespace */}
[0-9]+			return 'NUMBER';
"+"				return '+';
"*"           return '*';
<<EOF>>       return 'EOF';

/lex

%%

expressions
    : E EOF
        {
        	var result = parseTree.parse($1);
        	console.log(result.id)
        	console.log(result.words);
  		}
    ;

E : E plus T {$$=parseTree.add($1,$2,$3);}
  | E multi T {$$=parseTree.add($1,$2,$3);}
  | T
  ;


multi : '*' {$$ = parseTree.createMutiplyNode(yytext);};

plus : '+' {$$ = parseTree.createPlusNode(yytext);};

T :NUMBER($$) {$$ = parseTree.createNumberNode(yytext);};