namespace("jim");
namespace("jim.circle2");
jim.rectangle = {
	create: function (x, y, width, height) {
		return {
			draw: function (canvas) { canvas.drawRect(x,y,width,height) }
		};
	}
};

jim.point = {
	create : function (x,y) { return { x:x, y:y }; },
    fromIndex : function ( i, len ) {
        return { x : i%len, y : Math.floor(i / len) };
    }
};

jim.line = function (p1, p2) {
    return {
        length: function () {
            var bSquared = (p1.x - p2.x) * (p1.x - p2.x),
                cSquared = (p1.y - p2.y) * (p1.y - p2.y),
                aSquared = bSquared + cSquared;
            return Math.sqrt(aSquared);
        }
    }
};

jim.circle2.create = function (diameter, colour) {
    var p = jim.point;
    var line = jim.line;
    var canvas = document.createElement('canvas');

    canvas.width = diameter;
    canvas.height = diameter;

    var context = canvas.getContext('2d');
    var output = context.createImageData(diameter, diameter);
    var centre = (Math.floor(diameter/2) * diameter) + Math.floor(diameter / 2);
    var fullGradient = jim.gradient.create(0,diameter/2);
    var currentPixelsDistanceToCentre = function (index, length) {
        return line(p.fromIndex(index, length), p.fromIndex(centre, length)).length();
    };

    for (var i = 0 ; i < diameter * diameter; i++) {
        var distanceFromCentre = currentPixelsDistanceToCentre(i, diameter);
        var distAsPercent = fullGradient.at(distanceFromCentre);
        colour.setColourPercent("alpha", 100-distAsPercent);
        output.data[i*4] = colour.red;
        output.data[i*4+1] = colour.green;
        output.data[i*4+2] = colour.blue;
        output.data[i*4+3] = colour.alpha;
    }
    context.putImageData(output, 0, 0);
    return {
      display : function () { return canvas }
    };
};

jim.circle = {
	create: function (diameter, colour, forceResolver) {
        var x = 0;
        var y = 0;
        var display = jim.circle2.create(diameter, colour).display();
        var xSpeed = 0;
        var ySpeed = 0;
        var mass = 4;

        var update = function(time, context) {
            var result = forceResolver.resolve({xSpd : this.xSpeed, ySpd : this.ySpeed, mass : mass, duration: time});
            this.x += result.travelledX;
            this.y -= result.travelledY;
            this.xSpeed = result.xSpeed;
            this.ySpeed = result.ySpeed;

            if(this.x > 450){
                this.x = 450;
                this.xSpeed = 0 - this.xSpeed;
            }

            if(this.x < 0) {
                this.x = 0;
                this.xSpeed = 0 - this.xSpeed;
            }

            if(this.y < 0) {
                this.y = 0;
                this.ySpeed = 0 - this.ySpeed;
            }

            if(this.y>450) {
                this.y = 450;
                this.ySpeed = 0 - this.ySpeed;
            }
            context.drawImage(display,this.x,this.y);
        };

		return {
			x:x,
			y:y,
			width : diameter,
			height : diameter,
            mass : mass,
            xSpeed : xSpeed,
            ySpeed : ySpeed,
            update : update
		};
	}
};

// Thoughts on refactoring
// entity has vector / position

// display does not have an xy it
// just has a method which returns a canvas.

// the formula objects could do with
// not having the set methods on them

// pull out factory method to create entity with
// forceresolver

// do I need the canvas at all?



// do those