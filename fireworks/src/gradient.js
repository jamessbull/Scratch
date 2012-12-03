namespace("jim.colour");
jim.colour.gradient = {
	create : function (colour1, colour2) {
		return {
			at : function (percent) {
				return jim.colour.create(colour1.red,colour1.green, colour1.blue, colour1.alpha);
			}
		};
	}
};

namespace("jim.gradient");
jim.gradient = {
	create : function (start, end) {
		return {
			at : function (number) {
				var length = end - start;
				var offset = number - start;
				return (offset / length) * 100
			},
			atPercent: function (number) {
				return (end / 100) * number; 
			}
		};
	},
	linearFireworkGradient : function (colour) {
		return {
			redAt   : function () {
				
			},
			blueAt  : function () {
				
			},
			greenAt : function () {
				
			}
		}
	}
};