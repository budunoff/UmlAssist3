Lang Specifications:
===

>this system is not intended to represent a programming language,
>but rather a new way of organizing, visualizing and generating code.

---

[toc]

---

>##Special thanks
>this project is heavily inspired by two other projects
>>[the super tiny compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)
>>Great project, special thanks.
>>this projects explains how compilers work
>>in an easy to understand way

>---
>>[plantUml](http://plantuml.com/)
>>Another great project that creates diagrams from easy to read code.

General Build
---

The program is made from *blocks* each *block* represents a *flow*
each *block* is made up from:

* Name
* Statements
* Other Blocks (*optionaly*)


###Simple block structure

####Block
>The block is the main body ot the code

The simplest block looks like this:
```
@blockName
{
	//block body...
}
```

A simple block with statements looks like this:
```
@blockName
{
	:statement a;
    :statement b;
    :statement c;
    //and so on...
}
```

A simple block with a nested block:
```
@blockName
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
}
```


####Statement
>{statement definition}

A statement can be made single lines:
```
@blockName
{
	:statement a;
    :statement b;
    :statement c;
    //and so on...
}
```

A statement can be made from several lines:
```
{
	:statement a;
    
    :all this is
    statement b;
    
    :statement c
    cab be much longer
    it can contain as many
    lines as needed;
    //and so on...
}
```

##Rules
 
 this transpiler turnes this code simultaniusley to PlantUml Code and(*optionaly*) diagram
 and javaScript templates that make the software architecture planning and creation much easier.
 
> **The next example will demonstrate the original code and the compilation result:**
>> ```
>>@blockName
>>{
>>	:statement a;
>>    :statement b;
>>    :statement c;
>>    //and so on...
>>}
>>```
>
>**javaScript:**
>
>>```
>>//#region blockName
>>
>>/**
>>	statement a
>>**/
>>
>>/**
>>	statement b
>>**/
>>
>>/**
>>	statement c
>>**/
>>
>>//#endregion
>>```
>
>**PlantUml**
>
>>```
>>@startuml
>>partition blockName
>>{
>>	:statement a;
>>	:statement b;
>>	:statement c;
>>	'and so on...
>>}
>>@enduml
>>```

---

> **Another example:**
>> ```
>>@blockName
>>{
>>	:statement a;
>>    
>>    :all this is
>>    statement b;
>>    
>>    :statement c
>>    can be much longer
>>    it can contain as many
>>    lines as needed;
>>    //and so on...
>>}
>>```
>
>**javaScript:**
>
>>```
>>//#region blockName
>>
>>/**
>>	statement a
>>**/
>>
>>/**
>>    all this is
>>    statement b
>>**/
>>
>>/**
>>    statement c
>>    can be much longer
>>    it can contain as many
>>    lines as needed
>>**/
>>
>>//#endregion
>>```
>
>**PlantUml**
>
>>```
>>@startuml
>>partition blockName
>>{
>>	:statement a;
>>	:all this is
>>	statement b;
>>	:statement c
>>	can be much longer
>>	it can contain as many
>>	lines as needed;
>>	'and so on...
>>}
>>@enduml
>>```

---

##Plans

---

###Task List:
- [x] Finish the basic compiler - February 16, 2019 1:32 AM
- [x] Finish the Js code generator - February 16, 2019 1:32 AM
- [x] Finish the plantUml code generator - February 16, 2019 1:57 AM
- [ ] Output dual code simultaniousley
- [ ] Start working with files

###Planned Features
- [ ] Add Functions
- [ ] Multiple files

###Known Bugs
- [ ] there is a **"non intended"** comma apearing in generated code - February 16, 2019 1:34 AM

######Licence - [LGPL V3](https://opensource.org/licenses/lgpl-3.0.html)