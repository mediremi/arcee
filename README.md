# Arcee
Easy node.js configuration
---

[![Build Status](https://travis-ci.org/medimatrix/arcee.svg?branch=master)](https://travis-ci.org/medimatrix/arcee)

[![NPM](https://nodei.co/npm/arcee.png?compact=true)](https://nodei.co/npm/arcee/)

Arcee offers mutable and immutable configuration storage that can be shared
between modules and workers.

`npm install arcee`

## Usage

```js
var config = require("arcee")

// You can pass an object...
config.set("app.webserver", {
  port: 8000,
  engine: "haml"
})

// ...or the location of a file
config.set("app.db", "config/db.yaml")

// Get all config under the 'app' namespace
config.get("app") // => {webserver: {...}, db: {...}}
// Get only webserver data
config.get("app.webserver") // => {port: 8000, ...}

// Objects returned are immutable by default
var webconf = config.get("app.webserver")
webconf.port // => 8000
webconf.port = 80
webconf.port // => 8000

// To allow mutable config, prefix namespace by '!'
config.set("!app.foo", {...})

// Trying to set config again returns an error...
config.set("app.mongodb", {a: 1})
config.set("app.mongodb", {a: 1, b: 2}) // => Error

// ...unless that particular configuration is mutable
config.set("!app.mongodb", {a: 1})
config.set("!app.mongodb", {a: 1, b: 2}) // => `null`
```

## Methods

### set(namespace, config)
Stores config.

`null` is returned is there were no errors.

#### `namespace` (String)
If it contains a dot, `arcee` will separate the string
into a namespace. For example, `"app.foo"` and `"app.bar"` will belong to the
`app` namespace.

If namespace if prefixed by `!` (`!app.foo`), then the configuration is mutable.

#### `config` (Object || String)
Can be an object or a file location to a JSON, YAML or TOML file.

If config has already been set at the namespace given, an `Error` is returned.

#### Examples

```js
arcee.set("foo", {baz: 42})

arcee.set("!data", {number: 42})

arcee.set("app.bar", {hello: "hi"})

arcee.set("file", "info.toml")
```

### get(namespace)
Returns config.

If there is no config at that namespace, an `Error` is returned.

The `Object` returned will be a copy of the object passed to `arcee.set`.

## Test

```sh
$ cd node_modules/arcee
$ npm install
$ npm test
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License
GPLv3 or later.

> Copyright (C) 2014 Médi-Rémi Hashim

> This program is free software: you can redistribute it and/or modify
> it under the terms of the GNU General Public License as published by
> the Free Software Foundation, either version 3 of the License, or
> (at your option) any later version.

> This program is distributed in the hope that it will be useful,
> but WITHOUT ANY WARRANTY; without even the implied warranty of
> MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
> GNU General Public License for more details.

> You should have received a copy of the GNU General Public License
> along with this program.  If not, see <http://www.gnu.org/licenses/>.

[LICENSE file](LICENSE)
