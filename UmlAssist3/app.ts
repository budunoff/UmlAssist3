
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

//#region test data

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
    @enduml
    13452345`;

const tstData3 =
`@blockName
{
	:statement a;
    :statement b;
    :statement c;
    @innerBlockName
    {
    	:statement d;
        :statement e;
        :statement f;
    }
    //and so on...	
}`;
//#endregion

console.debug('running Tokenizer');
var tokResult = Tokenizer(tstData3);
tokResult.forEach(tmp => {
    //if (tmp.type !== 'white space')
    console.debug(tmp);
});

console.debug('clearing white spaces and new lines');
let hlpr = [];
tokResult.forEach(tmp => {

    if (tmp.type !== 'white space' && tmp.type !== 'new line') {
        hlpr.push(tmp);
    }
});
tokResult = hlpr;
tokResult.forEach(tmp => {
    //if (tmp.type !== 'white space')
    console.debug(tmp);
});

console.debug('running Parser');
var parResult = Parser(tokResult);

const util = require('util')

console.log(util.inspect(parResult, false, null, true /* enable colors */))

//parResult1.body.forEach(tmp => {
//    console.debug(tmp);
//});
//console.debug('running Traverser');
//var travResult1 = Traverser();

//console.debug('running Transformer');
//var tranResult1 = Transformer();

//console.debug('running CodeGenerator');
//var codGenResult1 = CodeGenerator();

//console.debug('running Compiler');
//var comResult1 = Compiler();

console.debug('end');