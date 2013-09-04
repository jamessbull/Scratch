namespace("jim.movement.upAndDown");
namespace("jim.movement.acceleration");
namespace("jim.movement.velocity");
namespace("jim.movement.distance");

jim.movement.upAndDown.create = function (point) {
    return {
        nextPosition: function () {return point}
    };
}

jim.movement.acceleration.create = function(force, mass) {
    return {
        value: function () {
            return force / mass;
        }
    }
};
jim.movement.velocity.create = function(u, a, t) {
    return {
        value: function () {
            return u + a*t;
        }
    }
};
jim.movement.distance.create = function(u, a, t) {
    return {
        value: function () {
            return (u * t) + (a/2)*t*t;
        }
    }
};