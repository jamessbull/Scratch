describe("A linear colour gradient", function() {
	
	var colour1  = jim.colour.create(100, 90, 80, 70);
	var colour2  = jim.colour.create(70, 80, 90, 100);
	
	beforeEach(function() {
	  this.addMatchers({
	    toBeColour: function(expected) {
	      var actual = this.actual;
	      var notText = this.isNot ? " not" : "";

	      this.message = function () {
			var message = "Expected a colour with red:" + actual.red + " green:" + actual.green+ " blue:" + actual.blue + " alpha:" + actual.alpha + notText;
	        return message += " to be red:" + expected.red + " green:" + expected.green + " blue:" + expected.blue + " alpha:" + expected.alpha;
	      }
		  return actual.red   === expected.red   &&
		  		 actual.green === expected.green &&
				 actual.blue  === expected.blue  &&
		  		 actual.alpha === expected.alpha;
	    }

	  });
	});
	
  	it("should have the first value as the from colour", function() {
		var gradient = jim.colour.gradient.create(colour1, colour2);
		var result = gradient.at(0);
    	expect(result).toBeColour(colour1);
  	});

	it("should have the first value as the from colour", function() {
		var gradient = jim.colour.gradient.create(colour1, colour2);
		var result = gradient.at(0);
    	expect(result).toBeColour(colour1);
  	});

	it("should calculate what percent a number is between two other numbers", function () {
		var lineargradient = jim.gradient.create(10, 60);
		expect(lineargradient.at(35)).toBe(50);
	});
});