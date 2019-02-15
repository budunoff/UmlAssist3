"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.debug('begin App\n');
//tokenizer
const Compiler_1 = require("./Compiler");
const Tokenizer = Compiler_1.tokenizer;
console.debug('Tokenizer initiated\n');
//parser
const Compiler_2 = require("./Compiler");
const Parser = Compiler_2.parser;
console.debug('Parser initiated\n');
//traverser,
const Compiler_3 = require("./Compiler");
const Traverser = Compiler_3.traverser;
console.debug('Traverser initiated\n');
//transformer,
const Compiler_4 = require("./Compiler");
const Transformer = Compiler_4.transformer;
console.debug('Transformer initiated\n');
//codeGenerator,
const Compiler_5 = require("./Compiler");
const CodeGenerator = Compiler_5.codeGenerator;
console.debug('CodeGenerator initiated\n');
//compiler,
const Compiler_6 = require("./Compiler");
const Compiler = Compiler_6.compiler;
console.debug('Compiler initiated\n');
//# sourceMappingURL=app.js.map