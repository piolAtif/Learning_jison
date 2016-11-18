/* lexical grammar */

%lex
%%

\s+         	{/* skip whitespace */}
[0-9]+					{	if(yylloc.first_line==1 && yylloc.first_column==0){
								parser = require('./utils.js');
							}
							return 'NUMBER';
						}
"+"						return '+';
"*"           return '*';
<<EOF>>               return 'EOF';

/lex

%%

expressions
    : E EOF
        {
        	parser.parse();
  		}
    ;

E : E '+' T {$$=parser.add($1,$2,$3);}
  | E '*' T {$$=parser.add($1,$2,$3);}
  | T
  ;

T :NUMBER($$);

