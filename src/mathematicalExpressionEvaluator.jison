/* lexical grammar */
%{
    var utils = require('/Users/preetisharma/Dropbox/learning_language/jison/Learning_jison/src/utils.js');
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
';'           return 'EOL';
<<EOF>>       return 'EOF';

/lex

%left '+' '-','='
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
  :arithmetic EOL
  |assignmentExpression
  |assignmentExpression e
    {$$.push($2)}
  ;

assignmentExpression
  : variable_value '=' arithmetic EOL
      {
        var node = utils.createAssignNode($2);
        node.setValues($1,$3);
        $$ = [node];
      }
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
    
    | NUMBER
      {$$ = utils.createNumberNode(Number(yytext))} 

    | variable_value
    ;
