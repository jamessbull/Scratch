describe("A color should be", function () {
    "use strict";
    it("100 should be all white", function () {
		var red = 125,
		    green = 25,
		    blue = 25,
            colour = jim.colour.create(red, green, blue, 255);

		expect(colour.red).toBe(125);
    });
});