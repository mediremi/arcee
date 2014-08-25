var test = require("tape")
var arcee = require("../index")

test("Can get objects", function(t) {
	t.plan(3)

	var obj = {}

	arcee.set("can_get", obj)
	arcee.set("test.can_get", obj)

	t.equal(arcee.get("can_get"), obj)

	t.equal(arcee.get("test.can_get"), obj)
	t.equal(arcee.get("test").can_get, obj)
})

test("Can get YAML, JSON and TOML", function(t) {
	t.plan(3)

	arcee.set("file.yaml", "test.yml")
	arcee.set("file.json", "../package.json")
	arcee.set("file.toml", "test.toml")

	t.ok(arcee.get("file.yaml").test)
	t.ok(arcee.get("file.json").name)
	t.ok(arcee.get("file.toml").test)
})
