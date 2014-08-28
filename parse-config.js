var path = require("path")
var fs = require("fs")
var yaml = require("yaml")
var toml = require("toml")

var supportedExtensions = {}

function readFile(fileLocation, configType) {
	var parser = supportedExtensions[configType]

	return parser(fs.readFileSync(fileLocation).toString())
}

function storeExt(store, fn) {
	return function(ext) {
		store[ext] = fn
	}
}

function addExtension(ext, fn) {
	if (typeof ext === "string") {
		supportedExtensions[ext] = fn
	} else if (Array.isArray(ext)) {
		ext.forEach(storeExt(supportedExtensions, fn))
	}
}

addExtension(["yaml", "yml"], yaml.eval)
addExtension("toml", toml.parse)
addExtension("json", JSON.parse)

exports.addExtension = addExtension

exports.supportedExtensions = function() {
	return Object.keys(supportedExtensions)
}

exports.parse = function(fileLocation) {
	// Slice the returned string as it contains a dot
	var configType = path.extname(fileLocation).slice(1)

	if (exports.supportedExtensions().indexOf(configType) !== -1) {
		return readFile(fileLocation, configType)
	} else {
		throw new Error("Filetype " + configType + " not supported")
	}
}
