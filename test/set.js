var test = require("tape")
var arcee = require("../index")

test("Can set objects", function(t) {
	t.plan(2)

	t.equal(arcee.set("can_set", {}), null)
	t.equal(arcee.set("test.can_set", {}), null)
})

test("Can set from a file location", function(t) {
	t.plan(2)

	t.equal(arcee.set("can_set_file", __dirname + "/test.yml"), null)
	t.equal(arcee.set("test.can_set_file", __dirname + "/test.yml"), null)
})

test("Can add to supported file extensions", function(t) {
	t.plan(2)

	t.throws(function() {
		arcee.set("wrong_ext", "not.supported")
	})

	arcee.addExtension("test", function() {
		// Need to make sure that this function is called
		t.ok(true)

		// Arcee expects an object to be returned
		return {}
	})

	arcee.set("good_ext", __dirname + "/test.test")
})

test("Throws if config has already been set", function(t) {
	t.plan(1)

	arcee.set("test.set_throws", {})

	t.throws(function() {
		throw arcee.set("test.set_throws", {})
	})
})
