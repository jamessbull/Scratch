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
jim.checkedPattern = function (rows, firstColour, secondColour) {

	var canvas, element, currentX;
	element = $('#mainCanvas')[0]
	canvas = element.getContext('2d');

	
	var currentColour = function (row) {
		return row % 2 === 0 ? firstColour : secondColour
	}
		
	var draw = function () {
		var checkWidth = element.width / rows,
			startingPoints = jim.list.range(0, rows, checkWidth);
		
		$.each(startingPoints, function (i, startingPoint) {
			jim.rectangle.create(startingPoint, 0, checkWidth, 100, currentColour(i)).draw(canvas);
		});	
	}
	
	return {
		draw : draw
	}

}