var extend = require("deep-extend")

module.exports = function(object, properties, value, mutable) {
	var tmp = object

	properties.forEach(function(property, i) {
		if (tmp[properties[i]]) {
			tmp = tmp[properties[i]]
		} else if (value) {
			tmp = tmp[properties[i]] = {}
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
