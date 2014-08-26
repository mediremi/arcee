var isNamespace = /\./
var handleNamespace = require("./handle-namespace")

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

	store(storage, name, config)

	return null
}
