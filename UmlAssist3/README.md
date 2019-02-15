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

