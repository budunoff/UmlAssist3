
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

console.debug('preparing test data');

const tstData1 =
    `(add 2 2)
    (add 2 (subtract 4 2))
    (subtract 4 2)`;

const tstData2 =
    `@startuml
    :Ready;
    :next(o)|
    :Receiving;
    split
     :nak(i)<
     :ack(o)>
    split again
     :ack(i)<
     :next(o)
     on several lines|
     :i := i + 1]
     :ack(o)>
    split again
     :err(i)<
     :nak(o)>
    split again
     :foo/
    split again
     :i > 5}
    stop
    end split
    :finish;
    @enduml`;

console.debug('running Tokenizer');
var tokResult1 = Tokenizer(tstData1);
var tokResult2 = Tokenizer(tstData2);

//console.debug('running Parser');
//var parResult = Parser();

//console.debug('running Traverser');
//var travResult = Traverser();

//console.debug('running Transformer');
//var tranResult = Transformer();

//console.debug('running CodeGenerator');
//var codGenResult = CodeGenerator();

//console.debug('running Compiler');
//var comResult = Compiler();

console.debug('end');