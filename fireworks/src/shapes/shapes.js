namespace("jim");
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
	create: function (diameter, colour, forceResolver) {
        var x = 0;
        var y = 0;

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

		var fullGradient = jim.gradient.create(0,diameter/2);

        var initDisplay = function () {
            var m_canvas = document.createElement('canvas');
            m_canvas.width = diameter;
            m_canvas.height = diameter;
            var m_context = m_canvas.getContext('2d');
            var output = m_context.createImageData(diameter, diameter);
            for (var i = 0 ; i < numberOfPixels; i++) {
                var distanceFromCentre = currentPixelsDistanceToCentre(i, diameter);
                var distAsPercent = fullGradient.at(distanceFromCentre);
                colour.setColourPercent("alpha", 100-distAsPercent);
                output.data[i*4] = colour.red;
                output.data[i*4+1] = colour.green;
                output.data[i*4+2] = colour.blue;
                output.data[i*4+3] = colour.alpha;
            }
            m_context.putImageData(output, x, y);
            return m_canvas;
        };
        var display = initDisplay();

        var update = function(time, context) {
          forceResolver.applyForce(this, time);
          if(this.y>450) {
              this.y = 450;
              if(this.speed > 0.1) {
                  this.speed = 0;
              } else {
                  this.speed = (0-this.speed)- 0.05;
              }
          }
          context.drawImage(display,this.x,this.y);
        };


		return {
			x:x,
			y:y,
			width: diameter,
			height: diameter,
            mass: 4,
            speed:0,
            update: update
		};
	}
};