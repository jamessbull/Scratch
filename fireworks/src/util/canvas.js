jim.canvas = {
	create: function (element) {
		var context = element.getContext('2d');
		var r = function (shape) {
            context.fillStyle = '#FFFFFF';
            context.fillRect(shape.x, shape.y-200, 5, 5);
            context.fillRect(shape.x+shape.width, shape.y+shape.height, 5, 5);
        };
		return {
			draw: function (shape) {
                //var output = context.getImageData(shape.x, shape.y, shape.width, shape.height);
                var output = context.getImageData(0, 0, 500, 500);

				context.putImageData(output,0,0);
			},
            draw2: function (x,y,image) {
                context.drawImage(image,x,y);
            },
            onMouseDown: function (func) {
                element.addEventListener("mousedown", func, false);
            },
            onMouseUp: function (func) {
                element.addEventListener("mouseup", func, false);
            },
            arc: function (x, y, radius, start, end) {
                context.fillStyle = '#FFFFFF';
                context.strokeStyle = '#FFFFFF';
                context.beginPath();
                context.arc(x,y,radius,start,end, true);
                //context.fillRect(x, y, radius, radius);
                context.stroke();

            },
			drawRect: function(x,y,width,height) {
				context.fillStyle = '#000000';
				context.fillRect(x, y, width, height);
			},
            drawRect2: function (x, y, width, height, colour) {
                context.fillStyle = colour;
                context.fillRect(x, y, width, height);
            },
            clearShape: function ( shape ) {
                //this.drawRect2(shape.x, shape.y, shape.width, shape.height, '#000000');
                context.clearRect(shape.x,shape.y,shape.width, shape.height);
            },
            clearScreen: function (x,y,w,h) {
                context.clearRect(x,y,w,h)
            },
			context: function() {return context;}
		};
	}
};
         //prerender to offscreen canvas
//var m_canvas = document.createElement('canvas');
//m_canvas.width = 64;
//m_canvas.height = 64;
//var m_context = m_canvas.getContext(‘2d’);
//drawMario(m_context);
//
//function render() {
//    context.drawImage(m_canvas, 0, 0);
//    requestAnimationFrame(render);
//}
    // batch calls to canvas ie rather than draw stroke in a loop draw draw draw and stroke outside the loop
// track what has been drawn and only clear that
// so optimisation
// test current code
// change to use two canvases rather than copy every pixel individually
// clear drawn area with clear rect vs drawing a black rectangle
// current code does what? gets an array of data then copies it every time
// i get my array of data, draw to an appropriately sized canvas and then drawImage with that dude vs what I do right now.

