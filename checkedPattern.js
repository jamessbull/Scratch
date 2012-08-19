jim.checkedPattern = function (element, rows, firstColour, secondColour) {
	var colourOne = firstColour, 
		colourTwo = secondColour, 
		tempColour,
		canvas = element.getContext('2d');

	var currentColour = function (row) { return row % 2 === 0 ? colourOne : colourTwo; };
	
	var swapColour = function() { 
		tempColour = colourOne;
		colourOne = colourTwo;
		colourTwo = tempColour;
	};
	var checkWidth = element.width / rows,
		startingPoints = jim.list.range(10, rows, checkWidth);
	var rectangles = [];
	
	$.each(startingPoints, function (i, startingPointX) {
		$.each(startingPoints, function (h, startingPointY) {
			rectangles.push(jim.rectangle.create(startingPointX, startingPointY, checkWidth, checkWidth, "#990999"));
		});
	});
	
	var draw = function () {
		$.each(rectangles, function (i, item) {
			item.colour = currentColour(i);
			item.draw(canvas);
		});
		swapColour();
		console.log("after draw" + colourOne)	
	};
	return { 
		draw : function () {
			draw();
			setInterval(draw, 1000); 
		} 
	};
}
