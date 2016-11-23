/* lexical grammar */
%{
    var utils = require('/Users/preetisharma/Dropbox/learning_language/jison/Learning_jison/src/utils.js');
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
        	return utils.parse($1);
  		}
    ;

E : E arithmetic_operator T {$2.setValues($1,$3);$$=[$1,$2,$3];}
  | T
  ;

minus : '-' {$$ = utils.createMinusNode(yytext);};
multi : '*' {$$ = utils.createMultiplyNode(yytext);};
plus : '+' {$$ = utils.createPlusNode(yytext);};

arithmetic_operator
    : plus
    | multi
    | minus
    ;

T :NUMBER($$) {$$ = utils.createNumberNode(Number(yytext));};