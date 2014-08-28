# JS style guide #

Based on npm's style guide.

## Line Length ##
Keep lines shorter than 80 characters. It's better for lines to be too short
than to be too long. Break up long lists, objects, and other statements onto multiple lines.


## Indentation ##
Tabs. Specifically, smart tabs.

Configure your editor appropriately.


## Curly braces ##
Curly braces belong on the same line as the thing that necessitates them.

Bad:

```js
function ()
{
```

Good:

```js
function () {
```

If a block needs to wrap to the next line, use a curly brace. Use it even if it doesn't.

Good:

```js
if (foo) { bar() }
while (foo)
bar()
```

Bad:

```js
if (foo) bar()

while (foo) {
  bar()
}
```

## Semicolons ##

Don't use them except in four situations:

- `for (;;)` loops. They're actually required.
- null loops like: `while (something) ;` (But you'd better have a good reason for doing that.)
- `case "foo": doSomething(); break`
- In front of a leading `(` or `[` at the start of the line. This prevents the expression from being interpreted as a function call or property access, respectively.

Some examples of good semicolon usage:

```js
;(x || y).doSomething()
;[a, b, c].forEach(doSomething)

for (var i = 0; i < 10; i ++) {
  switch (state) {
    case "begin": start(); continue
    case "end": finish(); break
    default: throw new Error("unknown state")
  }
  end()
}
```

> Note that starting lines with - and + also should be prefixed with a semicolon, but this is much less common.


## Whitespace ##

Put a single space in front of `(` for anything other than a function call. Also use a single space wherever it makes things more readable.

Don't leave trailing whitespace at the end of lines. Don't indent empty lines. Don't use more spaces than are helpful.


## Functions ##

Use named functions. They make stack traces a lot easier to read.

### Callbacks, Sync/async Style ###

Use the synchronous/blocking versions of things only. Nothing is async in arcee.


## Case, naming, etc. ##

Use lowerCamelCase for multiword identifiers when they refer to objects, functions, methods, members, or anything not specified in this section.

Use UpperCamelCase for class names (things that you'd pass to "new").

Use all-lower-hyphen-css-case for multiword filenames and config keys.

Use named functions. They make stack traces easier to follow.

Use CAPS_SNAKE_CASE for constants, things that should never change and are rarely used.


## null, undefined, false, 0 ##

Boolean variables and functions should always be either `true` or `false`. Don't set it to `0` unless it's supposed to be a number.

When something is intentionally missing or removed, set it to `null`.

Don't set things to `undefined`. Reserve that value to mean "not yet set to anything."


## Quotes ##

Double quote (`"`).

```js
// Good
var a = "hello";
```
