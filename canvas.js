var jim = {};
jim.test = function () {
	var canvas = $('#mainCanvas')[0].getContext('2d');
	canvas.fillStyle="#FF0000";
	canvas.fillRect(0,0,150,75);
}