namespace("jim.display.renderer");
namespace("jim.display.renderable");

jim.display.renderer.create = function (element, events) {
    "use strict";
    var running = true,
        renderables = [],
        lastTimeStamp = new Date().getTime(),
        context = element.getContext('2d');
    events.on("expired", function (e) {
        renderables = renderables.filter(function (r) { return r.id !== e.id; });
    });
    return {
        add: function (renderable) {
            renderables.push(renderable);
        },
        beginRenderLoop: function () {
            var render = function (timestamp) {
                var time = timestamp - lastTimeStamp,
                    newArr = [];
                if (running) {
                    context.clearRect(0, 0, 500, 500);
                    context.fillStyle = '#FFFFFF';

                    context.fillText(renderables.length + " objects", 10, 15);
                    context.fillText(1000 / (time) + " fps", 10, 25);

                    renderables.forEach(function (renderable) {
                        if (!renderable.dead) {
                            newArr.push(renderable);
                            renderable.update(time, context);
                        }
                    });
                    renderables = newArr;
                    events.fire("frame", {time: time});
                    lastTimeStamp = timestamp;
                    window.webkitRequestAnimationFrame(render, element);
                }
            };
            render(lastTimeStamp);
        },
        renderList: function () { return renderables; },
        endRenderLoop: function () { running = false; }
    };
};

jim.display.renderable.create = function () {
    "use strict";
    return {
        id: "default",
        x: 0,
        y: 0,
        width: 10,
        height: 10,
        update: function () {}
    };
};
namespace("jim.age");
jim.age.create = function (maxAge, f) {
    "use strict";
    var age = 0;
    return {
        increase: function (i) {
            age += i;
            if (age > maxAge) {
                f();
            }
        }
    };
};

jim.renderObject = jim.display.renderable.create;