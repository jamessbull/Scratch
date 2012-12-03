jim.canvas = {
	create: function (element) {
		var context = element.getContext('2d');
		
		return {
			draw: function (shape) {
				var output = context.createImageData(shape.width, shape.height);
				$.each(shape.data, function (i, item) {output.data[i] = item });
				context.putImageData(output,shape.x,shape.y);
			},
			drawRect: function(x,y,width,height) {
				context.fillStyle = '#000000';
				context.fillRect(x, y, width, height);
			},
			context: function() {return context;}
		};
	}
};



