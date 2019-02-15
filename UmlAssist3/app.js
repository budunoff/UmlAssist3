"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.debug('app.js begin\n');
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
let inp = tstData3;
console.debug('original input:\n' + inp);
console.debug('\nrunning Tokenizer');
var tokResult = Tokenizer(inp);
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
const util = require('util');
console.log(util.inspect(parResult, false, null, true /* enable colors */));
//console.debug('running Traverser');
//var travResult = Traverser();
console.debug('running Transformer');
var tranResult = Transformer(parResult);
console.log(util.inspect(tranResult, false, null, true /* enable colors */));
console.debug('running CodeGenerator');
var codGenResult = CodeGenerator(tranResult);
console.debug('\n' + codGenResult);
console.debug('running Compiler');
var comResult = Compiler(inp);
console.debug('compiled result:\n\n' + comResult);
//#region umlPlant
console.debug('running CodeGenerator for umlPlant');
var codGenResultUml = Compiler_1.codeGeneratorUml(tranResult);
console.debug('\n' + codGenResultUml);
console.debug('running Compiler for UmlPlant');
var comResultUml = Compiler_1.compilerUml(inp);
console.debug('compiled result:\n\n' + comResultUml);
//#endregion
console.debug('app.js end');
//# sourceMappingURL=app.js.map