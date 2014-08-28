var storage = {}

exports.get = require("./get").bind(null, storage)
exports.set = require("./set").bind(null, storage)

exports.addExtension = require("./parse-config").addExtension
exports.supportedExtensions = require("./parse-config").supportedExtensions
