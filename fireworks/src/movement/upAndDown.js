namespace("jim.movement.forceResolver");
namespace("jim.movement.forceResolver2");
namespace("jim.movement.acceleration");
namespace("jim.movement.velocity");
namespace("jim.movement.distance");
namespace("jim.movement.force");
namespace("jim.math");



jim.movement.acceleration.create = function(force, mass) {
    var f = force;
    var m = mass;
    return {
        value: function () {
            return f / m;
        },
        setF: function(newForce) {
            f = newForce;
        },
        setM: function(newMass) {
            m = newMass;
        }
    }
};
jim.movement.velocity.create = function(initialSpeed, accel, time) {

    var u = initialSpeed;
    var a = accel;
    var t = time;
        return {
        value: function () {
            return u + a.value() * t;
        },
        setU: function(newSpeed) {
            u = newSpeed;
        },
        setA: function(newAcceleration) {
            a = newAcceleration;
        },
        setT: function(newTime) {
            t = newTime;
        }
    }
};
jim.movement.distance.create = function(initialSpeed, accel, time) {
    var u = initialSpeed;
    var a = accel;
    var t = time;

    return {
        value: function () {
            return (u * t) + (a.value()/2)*t*t;
        },
        setU: function(newSpeed) {
            u = newSpeed;
        },
        setA: function(newAcceleration) {
            a = newAcceleration;
        },
        setT: function(newTime) {
            t = newTime;
        }
    }
};

jim.math.round = function (num, dp) {
    var tmp = 1;
    for(var i = 0 ; i < dp ; i++) {
        tmp*=10;
    }
    return Math.round(num*tmp)/tmp;
};

jim.movement.force.create = function (options) {
    var round = jim.math.round;
    var horizComponent = 0;
    var vertComponent = 0;


    if(options.magnitude == undefined) {
        horizComponent = options.x;
        vertComponent = options.y;
    } else {
        var radians = options.direction * Math.PI/180;
        horizComponent = round(options.magnitude * Math.cos(radians), 8);
        vertComponent = round(options.magnitude * Math.sin(radians),8);
    }

    return {
        horizontal: function () { return horizComponent; },
        vertical: function () { return vertComponent; },
        name: function () { return options.name; },
        add: function (f) {
            return jim.movement.force.create({x:this.horizontal() + f.horizontal(), y:this.vertical() + f.vertical()});
        }
    };
};

jim.movement.forceResolver2.create = function () {
    var forces = {};
    var totalForce = function () {
        var finalForce = jim.movement.force.create({x:0, y:0});

        for (k in forces) {
            if (Object.prototype.hasOwnProperty.call(forces, k)) {
                finalForce = finalForce.add(forces[k]);
            }
        }
        return finalForce;
    };

    return {
        addForce: function (f) {
            forces[f.name()] = f;
        },
        removeForce: function (f) {
            delete forces[f.name()];
        },
        resolve: function (subject) {
            var ax = jim.movement.acceleration.create(0,0);
            var ay = jim.movement.acceleration.create(0,0);
            var vx = jim.movement.velocity.create(0,0);
            var vy = jim.movement.velocity.create(0,0);
            var sx = jim.movement.distance.create(0,0);
            var sy = jim.movement.distance.create(0,0);

            ax.setF(totalForce().horizontal());
            ax.setM(subject.mass);

            ay.setF(totalForce().vertical());
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
                travelledX:sx.value(),
                travelledY:sy.value()
            }
        },
        noOfForces : function () {
            return Object.keys(forces).length;
        }
    }
};

jim.movement.forceResolver.create = function (accelerationCalculator, velocityCalculator, distanceCalculator) {
    var forces = {};
    var totalForce = function () {
        var total = 0;

        for (k in forces) {
            if (Object.prototype.hasOwnProperty.call(forces, k)) {
                total += forces[k];
            }
        }
        return total;
    };
    return {
        addForce: function (force) {
            forces[force.name] = force.value;
        },
        removeForce: function (force) {
            delete forces[force.name];
        },
        applyForce: function (subject, time) {
            accelerationCalculator.setF(totalForce());
            accelerationCalculator.setM(subject.mass);

            distanceCalculator.setU(subject.speed);
            distanceCalculator.setA(accelerationCalculator);
            distanceCalculator.setT(time);
            subject.y -= distanceCalculator.value();
            velocityCalculator.setU(subject.speed);
            velocityCalculator.setA(accelerationCalculator);
            velocityCalculator.setT(time);
            subject.speed = velocityCalculator.value()
        },
        noOfForces : function () {
            return Object.keys(forces).length;
        }

    };
};