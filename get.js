module.exports = function(storage, name) {
	if (name in storage) {
		return storage[name]
	} else {
		return new Error(name + " not set")
	}
}
