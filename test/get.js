var test = require("tape")
var arcee = require("../index")

test("Can get objects", function(t) {
	t.plan(3)

	var obj = {}

	arcee.set("foo", obj)
	arcee.set("baz.foo", obj)

	t.equal(arcee.get("foo"), obj)

	t.equal(arcee.get("baz.foo"), obj)
	t.equal(arcee.get("baz").foo, obj)
})

test("Can get YAML, JSON and TOML", function(t) {
	t.plan(2)

	arcee.set("file.yaml", "test.yml")
	arcee.set("file.json", "../package.json")
	arcee.set("file.toml", "test.toml")

	t.ok(arcee.get("file.yaml").test)
	t.ok(arcee.get("file.json").name)
	t.ok(arcee.get("file.toml").test)
})
