---
title: JavaScript DocBlock Standard | Commerce PHP Extensions
description: Review standards for adding inline documentation to JavaScript code in Adobe Commerce and Magento Open Source projects. 
---

# JavaScript DocBlock standard

To add [JavaScript](https://glossary.magento.com/javascript) code inline documentation, follow these guidelines. Some parts of the code may not comply with this standard, but we are working to gradually improve this. Following these standard is optional for third-party developers, but will help to create consistent, clean, and easy to read inline documentation.
This standard are a subset of [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml) regulations.

Use [RFC 2119](http://www.ietf.org/rfc/rfc2119.txt) to interpret the "must," "must not," "required," "shall," "shall not," "should," "should not," "recommended," "may," and "optional" keywords.

## Use JSDoc

Document all files, classes, methods, and properties with JSDoc comments.

Inline comments should be of the "//" type.

It is recommended to avoid sentence fragments in documentation blocks. Use sentence-style capitalization and put a period at the end. Sentence fragmentation is acceptable in inline commentaries to keep it short.

### Comment syntax

JSDoc comments requirements:

*  A JSDoc comment should begin with a slash (/) and two asterisks (*).
*  Inline tags should be enclosed in braces: `{ @code this }`.
*  `@desc` Block tags should always start on their own line.

Example:

```javascript
/**
* A testJSDoc comment should begin with a slash and 2 asterisks.
* Inline tags should be enclosed in braces like {@code this}.
* @desc Block tags should always start on their own line.
*/
```

Many tools extract [metadata](https://glossary.magento.com/metadata) from JSDoc comments to validate and optimize the code.

### JSDoc indentation

If you have to line break a block tag, you should treat this as breaking a code statement and indent it four spaces.

```javascript
/**
 * Illustrates line wrapping for long param/return descriptions.
 *
 * @param {string} foo This is a param with a description too long to fit in
 *     one line.
 * @return {number} This returns something that has a description too long to
 *     fit in one line.
 */
project.MyClass.prototype.method = function(foo) {
    return 5;
};
```

### Class comments

Classes must be documented with a description, and appropriate type tags.

```javascript
/**
 * Class making something fun and easy.
 * @param {string} arg1 An argument that makes this more interesting.
 * @param {Array.<number>} arg2 List of numbers to be processed.
 * @constructor
 */
project.MyClass = function(arg1, arg2) {
    // ...
};
```

### Method and function comments

A description must be provided along with parameters. Method descriptions should start with a sentence written in the third person declarative voice.

```javascript
/**
 * Operates on an instance of MyClass and returns something.
 *
 * @param {project.MyClass} obj Instance of MyClass which leads to a long
 *     comment that needs to be wrapped to two lines.
 * @return {boolean} Whether something occurred.
 */
function someMethod(obj) {
    // ...
}
```

### Property comments

```javascript
/**
 * Maximum number of things per pane.
 *
 * @type {number}
 */
project.MyClass.prototype.someProperty = 4;
```

### JSDoc tag reference

#### @const

Marks a variable read-only and suitable for inlining. Generates warnings if it is rewritten. Constants should also be ALL_CAPS, but the annotation should help eliminate reliance on the naming convention.

```javascript
/** @const */ var DEFAULT_TIMEZONE = 'GMT';

/** @const */ MyClass.DEFAULT_TIMEZONE = 'GMT';

/**
 * My namespace's default timezone.
 *
 * @const
 * @type {string}
 */
mynamespace.DEFAULT_TIMEZONE = 'GMT';
```

#### @extends

Used with `@constructor` to indicate that a class inherits from another class.

```javascript
/**
 * Immutable empty node list.
 *
 * @constructor
 * @extends project.MyClass.BasicNodeList
 */
project.MyClass.EmptyNodeList = function() {
    // ...
};
```

#### @interface

Used to indicate that the function defines an interface.

```javascript
/**
 * A shape.
 *
 * @interface
 */
function Shape() {};
Shape.prototype.draw = function() {};

/**
 * A polygon.
 *
 * @interface
 * @extends {Shape}
 */
function Polygon() {};
Polygon.prototype.getSides = function() {};
```

#### @implements

Used with `@constructor` to indicate that a class implements an interface.

```javascript
/**
 * A shape.
 *
 * @interface
 */
function Shape() {};
Shape.prototype.draw = function() {};

/**
 * @constructor
 * @implements {Shape}
 */
function Square() {};
Square.prototype.draw = function() {
    // ...
};
```

#### @lends

Indicates that the keys of an object literal should be treated as properties of some other object. This annotation should only appear on object literals.

Please note that the name in braces is not a type name like in other annotations. It's an object name. It names the object on which the properties are "lent". For example, `@type {Foo}` means "an instance of Foo," but `@lends {Foo}` means "the constructor Foo".

Please refer to [JSDoc Toolkit](https://code.google.com/p/jsdoc-toolkit/wiki/TagLends) for more information about this annotation.

```javascript
project.MyClass.extend(
    Button.prototype,
    /** @lends {Button.prototype} */ {
        isButton: function() {return true;}
    }
);
```

#### @override

Indicates that a method or property of a subclass intentionally hides a method or property of the superclass. If no other documentation is included, the method or property also inherits documentation from its superclass.

```javascript
/**
 * @return {string} Human-readable representation of project.SubClass.
 * @override
 */
project.SubClass.prototype.toString() {
    // ...
};
```

#### @param

Used with method, function and constructor calls to document the arguments of a function.

Type names must be enclosed in curly braces. If the type is omitted, the compiler will not type-check the parameter.

```javascript
/**
 * Queries a Storage for items.
 *
 * @param {number} groupNum Subgroup id to query.
 * @param {string|number|null} term An itemName,
 *     or itemId, or null to search everything.
 */
[namespace](https://glossary.magento.com/namespace).Storage.prototype.query = function(groupNum, term) {
   // ...
};
```

#### @return

Used with method and function calls to document the return type. When writing descriptions for boolean parameters, prefer "Whether the component is visible" to "True if the component is visible, false otherwise". If there is no return value, do not use an `@return` tag.

Type names must be enclosed in curly braces. If the type is omitted, the compiler will not type-check the return value.

```javascript
/**
 * @return {string} The hex ID of the last item.
 */
namespace.Storage.prototype.getLastId = function() {
    // ...
    return id;
};
```

#### @this

The type of the object in whose context a particular method is called. Required when the this [keyword](https://glossary.magento.com/keyword) is referenced from a function that is not a prototype method.

```javascript
pinto.chat.RosterWidget.extern('getRosterElement',
    /**
     * Returns the roster widget element.
     *
     * @this pinto.chat.RosterWidget
     * @return {Element}
     */
    function() {
        return this._getWrappedComponent().getElement();
    }
);
```

#### @type

Identifies the type of a variable, property, or expression.

```javascript
/**
 * The message hex ID.
 *
 * @type {string}
 */
var hexId = hexId;
```

#### @typedef

This annotation can be used to declare an alias of a more complex type.

```javascript
/** @typedef {(string|number)} */
namespace.NumberLike;

/** @param {namespace.NumberLike} x A number or a string. */
namespace.readNumber = function(x) {
    // ...
}
```

### JavaScript types

#### number

```js
1
1.0
-5
1e5
Math.PI
```

#### Number

Number object.

```js
new Number(true)
```

#### string

String value.

```js
'Hello'
"World"
String(42)
```

#### String

String object.

```js
new String('Hello')
new String(42)
```

#### boolean

Boolean value.

```js
true
false
Boolean(0)
```

#### Boolean

Boolean object.

```js
new Boolean(true)
```

#### RegExp

```js
new RegExp('hello')
/world/g
```

#### Date

```js
new Date
new Date()
```

#### null

```js
null
```

#### undefined

```js
undefined
```

#### void

No return value.

```js
function f() {
   return;
}
```

#### Array

Untyped array.

```js
['foo', 0.3, null]
[]
```

#### Array.&#60;number&#62;

An array of numbers.

```js
[11, 22, 33]
```

#### Array.&#60;Array.&#60;string&#62;&#62;

Array of arrays of strings.

```js
[['one', 'two', 'three'], ['foo', 'bar']]
```

#### Object

```js
{}
{foo: 'abc', bar: 123, baz: null}
```

#### Object.&#60;string&#62;

An object. In the object, the values are strings.

```js
{'foo': 'bar'}
```

#### Object.&#60;number,string&#62;

An object. In the object, the keys are numbers and the values are strings. Note that in JavaScript, the keys are always implicitly converted to strings, so obj['1'] == obj[1]. So the key will always be a string in for...in loops. But the compiler will verify the type if the key when indexing into the object.

```js
var obj = {};
obj[1] = 'bar';
```

#### Function

Function object

```js
function(x, y) {
   return x * y;
}
```

#### function(number, number): number

Function value

```js
function(x, y) {
   return x * y;
}
```

#### SomeClass

```js
/** @constructor */
function SomeClass() {}

new SomeClass();
```

#### SomeInterface

```js
/** @interface */
function SomeInterface() {}

SomeInterface.prototype.draw = function() {};
```

#### project.MyClass

```js
/** @constructor */
project.MyClass = function () {}

new project.MyClass()
```

#### Element

Elements in the DOM.

```js
document.createElement('div')
```

#### Node

Node in the DOM.

```js
document.body.firstChild
```

#### HTMLInputElement

A specific type of DOM element.

```js
htmlDocument.getElementsByTagName('input')[0]
```

### JavaScript type language

#### Type name

Simply the name of a type.

```js
{boolean}, {Window}, {namespace.ui.Menu}
```

#### Type application

Parametrizes a type, by applying a set of type arguments to that type. The idea is analogous to generics in Java.

```js
// An array of strings.
{Array. <string>}

// An object. In the object, the keys are strings and the values are numbers.
{Object. }
```

#### Type union

Indicates that a value might have type A OR type B.

```js
// A number or a boolean.
{(number|boolean)}
```

**Deprecated syntaxes:**

```js
{(number,boolean)}, {number|boolean}, {(number||boolean)}
```

#### Record type

Indicates that the value has the specified members with the specified types. In this case, `myNum` with a type `number` and `myObject` with any type. Note that the braces are part of the type syntax. For example, to denote an `Array` of objects that have a `length` property, you might write `Array.<{length}>`.

```js
// An anonymous type with the given type members.
codemyNum: number, myObject}}
```

#### Nullable type

Indicates that a value is type A or `null`. By default, all object types are nullable.

<InlineAlert variant="info" slots="text"/>

Function types are not nullable.

```js
// A number or NULL.
{?number}
```

**Deprecated syntax:**

```js
{number?}
```

#### Non-nullable type

Indicates that a value is type A and not null. By default, all value types (boolean, number, string, and undefined) are not nullable.

```js
// An Object, but never the null value.
{!Object}
```

**Deprecated syntax:**

```js
{Object!}
```

#### Function type

Specifies a function.

```js
// A function that takes two arguments (a string and a boolean), and has an unknown return value.
{function(string, boolean)}
```

#### Function return type

Specifies a function return type.

```js
// A function that takes no arguments and returns a number.
{function(): number}
```

#### Function `this` type

Specifies the context type of a function type.

```js
// A function that takes one argument (a string), and executes in the context of a namespace.ui.Menu.
{function(this:namespace.ui.Menu, string)}
```

#### Function `new` type

Specifies the constructed type of a constructor.

```js
// A constructor that takes one argument (a string), and creates a new instance of namespace.ui.Menu when called with the 'new' keyword.
{function(new:namespace.ui.Menu, string)}
```

#### Variable arguments

Specifies variable arguments to a function.

```js
// A function that takes one argument (a string), and then a variable number of arguments that must be numbers.
{function(string, ...[number]): number}
```

#### Variable arguments (in `@param` annotations)

Specifies that the annotated function accepts a variable number of arguments.

```js
// A variable number of arguments to an annotated function.
@param {...number} var_args
```

#### Functional optional arguments

Specifies optional arguments to a function.

```js
// A function that takes one optional, nullable string and one optional number as arguments. The = syntax is only for function type declarations.
{function(?string=, number=)}
```

#### Functional optional arguments (in `@param` annotations)

Specifies that the annotated function accepts an optional argument.

```js
// An optional parameter of type number.
@param {number=} opt_argument
```

#### The ALL type

Indicates that the variable can take on any type.

```js
{*}
```

#### The UNKOWN type

Indicates that the variable can take on any type, and the compiler should not type-check any uses of it.

```js
{?}
```
