describe("Physics and movement: ", function() {

    // A movement needs to take whatas the initial args?
    // Needs a starting position it also needs a force
    // How do I get to initial velocity from a force?
    // F=ma  V=u+at
    // F is initial force
    // m I decide too
    // So I can calculate a; f=ma; a=f/m;
    // Then v=u+at
    // I want to know v; u = 0; a = f/m; t should be a sixtieth of a second;
    // can I find out how long a frame takes in js or find out how much time passed?
    // I can find out how mch time passed. I get a timestamp passed to my callback so can be worked out


    it("the first location given should be the starting location", function() {
        var point = jim.point.create;
        var move = jim.movement.upAndDown.create;
        var movement = move(point(0,0))
        var result = movement.nextPosition();
        expect(result.x).toBe(0);
        expect(result.y).toBe(0);
        var result2 = movement.nextPosition()
    });

    it("acceleration is calculated from force and mass", function() {
        var accel = jim.movement.acceleration.create(4, 2);
        expect(accel.value()).toBe(2);

    });

    it("final velocity is initial velocity plus the product of acceleration and time", function() {
        var spid =  jim.movement.velocity.create;
        expect(spid(0, 2, 5).value()).toBe(10);
        expect(spid(10, 1, 10).value()).toBe(20);
        expect(spid(32, -2, 5).value()).toBe(22);
    });

    it("distance is ut+1/2at^2 ", function() {
        var spid =  jim.movement.distance.create;
        expect(spid(0, 2, 5).value()).toBe(25);
        expect(spid(2, 4, 10).value()).toBe(220);
        expect(spid(10, 1, 10).value()).toBe(150);
        expect(spid(30, -2, 5).value()).toBe(125);
    });

});