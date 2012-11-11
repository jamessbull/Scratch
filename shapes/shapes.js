var jim = {};
jim.rectangle = {
	create: function (x, y, width, height) {
		return {
			draw: function (canvas) { canvas.drawRect(x,y,width,height) }
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
		var centre = function () {
			return (Math.floor(diameter/2) * diameter) + Math.floor(diameter / 2)
		};
		
		
		var indexToPoint = function ( index, length ) {
			return index === jim.point.create(0,0) ? 0 : jim.point.create((index%length), Math.floor(index / length) )
		};
				
		var currentPixelsDistanceToCentre = function (index, length) {
			var point1 = indexToPoint(index, length),
				point2 = indexToPoint(centre(), length);
			return jim.util.lengthBetween(point1, point2);
		};

		var dataElements = jim.list.range(0, numberOfPixels, 1);
		var black = jim.colour.create(0,0,0,255);
		var fullGradient = jim.gradient.create(0,diameter/2);

		var whitePercent=0;
		$.each(dataElements, function (index) {
			var distanceFromCentre = currentPixelsDistanceToCentre(index, diameter);
			var distAsPercent = fullGradient.at(distanceFromCentre);

			colour.setColourPercent("red", 100 - distAsPercent); 
			colour.setColourPercent("green", 0);
			colour.setColourPercent("blue", 0);
			colour.setColourPercent("alpha", 100);

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
