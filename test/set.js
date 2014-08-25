var test = require("tape")
var arcee = require("../index")

test("Can set objects", function(t) {
	t.plan(2)

	t.equal(arcee.set("foo", {}), null)
	t.equal(arcee.set("test.foo", {}), null)
})

test("Can set from a file location", function(t) {
	t.plan(2)

	t.equal(arcee.set("baz", "test.yml"), null)
	t.equal(arcee.set("test.baz", "test.yml"), null)
})

test("Throws if config has already been set", function(t) {
	t.plan(2)

	arcee.set("test.throws", {})
	t.throws(function() {
		throw arcee.set("test.throws", {})
	})
})
