namespace("jim.display.renderer");
namespace("jim.display.renderable");

jim.display.renderer.create = function (element) {
    var running = true;
    var renderables = [];
    var lastTimeStamp = new Date().getTime();
    var context = element.getContext('2d');
    return {
        add: function (renderable) {
            renderables.push(renderable);
        },
        beginRenderLoop: function () {
            var render = function (timestamp) {
                if(running){
                    context.clearRect(0,0,500,500);
                    context.fillStyle = '#FFFFFF';

                    context.fillText(renderables.length +" objects",10,15);
                    context.fillText(1000 / (timestamp - lastTimeStamp) +" fps",10,25);
                    renderables.forEach(function (renderable) { renderable.update(timestamp - lastTimeStamp, context) });
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