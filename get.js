var isNamespace = /\./
var handleNamespace = require("./handle-namespace")

module.exports = function(storage, name) {
	if (isNamespace.test(name))	{
		return handleNamespace(storage, name.split("."))
	} else if (name in storage) {
		return storage[name]
	} else {
		throw new Error(name + " not set")
	}
}
