var test = require("tape")
var arcee = require("../index")

test("Can set objects", function(t) {
	t.plan(2)

	t.equal(arcee.set("can_set", {}), null)
	t.equal(arcee.set("test.can_set", {}), null)
})

test("Can set from a file location", function(t) {
	t.plan(2)

	t.equal(arcee.set("can_set_file", "test.yml"), null)
	t.equal(arcee.set("test.can_set_file", "test.yml"), null)
})

test("Throws if config has already been set", function(t) {
	t.plan(1)

	arcee.set("test.set_throws", {})
	t.throws(function() {
		throw arcee.set("test.set_throws", {})
	})
})
