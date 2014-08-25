var storage = {}

exports.get = require("./get").bind(null, storage)
exports.set = require("./set").bind(null, storage)
