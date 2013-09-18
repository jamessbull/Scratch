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
	create: function (diameter, canvas, animator, colour, forceResolver) {
		var data = [];

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
        //1,1,1,1,1,1 index od centre is 13 pixels in floor d on2 is 2 *5 =10 + 2 = 12
        //1,1,1,1,1,1    maybe centre above shouls be ceiling
        //1,1,1,1,1,1
        //1,1,1,0,1,1
        //1,1,1,1,1,1
        //1,1,1,1,1,1
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

		var dataElements = jim.list.range(0, numberOfPixels, 1);
		var fullGradient = jim.gradient.create(0,diameter/2);

		$.each(dataElements, function (index) {
			var distanceFromCentre = currentPixelsDistanceToCentre(index, diameter);
			var distAsPercent = fullGradient.at(distanceFromCentre);
			colour.setColourPercent("red", 100 - distAsPercent); 
			colour.setColourPercent("green", 0);
			colour.setColourPercent("blue", 0);
			colour.setColourPercent("alpha", 100);

            addPixel(data, colour);
			
		});

        var setPosition = function (x,y) {
            canvas.clearShape(this);
            this.x = x;
            this.y = y;
        };

        var update = function(time) {
          canvas.clearShape(this);
          forceResolver.applyForce(this, time);
          if(this.y>450) {
              this.y = 450;
              this.speed = 0;
          }
          canvas.draw(this);
        };

		var animate = function () {
           animator.animate(this);
		};

		return {
			x:0,
			y:0,
			width: diameter,
			height: diameter,
            mass: 4,
            speed:0,
            clear: clear,
			data: data,
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


// o.k. next things to have is to have more than one on screen
// to have it so colours are transparent so circles don't interfere with each other
// to have it so we can render circle in the correct place and detect a click inside it
// to deal with horizontal motion also
// to have a control on the screen to allow me to set the acceleration and gravity
// goal is to show a firework which is most important for that?
// multi on screen
//then horizontal forces
// then air resistance
// the inputs to play with the values

// so many things on screen
// at the moment what happens?
// i call animate on the circle
// the circle calls animate on the animator and passes itself in
// the animator calls update on the object and the requests another frame
// the object updates itself and then calls draw on the canvas
// O.K. Does a circle have a renderable? Yes. Passed in.
// a force resolver acts on an entity
// what is the relationship between a circle an entity and a renderable
// a renderable is what will actually going to be drawn on the screen
// a circle is an entity and has forces applied to it directly
// does a renderable need to be updated?
//Arguably not but then I have to give entities to the renderer which seems backwards
// The render loop just calls update.
// maybe the renderer should be called something else?

// What do I need to do
// world has it's own state the values there should not correspond directly to screen coords
// so I want to 1 update all my objects then once the object is updated take that and render it to the screen.
// so the thing that has my loop should do nothing else except update the world.
// the worlds should update each object and render it to the canvas.
// that is a refactor though.
// so world has entities the main loop tells the world to update and that updates each object
// each object as part of it's update draws itself to the canvas
// so the rendere presumably it's job is to scale the world so it fits on the screen for now one to one will do