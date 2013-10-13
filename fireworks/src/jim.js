var namespace = function (namespace) {
    "use strict";
	var names = namespace.split("."),
	    context = window,
	    component = "",
        i = 0;
	for (i; i < names.length; i += 1) {
		component = names[i];
		if (!context[component]) {
			context[component] = {};
		}
		context = context[component];
	}
};