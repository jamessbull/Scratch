var jim = {};
jim.rectangle = {
	create: function (x, y, width, height, colour) {
		var theColour = colour;
		return {
			x: x,
			y: y,
			width: width,
			height:height,
			colour: theColour,
			draw: function (canvas) {
				canvas.fillStyle = this.colour;
				canvas.fillRect(x, y, width, height);
			}
		}
	}
}

