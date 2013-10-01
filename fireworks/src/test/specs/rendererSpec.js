describe("The renderer", function() {

    // I wan to start rocking the prototypes and have a thing that has a prototype renderable
    it("should call update on objects added to it ", function() {
        var renderer = jim.display.renderer.create(document.createElement('canvas'));
        var renderable = Object.create(jim.renderObject());
        var renderable2 = Object.create(jim.renderObject());

        spyOn(renderable, 'update');
        spyOn(renderable2, 'update');

        renderer.add(renderable);
        renderer.add(renderable2);

        renderer.beginRenderLoop();

        expect(renderable.update).toHaveBeenCalled();
        expect(renderable2.update).toHaveBeenCalled();

        renderer.endRenderLoop();
    });

    var time_old = function (c,f,iterations) {
        var start = new Date().getTime();
        f(c, iterations);
        return new Date().getTime() - start;
    };
    var greenCircle = function () {
        var canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        var mycanvas = jim.canvas.create(canvas);
        var green = jim.colour.create(0, 255, 0, 255);
        return greenCircle = jim.circle.create(50, mycanvas, green, null);
    }();

    var currentIterations = 100;

    var totalOldDraw = time_old(greenCircle, function (circle, iterations) {
        for(var i = 0; i < iterations; i++) {
            circle.draw(100,100);
        }
    }, currentIterations);

    var totalNewDraw = time_old(greenCircle, function (circle, iterations) {
        for(var i = 0; i < iterations; i++) {
            circle.draw2(100,100);
        }
    }, currentIterations);

    var times = function (times, f) {
        var curr = times;
        while(curr > 0) {
            f();
            curr--;
        }
    };



    var old = totalOldDraw / currentIterations;
    var new_draw = totalNewDraw / currentIterations;


    var time = function (f) {
        var start = new Date().getTime();
        f();
        return new Date().getTime() - start;
    };

    var context = function (size) {
        var canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        return canvas.getContext('2d');
    };

    var getOnly = function(size) {
        var ctx = context(size);
        return function() {
            ctx.getImageData(0,0,size, size);
        };
    };

    var getPutOnly = function(size) {
        var ctx = context(size);
        return function() {
            var data = ctx.getImageData(0,0,size, size);
            ctx.putImageData(data,0,0)
        };
    };

    var getPutIterate = function(size) {
        var ctx = context(size);
        return function() {
            var data = ctx.getImageData(0,0,size, size);
            var len = data.length;
            while(len > 0) {
                data[len] =1;
                len--;
            }
            ctx.putImageData(data,0,0)
        };
    };

    var getPutIterateAllInBatches = function(size, batchSize) {
        var ctx = context(size);
        var count = 0;

        var batch = function(x,y,w,h) {
            console.log("batch number "+ count++);
            var data = ctx.getImageData(x,y,w,h);
            var len = data.length;
            while(len > 0) {
                data[len] =125;
                len--;
            }
            ctx.putImageData(data,x,y)
        };
        var doRow = function (currY) {
            var currX = 0;
            while(currX < size) {
               batch(currX, currY, batchSize, batchSize);
               currX+=batchSize;
            }
        };
        return function () {
            var currY = 0;
            while (currY <size) {
                doRow(currY);
                currY+=batchSize;
            }
        };
    };
    var perf_test = function (iterations, fn) {
        var test = function() {
            times(iterations, fn);
        };
        var tot = time(test);
        return tot / iterations;
    };

    it("Drawing performance individual pixels 100,000 circles drawn in : " + totalOldDraw + "ms, average time per drawOp: " + old + "ms", function () {});
    it("Drawing performance drawing a canvas 100,000 circles drawn2 in : " + totalNewDraw + "ms, average time per drawOp: " + new_draw + "ms", function () {});
    it("Get ImageData for size 200:  time per drawOp: " + perf_test(20, getOnly(200)) + "ms", function () {});
    it("Get ImageData for size 400:  time per drawOp: " + perf_test(20, getOnly(400)) + "ms", function () {});
    it("Get ImageData for size 600:  time per drawOp: " + perf_test(20, getOnly(600)) + "ms", function () {});
    it("Get ImageData for size 800:  time per drawOp: " + perf_test(10, getOnly(800)) + "ms", function () {});
    it("Get ImageData for size 1000:  time per drawOp: " + perf_test(10, getOnly(1000)) + "ms", function () {});

    it("Get and put ImageData for size 200:  time per drawOp: " + perf_test(20, getPutOnly(200)) + "ms", function () {});
    it("Get and put ImageData for size 400:  time per drawOp: " + perf_test(20, getPutOnly(400)) + "ms", function () {});
    it("Get and put ImageData for size 600:  time per drawOp: " + perf_test(20, getPutOnly(600)) + "ms", function () {});
    it("Get and put ImageData for size 800:  time per drawOp: " + perf_test(10, getPutOnly(800)) + "ms", function () {});
    it("Get and put ImageData for size 1000:  time per drawOp: " + perf_test(10, getPutOnly(1000)) + "ms", function () {});

    it("Get put iterate for size 200:  time per drawOp: " + perf_test(20, getPutIterate(200)) + "ms", function () {});
    it("Get put iterate for size 400:  time per drawOp: " + perf_test(20, getPutIterate(400)) + "ms", function () {});
    it("Get put iterate for size 600:  time per drawOp: " + perf_test(20, getPutIterate(600)) + "ms", function () {});
    it("Get put iterate for size 800:  time per drawOp: " + perf_test(10, getPutIterate(800)) + "ms", function () {});
    it("Get put iterate for size 1000:  time per drawOp: " + perf_test(10, getPutIterate(1000)) + "ms", function () {});

    //it("Get put iterate batches for size 1000 batch 100:  time per drawOp: " + perf_test(10, getPutIterateAllInBatches(1000,100)) + "ms", function () {});
    //it("Get put iterate batches for size 1000 batch 200:  time per drawOp: " + perf_test(10, getPutIterateAllInBatches(1000,200)) + "ms", function () {});
    it("Get put iterate batches for size 1000 batch 500:  time per drawOp: " + perf_test(1, getPutIterateAllInBatches(1000,500)) + "ms", function () {});
    // conclusion is it is too slow to rewrite every pixel for canvas sizes above   800 by 800
});
