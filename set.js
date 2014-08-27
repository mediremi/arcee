var handleNamespace = require("./handle-namespace")
var parseConfig = require("./parse-config").parse

var isNamespace = /\./
var isMutable = /^!/

function store(storage, property, value, mutable) {
	if (typeof property === "string") {
		storage[property] = value

		if (!mutable) {
			Object.freeze(storage[property])
		}
	} else if (Array.isArray(property)) {
		handleNamespace(storage, property, value, mutable)
	}
}

module.exports = function(storage, name, config) {
	var mutable = false

	if (name in storage) {
		throw new Error(name + " has already been configured")
	}

	if (isMutable.test(name)) {
		mutable = true

		// Remove the '!' at the start
		name = name.slice(1)
	}

	if (isNamespace.test(name)) {
		// Hack to check if config has been set
		storage[name] = true

		name = name.split(".")
	}

	if (typeof config === "string") {
		config = parseConfig(config)
	}

	store(storage, name, config, mutable)

	return null
}
