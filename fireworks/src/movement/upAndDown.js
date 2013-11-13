namespace("jim.movement.forceResolver");
namespace("jim.movement.forceResolver2");
namespace("jim.movement.acceleration");
namespace("jim.movement.velocity");
namespace("jim.movement.distance");
namespace("jim.movement.force");
namespace("jim.math");



jim.movement.acceleration.create = function (force, mass) {
    "use strict";
    var f = force,
        m = mass;
    return {
        value: function () {
            return f / m;
        },
        setF: function (newForce) {
            f = newForce;
        },
        setM: function (newMass) {
            m = newMass;
        }
    };
};
jim.movement.velocity.create = function (initialSpeed, acceleration, time) {
    "use strict";
    var u = initialSpeed,
        a = acceleration,
        t = time;
    return {
        value: function () {
            return u + a.value() * t;
        },
        setU: function (newSpeed) {
            u = newSpeed;
        },
        setA: function (newAcceleration) {
            a = newAcceleration;
        },
        setT: function (newTime) {
            t = newTime;
        }
    };
};
jim.movement.distance.create = function (initialSpeed, acceleration, time) {
    "use strict";
    var u = initialSpeed,
        a = acceleration,
        t = time;

    return {
        value: function () {
            return (u * t) + (a.value() / 2) * t * t;
        },
        setU: function (newSpeed) {
            u = newSpeed;
        },
        setA: function (newAcceleration) {
            a = newAcceleration;
        },
        setT: function (newTime) {
            t = newTime;
        }
    };
};

jim.math.round = function (num, dp) {
    "use strict";
    var tmp = 1,
        i;
    for (i = 0; i < dp; i += 1) {
        tmp *= 10;
    }
    return Math.round(num * tmp) / tmp;
};

jim.movement.force.create = function (options) {
    "use strict";
    var round = jim.math.round,
        horizontalComponent = 0,
        verticalComponent = 0,
        radians;


    if (options.magnitude === undefined) {
        horizontalComponent = options.x;
        verticalComponent = options.y;
    } else {
        radians = options.direction * Math.PI / 180;
        horizontalComponent = round(options.magnitude * Math.cos(radians), 8);
        verticalComponent = round(options.magnitude * Math.sin(radians), 8);
    }

    var force = {
        dead: false,
        horizontal: function () { return horizontalComponent; },
        vertical: function () { return verticalComponent; },
        name: function () { return options.name; },
        add: function (f) {
            return jim.movement.force.create({x: this.horizontal() + f.horizontal(), y: this.vertical() + f.vertical()});
        }
    };
    force.eventId = id;
    return force;
};

jim.movement.forceResolver2.create = function () {
    "use strict";
    var forces = [],
        totalForce = function () {
            var finalForce = jim.movement.force.create({x: 0, y: 0}),
                newArr = [];

            forces.forEach(function (f) {
                if (!f.dead) {
                    newArr.push(f);
                    finalForce = finalForce.add(f);
                }
            });
            forces = newArr;
            return finalForce;
        };


    return {
        addForce: function (f) {
            forces.push(f);
        },
        resolve: function (subject) {
            var ax = jim.movement.acceleration.create(0, 0),
                ay = jim.movement.acceleration.create(0, 0),
                vx = jim.movement.velocity.create(0, 0),
                vy = jim.movement.velocity.create(0, 0),
                sx = jim.movement.distance.create(0, 0),
                sy = jim.movement.distance.create(0, 0),
                total = totalForce();

            ax.setF(total.horizontal());
            ax.setM(subject.mass);

            ay.setF(total.vertical());
            ay.setM(subject.mass);

            sx.setU(subject.xSpd);
            sx.setA(ax);
            sx.setT(subject.duration);

            sy.setU(subject.ySpd);
            sy.setA(ay);
            sy.setT(subject.duration);

            vx.setU(subject.xSpd);
            vx.setA(ax);
            vx.setT(subject.duration);

            vy.setU(subject.ySpd);
            vy.setA(ay);
            vy.setT(subject.duration);

            return {
                xSpeed: vx.value(),
                ySpeed: vy.value(),
                travelledX: sx.value(),
                travelledY: sy.value()
            };
        },
        noOfForces : function () {
            return forces.length;
        }
    };
};
