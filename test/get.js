var test = require("tape")
var arcee = require("../index")

test("Can get objects", function(t) {
	t.plan(3)

	var obj = {hello: "hello"}

	arcee.set("can_get", obj)
	arcee.set("test.can_get", obj)

	t.deepEqual(arcee.get("can_get"), obj)

	t.deepEqual(arcee.get("test.can_get"), obj)
	t.deepEqual(arcee.get("test").can_get, obj)
})

test("Can get YAML, JSON and TOML", function(t) {
	t.plan(3)

	arcee.set("file.yaml", __dirname + "/test.yml")
	arcee.set("file.json", __dirname + "/../package.json")
	arcee.set("file.toml", __dirname + "/test.toml")

	t.ok(arcee.get("file.yaml").test)
	t.ok(arcee.get("file.json").name)
	t.ok(arcee.get("file.toml").test)
})

test("Objects can be immutable or mutable", function(t) {
	t.plan(4)

	arcee.set("get_immutable", {a: 42})
	arcee.set("!get_mutable", {smile: "☹"})

	var immutable = arcee.get("get_immutable")
	var mutable = arcee.get("get_mutable")

	t.equal(immutable instanceof Error, false)
	t.equal(mutable instanceof Error, false)

	immutable.a = Math.PI
	mutable.smile = "☺"

	t.equal(immutable.a, 42)
	t.equal(mutable.smile, "☺")
})
