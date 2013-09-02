namespace("jim.movement.upAndDown");

jim.movement.upAndDown.create = function (x,y) {
    return {
        nextPosition: function () {return jim.point.create(x,y)}
    };
}