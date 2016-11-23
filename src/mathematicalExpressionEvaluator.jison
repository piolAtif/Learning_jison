/* lexical grammar */
%{
    var utils = require('/Users/preetisharma/Dropbox/learning_language/jison/Learning_jison/src/utils.js');
%}

%lex
%%

\s+         	{/* skip whitespace */}
[0-9]+			return 'NUMBER';
"+"				return '+';
"-"       return '-';
"*"           return '*';
<<EOF>>       return 'EOF';

/lex

%left '+' '-'
%left '*'

%start expressions

%%
expressions
    : e EOF
        {
        	return utils.parse($1);
  		}
    ;
    
e
   : e '+' e
      {
        var node = utils.createPlusNode($2);
        node.setValues($1, $3);
        $$ = [$1, node, $3];
      }
    | e '*' e
      {
        var node = utils.createMultiplyNode($2);
        node.setValues($1, $3);
        $$ = [$1, node, $3];
      }
    | e '-' e
      {
        var node = utils.createMinusNode($2);
        node.setValues($1, $3);
        $$ = [$1, node, $3];
      }
    | NUMBER
      {$$ = utils.createNumberNode(Number(yytext))}  
    ;
arithmetic_operator
    : '+'
      {$$ = utils.createMinusNode(yytext);}
    | '*'
      {$$ = utils.createMultiplyNode(yytext);}
    | '-'
      {$$ = utils.createMinusNode(yytext);}
    ;

T :NUMBER($$) {$$ = utils.createNumberNode(Number(yytext));};