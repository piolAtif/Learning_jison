/* lexical grammar */
%{
    var path = require('path');
    var utils = require(path.resolve('./src/utils.js'));
    var Tree = require(path.resolve('./src/tree.js'));
%}

%lex
%%

\s+         	{/* skip whitespace */}
[0-9]+			  return 'NUMBER';
[a-zA-Z]+   return 'VARIABLE';
"+"				    return '+';
"-"           return '-';
'='           return '=';
"*"           return '*';
"^"           return '^';
';'           return 'EOL';
<<EOF>>       return 'EOF';

/lex

%left '+' '-','='
%left '*','^'

%start expressions

%%
expressions
    : e EOF
        {
        	return utils.parse($1);
  		}
    ;


e
  :e arithmetic EOL
      {$1.add($2)}
  |e assignmentExpression 
    {$1.add($2)}
  | {$$ = new Tree()}   
  ;

assignmentExpression
  : variable_value '=' arithmetic EOL
      { $$ = utils.createAssignNode($1, $2, $3);}
  ;

variable_value
  : VARIABLE {$$ = utils.createVariableNode(yytext)};

arithmetic
   : arithmetic '+' arithmetic
      {
        $$ = utils.createPlusNode($1, $2, $3);
      }
    | arithmetic '*' arithmetic
      {
        $$ = utils.createMultiplyNode($1, $2, $3);
      }
    | arithmetic '-' arithmetic
      {
        $$ = utils.createMinusNode($1, $2, $3);
      }
    | | arithmetic '^' arithmetic
      {
        $$ = utils.createPowNode($1, $2, $3);
      }
    
    | NUMBER
      {$$ = utils.createNumberNode(Number(yytext))} 

    | variable_value
    ;
