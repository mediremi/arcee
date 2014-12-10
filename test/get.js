var test = require("tape")
var arcee = require("../index")

test("Can get objects", function(t) {
	t.plan(4)

	var obj = {hello: "hello"}

	arcee.set("can_get", obj)
	arcee.set("test.can_get", obj)

	arcee.set("deep", {
		a: {
			b: {
				c: {
					d: 42
				}
			}
		}
	})

	t.deepEqual(arcee.get("can_get"), obj)

	t.deepEqual(arcee.get("test.can_get"), obj)
	t.deepEqual(arcee.get("test").can_get, obj)

	t.deepEqual(arcee.get("deep.a.b.c.d"), 42)
})

test("Throws error if config does not exist", function(t) {
	t.plan(1)

	t.throws(function() {
		arcee.get("does_not_exist")
	})
})

test("Can get YAML, JSON and TOML", function(t) {
	t.plan(4)

	arcee.set("file.yaml", __dirname + "/test.yml")
	arcee.set("file.json", __dirname + "/test.json")
	arcee.set("file.toml", __dirname + "/test.toml")
	arcee.set("file.js", __dirname + "/../index.js")

	t.ok("test" in arcee.get("file.yaml"))
	t.ok("test" in arcee.get("file.json"))
	t.ok("test" in arcee.get("file.toml"))
	t.ok("set" in arcee.get("file.js"))
})

test("Objects can be immutable or mutable", function(t) {
	t.plan(2)

	arcee.set("get_immutable", {a: 42})
	arcee.set("!get_mutable", {smile: "☹"})

	var immutable = arcee.get("get_immutable")
	var mutable = arcee.get("get_mutable")

	immutable.a = Math.PI
	mutable.smile = "☺"

	t.equal(immutable.a, 42)
	t.equal(mutable.smile, "☺")
})
