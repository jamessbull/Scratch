describe("A color should be", function() {
		
		
  	it("100 should be all white", function() {
		var red = 125;
		var green = 25;
		var blue = 25;
		
		var colour = jim.colour.create(red, green, blue, 255);
		colour.setLightness(100)
		expect(colour.red).toBe(2);
  	});

});