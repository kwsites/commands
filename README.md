Overview
========

Simplify access to command line arguments in node apps, and query string or hash parsing in the browser environment.

Installation
============

If using in node, installation via npm is as simple as `npm install commands.js` or just clone this repo and include the `lib/commands.js` script.

When using in the browser, include the `libs/commands.js` script using `<script src="/path/to/commands.js"></script>`

API
===

`Commands.get( key [, defaultValue] )` get the value of a named argument, or when that argument wasn't supplied get the supplied default value.

`Commands.exists( key )` get a boolean flag for whether a named argument was supplied


Usage - node.js
===============

Include Commands with require, then read command line arguments in camel case:

    var Commands = require('commands.js');
    console.log( Commands.get('someArg') );  // outputs "foo"
    console.log( Commands.get('someUnknownArg', 'defaultValue') );  // outputs "defaultValue"
    console.log( Commands.exists('someUnknownArg') );  // outputs false
    console.log( Commands.get('bar') );  // outputs true
    console.log( Commands.get('baz') );   // outputs false
    
    > node script.js -some-arg "foo" --bar --no-baz

Command line arguments can be sent either with a hyphen prefix for naming an argument where the next argument is the value of that argument (in this case "-some-arg" is converted to "someArg" and has the value "foo"). A double hyphen prefix is used to denote a flag, so here bar is true and baz is false because "--no-" is used as flag negation.

Usage - browser
===============

Including Commands as a script tag then makes available a global variable called "commands" that has the same API as in node however the data source is the query string and hash segments of the URL. Unlike in the node environment, evaluation of the arguments takes place every time they are queried to allow for changes in the hash of the page.

    console.log( commands.get('someArg') );  // outputs "foo"
    console.log( commands.get('someUnknownArg', 'defaultValue') );  // outputs "defaultValue"
    console.log( commands.exists('someUnknownArg') );  // outputs false
    console.log( commands.get('bar') );  // outputs true
    console.log( commands.get('baz') );   // outputs false
    
    location.href = 'somepage.html?someArg=foo&--bar&#--no-baz'

Here both the query string and hash are being used although it can be either or neither, if there are entities in the URL that are being used as options (ie: prefixed with a double hyphen) then they will still need a trailing ampersand to make the URL conform to the W3C spec.


    
    
