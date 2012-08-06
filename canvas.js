var jim = {};
jim.rectangle = {
	create: function (x, y, width, height, colour) {
		return {
			x: x,
			y: y,
			width: width,
			height:height,
			colour: colour,
			draw: function (canvas) {
				canvas.fillStyle = colour;
				canvas.fillRect(x, y, width, height);
			}
		}
	}
}
jim.list = {
	range: function (start, length, increment) {
		var nums = []
		for(var i = 0 ; i < length ; i++) {
			nums.push(start+ (i*increment));
		}
		return nums;
	}
}
