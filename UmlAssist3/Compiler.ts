import { type } from "os";

export function tokenizer(input:string): { type: string, value: string }[] {


    let current: number = 0;

    let tokens: { type: string, value: string }[] = [];
    
    while (current < input.length) {

        let char = input[current];
        
        //#region pointer{@}

        if (char === '@') {

            tokens.push({
                type: 'pointer',
                value: '@',
            });
            current++;

            continue;
        }

        //#endregion



        //#region statement; {:..;}

        if (char === ':') {
            let value = '';

            char = input[++current];

            while (char !== ';') {
                value += char;
                char = input[++current];
            }

            char = input[++current];

            tokens.push({ type: 'statement;', value });

            continue;
        }

        //#endregion



        //#region comment {//..\n}

        if (char === '/' && input[current+1]==='/') {
            let value = '';

            char = input[++current];
            char = input[++current];

            while (char !== '\n') {
                value += char;
                char = input[++current];
            }

            char = input[++current];

            tokens.push({ type: 'comment', value });

            continue;
        }

        //#endregion



        //#region new line{'\n'}
        
        if (char==='\n') {
            tokens.push({
                type: 'new line',
                value: char,
            });
            current++;
            continue;
        }

        //#endregion



        //#region white space{/\s/}

        let WHITESPACE = /\s/;
        if (WHITESPACE.test(char)) {
            tokens.push({
                type: 'white space',
                value: char,
            });
            current++;
            continue;
        }

        //#endregion



        //#region block:{{,}}

        if (char === '{') {

            tokens.push({
                type: 'block',
                value: '{',
            });
            current++;

            continue;
        }

        if (char === '}') {
            tokens.push({
                type: 'block',
                value: '}',
            });
            current++;
            continue;
        }

        //#endregion



        //#region name {/[a-z]/i}

        let LETTERS = /[a-z]/i;
        if (LETTERS.test(char)) {
            let value = '';

            while (LETTERS.test(char)) {
                value += char;
                char = input[++current];
                if (current === input.length) {
                    //tokens.push({ type: 'name', value });
                    //console.debug(tokens[tokens.length - 1]);
                    break;
                } 
            }

            tokens.push({ type: 'name', value });
            

            continue;
        }

        //#endregion



        //#region unknown

        tokens.push({ type: 'unknown', value: char });
        current++;
        //throw new TypeError('I dont know what this character is: ' + char);

        //#endregion


    }

    return tokens;
}

export function parser(tokens:{ type: string, value: string }[]) {
    let current: number = 0;

    function walk() {

        let token = tokens[current];



        //#region new line | white space 

        while (token.type === 'new line' || token.type === 'white space') {

            token = tokens[++current];
        }

        //#endregion



        //#region statement; -> statement; content

        if (token.type === 'statement;') {

            current++;

            return {
                type: 'statement; content',
                value: token.value,
            };
        }

        //#endregion



        //#region comment -> comment content

        if (token.type === 'comment') {

            current++;

            return {
                type: 'comment content',
                value: token.value,
            };
        }

        //#endregion



        //#region pointer -> flow

        if (
            token.type === 'pointer' &&
            tokens[current + 1].type === 'name' &&
            (tokens[current + 2].type === 'block' && tokens[current + 2].value==='{')
            ) {

            token = tokens[++current];

            let node = {
                type: 'flow',
                name: token.value,
                params: [],
            };

            token = tokens[++current];
            token = tokens[++current];

            while (token.type !== 'block' ||
                token.type === 'block' && token.value!=='}'
                ) {

                node.params.push(walk());

                token = tokens[current];

            }

            current++;

            return node;

        }

        //#endregion



        throw new TypeError(token.type);
    }

    let ast = {
        type: 'Root',
        body: [],
    };

    while (current < tokens.length) {
        ast.body.push(walk());
    }

    return ast;
}

export function traverser(ast, visitor) {
    function traverseArray(array, parent) {
        array.forEach(child => {
            traverseNode(child, parent);
        });
    }

    function traverseNode(node, parent) {

        let methods = visitor[node.type];

        if (methods && methods.enter) {
            methods.enter(node, parent);
        }

        switch (node.type) {

            case 'Program':
                traverseArray(node.body, node);
                break;

            case 'CallExpression':
                traverseArray(node.params, node);
                break;

            case 'NumberLiteral':
            case 'StringLiteral':
                break;

            default:
                throw new TypeError(node.type);
        }

        if (methods && methods.exit) {
            methods.exit(node, parent);
        }
    }

    traverseNode(ast, null);
}

export function transformer(ast) {
    let newAst = {
        type: 'Program',
        body: [],
    };

    ast._context = newAst.body;

    traverser(ast, {

        NumberLiteral: {
          
            enter(node, parent) {

                parent._context.push({
                    type: 'NumberLiteral',
                    value: node.value,
                });
            },
        },

        StringLiteral: {
            enter(node, parent) {
                parent._context.push({
                    type: 'StringLiteral',
                    value: node.value,
                });
            },
        },

        CallExpression: {
            enter(node, parent) {

                let expression = {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: node.name,
                    },
                    arguments: [],
                };

                node._context = expression.arguments;

                if (parent.type !== 'CallExpression') {

                    expression = {
                        type: 'ExpressionStatement',
                        //@ts-ignore
                        expression: expression,
                    };
                }

                parent._context.push(expression);
            },
        }
    });

    return newAst;
}

export function codeGenerator(node) {
    
    switch (node.type) {
        
        case 'Program':
            return node.body.map(codeGenerator)
                .join('\n');
        
        case 'ExpressionStatement':
            return (
                codeGenerator(node.expression) +
                ';' 
            );
        
        case 'CallExpression':
            return (
                codeGenerator(node.callee) +
                '(' +
                node.arguments.map(codeGenerator)
                    .join(', ') +
                ')'
            );
        
        case 'Identifier':
            return node.name;
        
        case 'NumberLiteral':
            return node.value;
        
        case 'StringLiteral':
            return '"' + node.value + '"';
        
        default:
            throw new TypeError(node.type);
    }
}

export function compiler(input) {
    let tokens = tokenizer(input);
    let ast = parser(tokens);
    let newAst = transformer(ast);
    let output = codeGenerator(newAst);

    // and simply return the output!
    return output;
}