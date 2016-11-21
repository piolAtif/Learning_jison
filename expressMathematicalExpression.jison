/* lexical grammar */
%{
    var parseTree = require('./utils.js');
%}

%lex
%%

\s+         	{/* skip whitespace */}
[0-9]+			return 'NUMBER';
"+"						return '+';
"*"           return '*';
<<EOF>>       return 'EOF';

/lex

%%

expressions
    : E EOF
        {
        	parseTree.parse();
  		}
    ;

E : E '+' T {$$=parseTree.add($1,$2,$3);}
  | E '*' T {$$=parseTree.add($1,$2,$3);}
  | T
  ;

T :NUMBER($$);

