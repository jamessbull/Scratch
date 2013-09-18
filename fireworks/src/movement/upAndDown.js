namespace("jim.movement.forceResolver");
namespace("jim.movement.acceleration");
namespace("jim.movement.velocity");
namespace("jim.movement.distance");



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
        nextPosition: function () {return point},
        addForce: function (force) {
            forces[force.name] = force.value;
        },
        removeForce: function (force) {
            delete forces[force.name];
        },
        applyForce: function (subject, time) {
            accelerationCalculator.setF(totalForce());
            accelerationCalculator.setM(subject.mass);

            distanceCalculator.setU(subject.speed)
            distanceCalculator.setA(accelerationCalculator)
            distanceCalculator.setT(time);
            subject.y -= distanceCalculator.value();
            velocityCalculator.setU(subject.speed);
            velocityCalculator.setA(accelerationCalculator);
            velocityCalculator.setT(time);
            subject.speed = velocityCalculator.value()
        },
        noOfForces : function () {
            return Object.keys(forces).length
        }

    };
}