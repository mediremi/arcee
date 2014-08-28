var extend = require("deep-extend")

module.exports = function(object, properties, value, mutable) {
	var tmp = object

	properties.forEach(function(property, i) {
		if (property in tmp) {
			tmp = tmp[property]
		} else if (value) {
			tmp = tmp[property] = {}
		}
	})

	if (value) {
		extend(tmp, value)

		if (!mutable) {
			Object.freeze(tmp)
		}
	} else {
		return tmp
	}
}
