'use strict';

// Polyfill for requestAnimationFrame
// via: https://gist.github.com/paulirish/1579671

(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); },
			timeToCall);
			lastTime = currTime + timeToCall;
			return id;
	};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
		clearTimeout(id);
	};
}());

// Apply parallax effect to a jquery selected background
// Dependencies: jquery & RequestAnimationFrame
// Built as a prototype class for the sake of this exercise
var parallaxBackground = function(jqueryString, customizedXPosition) {

	this.jqueryString = jqueryString;
	this.customizedXPosition = customizedXPosition;
    this.$background;

	this.initialize();

};
parallaxBackground.prototype.initialize = function () {

    if(typeof this.customizedXPosition !== 'string') {
        // set default x position value
        this.customizedXPosition = '50%';
    }

    if(typeof this.jqueryString === 'string') {
        this.$background = $(this.jqueryString);
        $(window).scroll(function(self) { return function() { self.updatePosition(); }; }(this));
        $(window).resize(function(self) { return function() { self.updatePosition(); }; }(this));
    } else {
        console.log('parallaxBackground Error: jquery request is not a string');
    }

};
parallaxBackground.prototype.updatePosition = function() {

        // The background is visible
        if($(document).scrollTop()+$(window).height() >= this.$background.offset().top)
        {
            // parallax percent calculation, based on the background position on document
            var parallaxPercent = ($(document).scrollTop()-this.$background.offset().top) / $(document).height();
            // parallax pixel that will be used to change the backgroudn position
            // proportional to the image height
            var parallaxPx = parallaxPercent * this.$background.height();
        }

        // change position
        window.requestAnimationFrame(function(self) { return function() {

            self.$background.css('background-position', self.customizedXPosition + ' ' + parallaxPx + 'px');

        }; }(this));

}

new parallaxBackground('.header-img-container');