describe("The renderer", function () {

    "use strict";
    it("should call update on objects added to it ", function () {
        var renderer = jim.display.renderer.create(document.createElement('canvas'), jim.events.create()),
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
    it("should respond to expired events and remove elements with matching ids from the render list", function () {
        var events = jim.events.create(),
            renderer,
            r1 = jim.renderObject(),
            r2 = jim.renderObject();
        renderer = jim.display.renderer.create(document.createElement('canvas'), events);
        r1.id = 1;
        r2.id = 2;
        renderer.add(r1);
        renderer.add(r2);

        expect(renderer.renderList().length).toBe(2);
        events.fire("expired", { id: 1 });
        expect(renderer.renderList().length).toBe(1);
        expect(renderer.renderList()[0].id).toBe(2);
    });
    it("should execute the supplied function when the age exceeds max age", function () {
        var result = false,
            age = jim.age.create(1000, function () { result = true; });

        age.increase(500);
        expect(result).toBe(false);

        age.increase(500);
        expect(result).toBe(false);

        age.increase(1);
        expect(result).toBe(true);
    });

    it("should fire the specified event at the appropriate time", function () {
        var result = false,
            source = "none",
            events = jim.events.create(),
            timedEvent = jim.events.createTimedEvent(events, "foo", 499);
        events.on("foo", function (arg) {
            result = true;
            source = arg.foo;
        });
        timedEvent.update(500, {foo: "set"});
        expect(source).toBe("set");
        expect(result).toBe(true);
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
