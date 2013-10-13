namespace("jim.colour");

namespace("jim.gradient");
jim.gradient = {
	create : function (start, end) {
        "use strict";
		return {
			at : function (number) {
				var length = end - start,
				    offset = number - start;
				return (offset / length) * 100;
			}
		};
	}
};