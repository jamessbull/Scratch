describe("A linear colour gradient", function() {

    it("the first location given should be the starting location", function() {
        var start = jim.movement.upAndDown.create(0,0);
        var result = start.nextPosition();
        expect(result.x).toBe(0);
        expect(result.y).toBe(0);
    });

});