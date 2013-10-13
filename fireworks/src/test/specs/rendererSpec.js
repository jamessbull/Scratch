describe("The renderer", function () {

    "use strict";
    it("should call update on objects added to it ", function () {
        var renderer = jim.display.renderer.create(document.createElement('canvas')),
            renderable = Object.create(jim.renderObject()),
            renderable2 = Object.create(jim.renderObject());

        spyOn(renderable, 'update');
        spyOn(renderable2, 'update');

        renderer.add(renderable);
        renderer.add(renderable2);
        renderer.beginRenderLoop();

        expect(renderable.update).toHaveBeenCalled();
        expect(renderable2.update).toHaveBeenCalled();

        renderer.endRenderLoop();
    });

    var times = function (times, f) {
        var curr = times;
        while (curr > 0) {
            f();
            curr -= 1;
        }
    },
        time = function (f) {
            var start = new Date().getTime();
            f();
            return new Date().getTime() - start;
        },
        context = function (size) {
            var canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            return canvas.getContext('2d');
        },
        getPutIterate = function (size) {
            var ctx = context(size);
            return function () {
                var data = ctx.getImageData(0, 0, size, size),
                    len = data.length;
                while (len > 0) {
                    data[len] = 1;
                    len -= 1;
                }
                ctx.putImageData(data, 0, 0);
            };
        },
        perf_test = function (iterations, fn) {
            var test = function () {
                times(iterations, fn);
            },
                tot = time(test);
            return tot / iterations;
        };

    it("Get put iterate for size 200:  time per drawOp: " + perf_test(20, getPutIterate(200)) + "ms", function () {});
    it("Get put iterate for size 400:  time per drawOp: " + perf_test(20, getPutIterate(400)) + "ms", function () {});
    it("Get put iterate for size 600:  time per drawOp: " + perf_test(20, getPutIterate(600)) + "ms", function () {});
    it("Get put iterate for size 800:  time per drawOp: " + perf_test(10, getPutIterate(800)) + "ms", function () {});
    it("Get put iterate for size 1000:  time per drawOp: " + perf_test(10, getPutIterate(1000)) + "ms", function () {});

});
