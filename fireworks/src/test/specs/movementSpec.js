describe("Physics and movement: ", function() {

    it("should be able to calculate x speed", function () {
        var resolver = jim.movement.forceResolver2.create();
        var f = jim.movement.force.create({x:10, y:10, name : "force1" });

        resolver.addForce(f);
        var result = resolver.resolve( {xSpd : 5, ySpd : 5, duration: 12, mass : 2} );

        expect(result.xSpeed).toBe(65);
        expect(result.ySpeed).toBe(65);

        expect(result.travelledX).toBe(420);
        expect(result.travelledY).toBe(420);

    });

    it("the first location given should be the starting location", function() {
        var accel =  jim.movement.acceleration.create(0,0);
        var distance =  jim.movement.distance.create(0,0,0);
        var speed =  jim.movement.velocity.create(0,0,0);

        var subject = {
            mass:4,
            x:200,
            y:200,
            speed:0
        };
        var initialForce = {name:"initial", value: 60};
        var gravity = {name:"gravity", value: -10*subject.mass};

        spyOn(accel, 'value').andReturn(5);
        spyOn(accel, 'setF');
        spyOn(accel, 'setM');

        spyOn(speed, 'value').andReturn(10);
        spyOn(speed, 'setU');
        spyOn(speed, 'setA');
        spyOn(speed, 'setT');

        spyOn(distance, 'value').andReturn(15);
        spyOn(distance, 'setU');
        spyOn(distance, 'setA');
        spyOn(distance, 'setT');

        var forceResolver = jim.movement.forceResolver.create(accel, speed, distance);
        forceResolver.addForce(initialForce);
        forceResolver.addForce(gravity);
        forceResolver.applyForce(subject, 16);

        expect(subject.y).toBe(185);
        expect(subject.speed).toBe(10);

        expect(accel.setF).toHaveBeenCalledWith(20);
        expect(accel.setM).toHaveBeenCalledWith(4);

        expect(speed.value).toHaveBeenCalled();
        expect(speed.setU).toHaveBeenCalledWith(0);
        expect(speed.setA).toHaveBeenCalledWith(accel);
        expect(speed.setT).toHaveBeenCalledWith(16);

        expect(distance.value).toHaveBeenCalled();
        expect(distance.setU).toHaveBeenCalledWith(0);
        expect(distance.setA).toHaveBeenCalledWith(accel);
        expect(distance.setT).toHaveBeenCalledWith(16);

    });

    it("can add and remove forces", function() {
        var accel =  jim.movement.acceleration.create(0,0);
        var distance =  jim.movement.distance.create(0,0,0);
        var speed =  jim.movement.velocity.create(0,0,0);

        var initialForce = {name:"initial", value: 60};
        var gravity = {name:"gravity", value: -10*4};

        var forceResolver = jim.movement.forceResolver.create(accel, speed, distance);
        forceResolver.addForce(initialForce);
        forceResolver.addForce(gravity);

        expect(forceResolver.noOfForces()).toBe(2);

        forceResolver.removeForce(initialForce);
        expect(forceResolver.noOfForces()).toBe(1);

        forceResolver.removeForce(gravity);
        expect(forceResolver.noOfForces()).toBe(0);


    });

    it("acceleration is calculated from force and mass", function() {
        var accel = jim.movement.acceleration.create(4, 2);
        expect(accel.value()).toBe(2);

    });

    it("final velocity is initial velocity plus the product of acceleration and time", function() {
        var spid =  jim.movement.velocity.create;
        var accel = jim.movement.acceleration.create;

        expect(spid(0, accel(24, 2), 16).value()).toBe(192);
        expect(spid(10, accel(1, 1), 10).value()).toBe(20);
        expect(spid(32, accel(-2,1), 5).value()).toBe(22);
    });

    it("distance is ut+1/2at^2 ", function() {
        var distance =  jim.movement.distance.create;
        var accel = jim.movement.acceleration.create;
        expect(distance(0, accel(4, 2), 5).value()).toBe(25);
        expect(distance(2, accel(8, 2), 10).value()).toBe(220);
        expect(distance(10, accel(2, 2), 10).value()).toBe(150);
        expect(distance(30, accel(-4, 2), 5).value()).toBe(125);
    });

    it("should be possible to get vertical and horizontal components from the force", function() {
        var f1 = jim.movement.force.create({magnitude:30, direction:0});
        expect(f1.horizontal()).toBe(30);
        expect(f1.vertical()).toBe(0);

        var f2 = jim.movement.force.create({magnitude:30, direction:45});
        expect(f2.horizontal()).toBeGreaterThan(21.21);
        expect(f2.horizontal()).toBeLessThan(21.22);
        expect(f2.vertical()).toBeGreaterThan(21.21);
        expect(f2.vertical()).toBeLessThan(21.22);

        var f3 = jim.movement.force.create({magnitude:30, direction:90});
        expect(f3.horizontal()).toBe(0);
        expect(f3.vertical()).toBe(30);

        var f4 = jim.movement.force.create({magnitude:30, direction:135});
        expect(f4.horizontal()).toBeGreaterThan(-21.22);
        expect(f4.horizontal()).toBeLessThan(-21.21);
        expect(f4.horizontal()).toBeGreaterThan(-21.22);
        expect(f4.horizontal()).toBeLessThan(-21.21);


        var f5 = jim.movement.force.create({magnitude:30, direction:180});
        expect(f5.horizontal()).toBe(-30);
        expect(f5.vertical()).toBe(0);

        var f6 = jim.movement.force.create({magnitude:30, direction:270});
        expect(f6.horizontal()).toBe(0);
        expect(f6.vertical()).toBe(-30);

        var f7 = jim.movement.force.create({magnitude:30, direction:360});
        expect(f7.horizontal()).toBe(30);
        expect(f7.vertical()).toBe(0);

        var f8 = jim.movement.force.create({magnitude:30, direction:15});
        expect(f8.horizontal()).toBeGreaterThan(28.97);
        expect(f8.horizontal()).toBeLessThan(28.98);
        expect(f8.vertical()).toBeGreaterThan(7.76);
        expect(f8.vertical()).toBeLessThan(7.77);
    });
    it("Two opposite forces cancel each other out", function () {
        var f1 = jim.movement.force.create({magnitude:30, direction:0});
        var f2 = jim.movement.force.create({magnitude:30, direction:180});
        var f3 = f1.add(f2);

        expect(f1.horizontal()).toBe(30);
        expect(f1.vertical()).toBe(0);
        expect(f2.horizontal()).toBe(-30);
        expect(f2.vertical()).toBe(0);
        expect(f3.horizontal()).toBe(0);
        expect(f3.vertical()).toBe(0);
    });
    it("Two forces pulling same way double", function () {
        var f1 = jim.movement.force.create({magnitude:30, direction:0});
        var f2 = jim.movement.force.create({magnitude:30, direction:0});
        var f3 = f1.add(f2);

        expect(f1.horizontal()).toBe(30);
        expect(f1.vertical()).toBe(0);
        expect(f2.horizontal()).toBe(30);
        expect(f2.vertical()).toBe(0);
        expect(f3.horizontal()).toBe(60);
        expect(f3.vertical()).toBe(0);
    });
});
