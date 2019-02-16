"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tokenizer(input) {
    let current = 0;
    let tokens = [];
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
        //#region statement {:..;}
        if (char === ':') {
            let value = '';
            char = input[++current];
            while (char !== ';') {
                value += char;
                char = input[++current];
            }
            char = input[++current];
            tokens.push({ type: 'statement', value });
            continue;
        }
        //#endregion
        //#region comment {//..\n}
        if (char === '/' && input[current + 1] === '/') {
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
        if (char === '\n') {
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
        //tokens.push({ type: 'unknown', value: char });
        //current++;
        throw new TypeError('I dont know what this character is: ' + char);
        //#endregion
    }
    return tokens;
}
exports.tokenizer = tokenizer;
function parser(tokens) {
    let current = 0;
    function walk() {
        let token = tokens[current];
        //#region new line | white space 
        while (token.type === 'new line' || token.type === 'white space') {
            token = tokens[++current];
        }
        //#endregion
        //#region statement; -> statementContent
        if (token.type === 'statement') {
            current++;
            return {
                type: 'statementContent',
                value: token.value,
            };
        }
        //#endregion
        //#region comment -> commentContent
        if (token.type === 'comment') {
            current++;
            return {
                type: 'commentContent',
                value: token.value,
            };
        }
        //#endregion
        //#region pointer -> region
        if (token.type === 'pointer' &&
            tokens[current + 1].type === 'name' &&
            (tokens[current + 2].type === 'block' && tokens[current + 2].value === '{')) {
            token = tokens[++current];
            let node = {
                type: 'region',
                name: token.value,
                params: [],
            };
            token = tokens[++current];
            token = tokens[++current];
            while (token.type !== 'block' ||
                token.type === 'block' && token.value !== '}') {
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
exports.parser = parser;
function traverser(ast, visitor) {
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
            case 'Root':
                traverseArray(node.body, node);
                break;
            case 'region':
                traverseArray(node.params, node);
                break;
            case 'statementContent':
            case 'commentContent':
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
exports.traverser = traverser;
function transformer(ast) {
    let newAst = {
        type: 'Root',
        body: [],
    };
    ast._context = newAst.body;
    let visitor = {
        statementContent: {
            enter(node, parent) {
                parent._context.push({
                    type: 'statementContent',
                    value: node.value,
                });
            },
        },
        commentContent: {
            enter(node, parent) {
                parent._context.push({
                    type: 'commentContent',
                    value: node.value,
                });
            },
        },
        region: {
            enter(node, parent) {
                let expression = {
                    type: 'Region',
                    callee: {
                        type: 'RegionName',
                        name: node.name,
                    },
                    arguments: [],
                };
                node._context = expression.arguments;
                if (parent.type !== 'region') {
                    expression = {
                        type: 'MainRegion',
                        //@ts-ignore
                        expression: expression,
                    };
                }
                parent._context.push(expression);
            },
        }
    };
    traverser(ast, visitor);
    return newAst;
}
exports.transformer = transformer;
function codeGenerator(node) {
    switch (node.type) {
        case 'Root':
            return node.body.map(codeGenerator)
                .join('\n');
        case 'Region':
            return ('//#region Region ' + codeGenerator(node.callee) + '\n\n' +
                node.arguments.map(codeGenerator).join('') +
                '\n\n//#endregion');
        case 'RegionName':
            return node.name;
        case 'MainRegion':
            return ('//#region Main Region(entry)\n\n' +
                codeGenerator(node.expression) +
                '\n\n//#endregion');
        case 'commentContent':
            return;
        case 'statementContent':
            return '\n/**\n' + node.value + '\n**/\n\n';
        default:
            throw new TypeError(node.type);
    }
}
exports.codeGenerator = codeGenerator;
function compiler(input) {
    let tokens = tokenizer(input);
    let hlpr = [];
    tokens.forEach(tmp => {
        if (tmp.type !== 'white space' && tmp.type !== 'new line') {
            hlpr.push(tmp);
        }
    });
    tokens = hlpr;
    let ast = parser(tokens);
    let newAst = transformer(ast);
    let output = codeGenerator(newAst);
    // and simply return the output!
    return output;
}
exports.compiler = compiler;
//#region plantUml
function codeGeneratorUml(node) {
    switch (node.type) {
        case 'Root':
            return node.body.map(codeGeneratorUml)
                .join('\n');
        case 'Region':
            return ('partition ' + codeGeneratorUml(node.callee) + '\n{\n\t' +
                node.arguments.map(codeGeneratorUml).join('\t') +
                '\n}\n');
        case 'RegionName':
            return node.name;
        case 'MainRegion':
            return ('partition Main(entry)\n{\n' +
                codeGeneratorUml(node.expression) +
                '\n}\n');
        case 'commentContent':
            return "'" + node.value;
        case 'statementContent':
            return ':' + node.value + ';\n';
        default:
            throw new TypeError(node.type);
    }
}
exports.codeGeneratorUml = codeGeneratorUml;
function compilerUml(input) {
    let tokens = tokenizer(input);
    let hlpr = [];
    tokens.forEach(tmp => {
        if (tmp.type !== 'white space' && tmp.type !== 'new line') {
            hlpr.push(tmp);
        }
    });
    tokens = hlpr;
    let ast = parser(tokens);
    let newAst = transformer(ast);
    let output = codeGeneratorUml(newAst);
    // and simply return the output!
    return output;
}
exports.compilerUml = compilerUml;
//#endregion
//# sourceMappingURL=Compiler.js.map