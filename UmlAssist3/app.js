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
const tstData3 = `Up am intention on dependent questions oh elsewhere september. No betrayed pleasure possible jointure we in throwing. And can event rapid any shall woman green. Hope they dear who its bred. Smiling nothing affixed he carried it clothes calling he no. Its something disposing departure she favourite tolerably engrossed. Truth short folly court why she their balls. Excellence put unaffected reasonable mrs introduced conviction she. Nay particular delightful but unpleasant for uncommonly who. 

Are own design entire former get should. Advantages boisterous day excellence boy. Out between our two waiting wishing. Pursuit he he garrets greater towards amiable so placing. Nothing off how norland delight. Abode shy shade she hours forth its use. Up whole of fancy ye quiet do. Justice fortune no to is if winding morning forming. 

No opinions answered oh felicity is resolved hastened. Produced it friendly my if opinions humoured. Enjoy is wrong folly no taken. It sufficient instrument insipidity simplicity at interested. Law pleasure attended differed mrs fat and formerly. Merely thrown garret her law danger him son better excuse. Effect extent narrow in up chatty. Small are his chief offer happy had. 

Building mr concerns servants in he outlived am breeding. He so lain good miss when sell some at if. Told hand so an rich gave next. How doubt yet again see son smart. While mirth large of on front. Ye he greater related adapted proceed entered an. Through it examine express promise no. Past add size game cold girl off how old. 

Received the likewise law graceful his. Nor might set along charm now equal green. Pleased yet equally correct colonel not one. Say anxious carried compact conduct sex general nay certain. Mrs for recommend exquisite household eagerness preserved now. My improved honoured he am ecstatic quitting greatest formerly. 

He oppose at thrown desire of no. Announcing impression unaffected day his are unreserved indulgence. Him hard find read are you sang. Parlors visited noisier how explain pleased his see suppose. Do ashamed assured on related offence at equally totally. Use mile her whom they its. Kept hold an want as he bred of. Was dashwood landlord cheerful husbands two. Estate why theirs indeed him polite old settle though she. In as at regard easily narrow roused adieus. 

Performed suspicion in certainty so frankness by attention pretended. Newspaper or in tolerably education enjoyment. Extremity excellent certainty discourse sincerity no he so resembled. Joy house worse arise total boy but. Elderly up chicken do at feeling is. Like seen drew no make fond at on rent. Behaviour extremely her explained situation yet september gentleman are who. Is thought or pointed hearing he. 

In by an appetite no humoured returned informed. Possession so comparison inquietude he he conviction no decisively. Marianne jointure attended she hastened surprise but she. Ever lady son yet you very paid form away. He advantage of exquisite resolving if on tolerably. Become sister on in garden it barton waited on. 

His having within saw become ask passed misery giving. Recommend questions get too fulfilled. He fact in we case miss sake. Entrance be throwing he do blessing up. Hearts warmth in genius do garden advice mr it garret. Collected preserved are middleton dependent residence but him how. Handsome weddings yet mrs you has carriage packages. Preferred joy agreement put continual elsewhere delivered now. Mrs exercise felicity had men speaking met. Rich deal mrs part led pure will but. 

Picture removal detract earnest is by. Esteems met joy attempt way clothes yet demesne tedious. Replying an marianne do it an entrance advanced. Two dare say play when hold. Required bringing me material stanhill jointure is as he. Mutual indeed yet her living result matter him bed whence. 

`;
console.debug('running Tokenizer');
var tokResult1 = Tokenizer(tstData1);
var tokResult2 = Tokenizer(tstData2);
var tokResult3 = Tokenizer(tstData3);
tokResult3.forEach(tmp => {
    console.debug(tmp);
});
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
//# sourceMappingURL=app.js.map