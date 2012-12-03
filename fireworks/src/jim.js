var namespace = function (namespace) {
	var names = namespace.split(".");
	var context = window;
	var component = "";
	for(var i = 0 ; i < names.length; i++) {
		component = names[i];
		if(!context[component]) {
			context[component] = {} ;
		}
		context = context[component];
	}
}