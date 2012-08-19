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
		};
	}
};

jim.point = {
	create: function (x,y) { return { x:x, y:y };}
};

jim.util = {
	lengthBetween: function ( p1, p2 ) {
		var bSquared = (p1.x - p2.x) * (p1.x - p2.x),
			cSquared = (p1.y - p2.y) * (p1.y - p2.y),
			aSquared = bSquared + cSquared;
		return Math.sqrt(aSquared);
	}
};

jim.circle = {
	create: function (diameter, canvas, colour) {
		var data = [],
			addPixel = function (data, colour) {
				data.push(colour.red);
				data.push(colour.green);
				data.push(colour.blue);
				data.push(colour.alpha);
				
			};
		var numberOfPixels = diameter * diameter;
		var centre = numberOfPixels / 2;
		
		var indexToPoint = function ( index, length ) {
			return index === 0 ? 0 : jim.point.create((index%length), Math.floor(index / length) )
		};
				
		var currentPixelsDistanceToCentre = function (index, length) {
			var point1 = indexToPoint(index, length),
				point2 = indexToPoint(centre, length);
				console.log(jim.util.lengthBetween(point1, point2))
			return jim.util.lengthBetween(point1, point2);
		};

		var dataElements = jim.list.range(0, numberOfPixels, 1);
		var black = jim.colour.create(0,0,0,0);
		$.each(dataElements, function (index) { 
			if(currentPixelsDistanceToCentre(index, diameter) > (diameter/2)) {
				addPixel(data, black)
			}
			else {
				addPixel(data, colour); 
			}
			
		});

		return {
			x:0,
			y:0,
			width: diameter,
			height: diameter,
			data: data,
			draw: function (x, y) {
				this.x=x;
				this.y=y;
				canvas.draw(this);
			}
		};
	}
};
