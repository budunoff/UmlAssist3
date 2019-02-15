
console.debug('begin App\n');
//tokenizer
import { tokenizer } from "./Compiler";
const Tokenizer = tokenizer;
console.debug('Tokenizer initiated\n');
//parser
import { parser } from "./Compiler";
const Parser = parser;
console.debug('Parser initiated\n');
//traverser,
import { traverser } from "./Compiler";
const Traverser = traverser;
console.debug('Traverser initiated\n');
//transformer,
import { transformer } from "./Compiler";
const Transformer = transformer;
console.debug('Transformer initiated\n');
//codeGenerator,
import { codeGenerator } from "./Compiler";
const CodeGenerator = codeGenerator;
console.debug('CodeGenerator initiated\n');
//compiler,
import { compiler } from "./Compiler";
const Compiler = compiler;
console.debug('Compiler initiated\n');
