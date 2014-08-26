var extend = require("deep-extend")

module.exports = function(object, properties, value) {
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
	} else {
		return tmp
	}
}
