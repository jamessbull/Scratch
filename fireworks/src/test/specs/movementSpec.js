describe("Physics and movement: ", function () {
    "use strict";
    it("should be able to calculate x speed", function () {
        var events = jim.events.create(),
            age = jim.age.create(100000, events, "test", "test"),
            resolver = jim.movement.forceResolver2.create(events),
            f = jim.movement.force.create({x: 10, y: 10, name : "force1", age: age }),
            result;
        resolver.addForce(f);
        result = resolver.resolve({xSpd: 5, ySpd: 5, duration: 12, mass : 2});
        expect(result.xSpeed).toBe(65);
        expect(result.ySpeed).toBe(65);

        expect(result.travelledX).toBe(420);
        expect(result.travelledY).toBe(420);

    });

    it("can add and remove forces", function () {
        var events = jim.events.create(),
            age = jim.age.create(100000, events, "test", "test"),
            initialForce = jim.movement.force.create({x: 10, y: 10, name : "initial", age: age }),
            gravity = jim.movement.force.create({x: 10, y: 10, name : "gravity", age: age }),
            forceResolver = jim.movement.forceResolver2.create(events);

        forceResolver.addForce(initialForce);
        forceResolver.addForce(gravity);
        expect(forceResolver.noOfForces()).toBe(2);

        forceResolver.removeForce(initialForce);
        expect(forceResolver.noOfForces()).toBe(1);

        forceResolver.removeForce(gravity);
        expect(forceResolver.noOfForces()).toBe(0);
    });

    it("acceleration is calculated from force and mass", function () {
        var a = jim.movement.acceleration.create(4, 2);
        expect(a.value()).toBe(2);

    });

    it("final velocity is initial velocity plus the product of acceleration and time", function () {
        var speed =  jim.movement.velocity.create,
            a = jim.movement.acceleration.create;

        expect(speed(0, a(24, 2), 16).value()).toBe(192);
        expect(speed(10, a(1, 1), 10).value()).toBe(20);
        expect(speed(32, a(-2, 1), 5).value()).toBe(22);
    });

    it("distance is ut+1/2at^2 ", function () {
        var distance =  jim.movement.distance.create,
            a = jim.movement.acceleration.create;

        expect(distance(0, a(4, 2), 5).value()).toBe(25);
        expect(distance(2, a(8, 2), 10).value()).toBe(220);
        expect(distance(10, a(2, 2), 10).value()).toBe(150);
        expect(distance(30, a(-4, 2), 5).value()).toBe(125);
    });

    it("should be possible to get vertical and horizontal components from the force", function () {
        var f1 = jim.movement.force.create({magnitude: 30, direction: 0}),
            f2 = jim.movement.force.create({magnitude: 30, direction: 45}),
            f3 = jim.movement.force.create({magnitude: 30, direction: 90}),
            f4 = jim.movement.force.create({magnitude: 30, direction: 135}),
            f5 = jim.movement.force.create({magnitude: 30, direction: 180}),
            f6 = jim.movement.force.create({magnitude: 30, direction: 270}),
            f7 = jim.movement.force.create({magnitude: 30, direction: 360}),
            f8 = jim.movement.force.create({magnitude: 30, direction: 15});

        expect(f1.horizontal()).toBe(30);
        expect(f1.vertical()).toBe(0);

        expect(f2.horizontal()).toBeGreaterThan(21.21);
        expect(f2.horizontal()).toBeLessThan(21.22);
        expect(f2.vertical()).toBeGreaterThan(21.21);
        expect(f2.vertical()).toBeLessThan(21.22);

        expect(f3.horizontal()).toBe(0);
        expect(f3.vertical()).toBe(30);

        expect(f4.horizontal()).toBeGreaterThan(-21.22);
        expect(f4.horizontal()).toBeLessThan(-21.21);
        expect(f4.horizontal()).toBeGreaterThan(-21.22);
        expect(f4.horizontal()).toBeLessThan(-21.21);

        expect(f5.horizontal()).toBe(-30);
        expect(f5.vertical()).toBe(0);

        expect(f6.horizontal()).toBe(0);
        expect(f6.vertical()).toBe(-30);

        expect(f7.horizontal()).toBe(30);
        expect(f7.vertical()).toBe(0);

        expect(f8.horizontal()).toBeGreaterThan(28.97);
        expect(f8.horizontal()).toBeLessThan(28.98);
        expect(f8.vertical()).toBeGreaterThan(7.76);
        expect(f8.vertical()).toBeLessThan(7.77);
    });
    it("Two opposite forces cancel each other out", function () {
        var f1 = jim.movement.force.create({magnitude: 30, direction: 0}),
            f2 = jim.movement.force.create({magnitude: 30, direction: 180}),
            f3 = f1.add(f2);

        expect(f1.horizontal()).toBe(30);
        expect(f1.vertical()).toBe(0);
        expect(f2.horizontal()).toBe(-30);
        expect(f2.vertical()).toBe(0);
        expect(f3.horizontal()).toBe(0);
        expect(f3.vertical()).toBe(0);
    });
    it("Two forces pulling same way double", function () {
        var f1 = jim.movement.force.create({magnitude: 30, direction: 0}),
            f2 = jim.movement.force.create({magnitude: 30, direction: 0}),
            f3 = f1.add(f2);

        expect(f1.horizontal()).toBe(30);
        expect(f1.vertical()).toBe(0);
        expect(f2.horizontal()).toBe(30);
        expect(f2.vertical()).toBe(0);
        expect(f3.horizontal()).toBe(60);
        expect(f3.vertical()).toBe(0);
    });
});
