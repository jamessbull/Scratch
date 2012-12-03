namespace("jim.colour");
jim.colour.create = function (r, g, b, a) {	
	var colour = {};
	colour.red = r;
	colour.green = g;
	colour.blue = b;
	colour.alpha = a;
	var setColourPercent = function (colour, percentage){
		var newValue = (255/100) * percentage;
		this[colour] = newValue;
	};
	var setLightness = function (percent) {
		color.red = 2;
	}
	colour.seLightness = setLightness
	colour.setColourPercent = setColourPercent;
	return colour;
}
