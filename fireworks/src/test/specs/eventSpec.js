describe("The renderer", function () {
    "use strict";
    it("should call the functions passed to listen when the correct event is fired", function () {
        var events = jim.events.create(),
            called = 0,
            argTest = "";

        events.on("testEvent", function (e) {
            called += 1;
            argTest += e.testArg;
        });

        events.on("testEvent", function (e) {
            called += 1;
            argTest += e.testArg;
        });

        expect(called).toBe(0);
        events.fire("fooMonkey");
        expect(called).toBe(0);
        events.fire("testEvent", {testArg: "cheese"});
        expect(called).toBe(2);
        expect(argTest).toBe("cheesecheese");
    });
});
