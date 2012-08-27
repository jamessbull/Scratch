jim.colour = {
	create: function (r, g, b, a) {
		
		var colour = {};
		colour.red = r;
		colour.green = g;
		colour.blue = b;
		colour.alpha = a;

		var setColourPercent = function (colour, percentage){
			var newValue = (255/100) * percentage;
			console.log("this colour is" + colour + " percentage is "+ percentage + "new value is "+ newValue);
			this[colour] = newValue;
			console.log("colour.blue is "+ this[colour]);
		}
		colour.setColourPercent = setColourPercent;
		return colour;
	}
}