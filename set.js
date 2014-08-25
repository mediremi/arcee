var isNamespace = /\./

function handleNamespace(object, properties, value) {
	for (var i = 0, tmp = object; i < properties.length; i++) {
		if (tmp[properties[i]]) {
			tmp = tmp[properties[i]]
		} else {
			tmp = tmp[properties[i]] = {}
		}
	}

	tmp = value
}

function store(object, property, value) {
	if (typeof property === "string") {
		object[property] = value
	} else if (Array.isArray(property)) {
		handleNamespace(object, property, value)
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
