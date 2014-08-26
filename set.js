var path = require("path")
var fs = require("fs")
var yaml = require("yaml")
var toml = require("toml")
var handleNamespace = require("./handle-namespace")

var isNamespace = /\./

var supportedFiletypes = {
	yaml: yaml.eval,
	yml: yaml.eval,
	toml: toml.parse,
	json: JSON.parse
}

function store(storage, property, value) {
	if (typeof property === "string") {
		storage[property] = value
	} else if (Array.isArray(property)) {
		handleNamespace(storage, property, value)
	}
}

module.exports = function(storage, name, config) {
	if (name in storage) {
		return new Error(name + " has already been configured")
	}

	if (isNamespace.test(name)) {
		// Hack to check if config has been set
		storage[name] = true

		name = name.split(".")
	}

	if (typeof config === "string" && path.extname(config)) {
		// Slice the returned string as it contains a dot
		var configType = path.extname(config).slice(1)

		if (configType in supportedFiletypes) {
			console.log(config);
			config = supportedFiletypes[configType](fs.readFileSync(config).toString())
		}
	}

	store(storage, name, config)

	return null
}
