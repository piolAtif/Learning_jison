/* lexical grammar */
%{
    var parseTree = require('/Users/preetisharma/Dropbox/learning_language/jison/Learning_jison/utils.js');
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
        	parseTree.parse($1);
  		}
    ;

E : E '+' T {$$=parseTree.add($1,$2,$3);}
  | E '*' T {$$=parseTree.add($1,$2,$3);}
  | T
  ;

T :NUMBER($$);

