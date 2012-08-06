jim.checkedPattern = function (rows, firstColour, secondColour) {
	var colourOne = firstColour, 
		colourTwo = secondColour, 
		tempColour,
		element = $('#mainCanvas')[0],
		currentX,
		canvas = element.getContext('2d');

	var currentColour = function (row) { return row % 2 === 0 ? colourOne : colourTwo; };
	
	var swapColour = function() { 
		tempColour = colourOne;
		colourOne = colourTwo;
		colourTwo = tempColour;
	};
	
	var draw = function () {
		var checkWidth = element.width / rows,
			startingPoints = jim.list.range(10, rows, checkWidth);
					
		$.each(startingPoints, function (i, startingPointX) {
			$.each(startingPoints, function (h, startingPointY) {
				jim.rectangle.create(startingPointX, startingPointY, checkWidth, checkWidth, currentColour(i+h)).draw(canvas);
			});
		});
		swapColour();
	};
	return { draw : function () { setInterval(draw, 100); } };
}