namespace("jim.util.animation.animator");

jim.util.animation.animator.create = function (element) {
   	var proceed = true;
    var animate = function (thing) {
        var lastTime = 0;
   		   var animateFunc = function (timeStamp) {
             var time_between_frames = timeStamp - lastTime;
             lastTime = timeStamp;
             if(proceed) {
                thing.update(time_between_frames);
                window.webkitRequestAnimationFrame(animateFunc, element);
              }
           };
           proceed = true;
           lastTime = new Date().getTime()
   		   animateFunc(lastTime);
   	};
    var stop = function (){ proceed = false };
   	return {
   		animate:animate,
        stop:stop
   	}

    // ok so basically I think that we need to have a single never ending renderloop
    // this just updates anything in the list of things to update
    // if I want something not updated anymore I simply remove it form the list and then
    // clear it manually
    // The next thing to do is to make each click clear the circle and restart it from
    // the location so don't stop the render loop don't call animate more than once.
    // just set it going once and then clear and change the position

}

