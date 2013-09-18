jim.canvas = {
	create: function (element) {
		var context = element.getContext('2d');
		
		return {
			draw: function (shape) {
				var output = context.createImageData(shape.width, shape.height);
				$.each(shape.data, function (i, item) {output.data[i] = item });
				context.putImageData(output,shape.x,shape.y);
			},
            onMouseDown: function (func) {
                element.addEventListener("mousedown", func, false);
            },
            onMouseUp: function (func) {
                element.addEventListener("mouseup", func, false);
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
                this.drawRect2(shape.x, shape.y, shape.width, shape.height, '#000000');
            },
			context: function() {return context;}
		};
	}
};



