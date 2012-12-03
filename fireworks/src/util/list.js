jim.list = {
	range: function (start, length, increment) {
		var nums = []
		for(var i = 0 ; i < length ; i++) {
			nums.push(start+ (i*increment));
		}
		return nums;
	}
}