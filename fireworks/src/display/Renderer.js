namespace("jim.display.renderer");
namespace("jim.display.renderable");

jim.display.renderer.create = function (element) {
    var running = true;
    var renderables = [];
    var lastTimeStamp = new Date().getTime();
    return {
        add: function (renderable) {
            renderables.push(renderable);
        },
        beginRenderLoop: function () {
            var render = function (timestamp) {
                if(running){
                    renderables.forEach(function (renderable) { renderable.update(timestamp - lastTimeStamp) });
                    lastTimeStamp = timestamp;
                    window.webkitRequestAnimationFrame(render, element);
                }
            };
            render(lastTimeStamp);
        },
        endRenderLoop: function () { running = false; }
    }
}
jim.display.renderable.create = function () {
    return {
        x:0,
        y:0,
        width:10,
        height:10,
        update: function () {}
    };
}
jim.renderObject = jim.display.renderable.create;