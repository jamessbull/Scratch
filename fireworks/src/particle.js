namespace("jim.particle.particleFactory");

jim.particle.particleFactory.create = function (resolverFactory, timedEventFactory, circleFactory, forceFactory, events, gravity, renderer) {
    "use strict";

    return {
        particle: function (id, size, colour, xPosition, yPosition, initialForce, direction, initialForceDuration, lifeSpan, initialySpeed) {
            var myResolver = resolverFactory.create(),
                //timedEvent = timedEventFactory.createTimedEvent(events, "expired", lifeSpan),
                circle = circleFactory.create(size, colour, myResolver),
                force = forceFactory.create({magnitude: initialForce, direction : direction, name: id});
            events.delay(function () { force.dead = true; }, initialForceDuration, "delay for force death");
            events.delay(function () { circle.dead = true; }, lifeSpan, "delay for circle death");
            circle.x = xPosition;
            circle.y = yPosition;
            circle.id = id;
            circle.xSpeed = 0;
            circle.ySpeed = initialySpeed;
            renderer.add(circle);
            myResolver.addForce(force);
            myResolver.addForce(gravity);
            return circle;
        }
    };
};
//so so far I have three lists of things where i am pruning dead stuff with the same code