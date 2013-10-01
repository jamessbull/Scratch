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
	create: function (diameter, canvas, colour, forceResolver) {
		var data = [];
        var x = 0;
        var y = 0;
		var	addPixel = function (data, colour) {
				data.push(colour.red);
				data.push(colour.green);
				data.push(colour.blue);
				data.push(colour.alpha);
				
		};

		var numberOfPixels = diameter * diameter;

		var centre = function () {
			return (Math.floor(diameter/2) * diameter) + Math.floor(diameter / 2)
		};

        var clear = function () {
            canvas.clearShape(this);
        }

		var indexToPoint = function ( index, length ) {
			return index === jim.point.create(0,0) ? 0 : jim.point.create((index%length), Math.floor(index / length) )
		};
				
		var currentPixelsDistanceToCentre = function (index, length) {
			var point1 = indexToPoint(index, length),
				point2 = indexToPoint(centre(), length);
			return jim.util.lengthBetween(point1, point2);
		};

		var fullGradient = jim.gradient.create(0,diameter/2);

        for(var index = 0 ; index < numberOfPixels; index++) {
            var distanceFromCentre = currentPixelsDistanceToCentre(index, diameter);
            var distAsPercent = fullGradient.at(distanceFromCentre);
            colour.setColourPercent("alpha", 100-distAsPercent);
            addPixel(data, colour);
        }

        var initDisplay = function () {
            var m_canvas = document.createElement('canvas');
            m_canvas.width = diameter;
            m_canvas.height = diameter;
            var m_context = m_canvas.getContext('2d');
            var output = m_context.createImageData(diameter, diameter);
            var tcount = 0;
            for (var i = 0 ; i < data.length; i+=4) {
                output.data[i] = data[i];
                output.data[i+1] = data[i+1];
                output.data[i+2] = data[i+2];
                output.data[i+3] = data[i+3];
                if(output.data[i+3] === 0) {
                    tcount++;
                }
            }
            console.log("number of pixels which are transparent = "+ tcount);
            m_context.putImageData(output, x, y);
            return m_canvas;
        };
        var display = initDisplay();
        var setPosition = function (x,y) {
            canvas.clearShape(this);
            this.x = x;
            this.y = y;
        };

        var update = function(time) {
          forceResolver.applyForce(this, time);
          if(this.y>450) {
              this.y = 450;
              if(this.speed > 0.1) {
                  this.speed = 0;
              } else {
                  this.speed = (0-this.speed)- 0.05;
              }
          }
          canvas.draw2(this.x,this.y,display);
        };

		var animate = function () {
           animator.animate(this);
		};

		return {
			x:x,
			y:y,
			width: diameter,
			height: diameter,
            mass: 4,
            speed:0,
            clear: clear,
			data: data,
            draw2: function (x,y) {
                this.x=x;
                this.y=y;
                canvas.draw2(x,y,display);
            },
			draw: function (x, y) {
				this.x=x;
				this.y=y;
				canvas.draw(this);
			},
            setPosition : setPosition,
            animate:animate,
            update: update
		};
	}
};