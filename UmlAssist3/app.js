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
console.debug('preparing test data');
//#region test data
const tstData1 = `(add 2 2)
    (add 2 (subtract 4 2))
    (subtract 4 2)`;
const tstData2 = `@startuml
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
const tstData3 = `@blockName
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
console.debug('running Parser');
var parResult1 = Parser(tokResult);
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
//# sourceMappingURL=app.js.map