jim.canvas = {
	create: function (element) {
		var context = element.getContext('2d');
		
		return {
			draw: function (shape) {
				var output = context.createImageData(shape.width, shape.height);
				$.each(shape.data, function (i, item) {output.data[i] = item });
				context.putImageData(output,shape.x,shape.y);
				console.log("shape x is "+shape.x + ": shape y is" + shape.y);
				console.log("shape width is "+shape.width + ": shape height is" + shape.height);
			}
		};
	}
};



