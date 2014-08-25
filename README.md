# Arcee
Easy node.js configuration
---

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
var webconf = require("app.webserver")
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

### API

#### set
`function(namespace, config) => null || Error`

Stores config.

`namespace` is a string. If it contains a dot, `arcee` will separate the string
into a namespace. For example, `"app.foo"` and `"app.bar"` will belong to the
`app` namespace.

`config` can be an object or a file location to a JSON, YAML or TOML file.

If namespace if prefixed by `!` (`!app.foo`), then the configuration is mutable.

If config has already been set at the namespace given, an `Error` is returned.

`null` is returned is there were no errors.

### get
`function(namespace) => Object || Error`

Returns config.

If there is no config at that namespace, an `Error` is returned.

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

[LICENSE file](LICENSE)
