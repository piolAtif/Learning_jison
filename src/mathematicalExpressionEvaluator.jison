/* lexical grammar */
%{
    var parseTree = require('/Users/preetisharma/Dropbox/learning_language/jison/Learning_jison/src/utils.js');
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
        	console.log(result.id);
        	console.log(result.words);
  		}
    ;

E : E arithmetic_operator T {$$=[$1,$2,$3];}
  | T
  ;

minus : '-' {$$ = parseTree.creatMinusNode(yytext);};
multi : '*' {$$ = parseTree.createMutiplyNode(yytext);};
plus : '+' {$$ = parseTree.createPlusNode(yytext);};

arithmetic_operator
    : plus
    | multi
    | minus
    ;

T :NUMBER($$) {$$ = parseTree.createNumberNode(yytext);};