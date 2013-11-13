namespace("jim");
namespace("jim.circle2");

jim.point = {
	create : function (x, y) {
        "use strict";
        return { x: x, y: y };
    },
    fromIndex : function (i, len) {
        "use strict";
        return { x : i % len, y : Math.floor(i / len) };
    }
};

jim.line = function (p1, p2) {
    "use strict";
    return {
        length: function () {
            var bSquared = (p1.x - p2.x) * (p1.x - p2.x),
                cSquared = (p1.y - p2.y) * (p1.y - p2.y),
                aSquared = bSquared + cSquared;
            return Math.sqrt(aSquared);
        }
    };
};

jim.circle2.create = function (diameter, colour) {
    "use strict";
    var p = jim.point,
        line = jim.line,
        canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        output = context.createImageData(diameter, diameter),
        centre = (Math.floor(diameter / 2) * diameter) + Math.floor(diameter / 2),
        fullGradient = jim.gradient.create(0, diameter / 2),
        currentPixelsDistanceToCentre = function (index, length) {
            return line(p.fromIndex(index, length), p.fromIndex(centre, length)).length();
        },
        i,
        distanceFromCentre,
        distAsPercent;
    canvas.width = diameter;
    canvas.height = diameter;

    for (i = 0; i < diameter * diameter; i += 1) {
        distanceFromCentre = currentPixelsDistanceToCentre(i, diameter);
        distAsPercent = fullGradient.at(distanceFromCentre);
        colour.setColourPercent("alpha", 100 - distAsPercent);
        output.data[i * 4] = colour.red;
        output.data[i * 4 + 1] = colour.green;
        output.data[i * 4 + 2] = colour.blue;
        output.data[i * 4 + 3] = colour.alpha;
    }
    context.putImageData(output, 0, 0);
    return {
        display : function () { return canvas; }
    };
};

jim.circle = {
	create: function (diameter, colour, forceResolver) {
        "use strict";
        var x = 0,
            y = 0,
            display = jim.circle2.create(diameter, colour).display(),
            xSpeed = 0,
            ySpeed = 0,
            mass = 4,
            update = function (time, context) {
                var result = forceResolver.resolve({xSpd : this.xSpeed, ySpd : this.ySpeed, mass : mass, duration: time});
                this.x += result.travelledX;
                this.y -= result.travelledY;
                this.xSpeed = result.xSpeed;
                this.ySpeed = result.ySpeed;

                if (this.x > 450) {
                    this.x = 450;
                    this.xSpeed = -this.xSpeed;
                }

                if (this.x < 0) {
                    this.x = 0;
                    this.xSpeed = -this.xSpeed;
                }

                if (this.y < 0) {
                    this.y = 0;
                    this.ySpeed = -this.ySpeed;
                }

                if (this.y > 450) {
                    this.y = 450;
                    this.ySpeed = -this.ySpeed;
                }
                context.drawImage(display, this.x, this.y);
            };

		return {
			x: x,
			y: y,
			width : diameter,
			height : diameter,
            mass : mass,
            xSpeed : xSpeed,
            ySpeed : ySpeed,
            update : update,
            dead : false
		};
	}
};