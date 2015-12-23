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

// .visible plugin

(function($){

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *       the user visible viewport of a web browser.
     *       only accounts for vertical position, not horizontal.
     */
    var $w = $(window);
    $.fn.visible = function(partial,hidden,direction){

        if (this.length < 1)
            return;

        var $t        = this.length > 1 ? this.eq(0) : this,
            t         = $t.get(0),
            vpWidth   = $w.width(),
            vpHeight  = $w.height(),
            direction = (direction) ? direction : 'both',
            clientSize = hidden === true ? t.offsetWidth * t.offsetHeight : true;

        if (typeof t.getBoundingClientRect === 'function'){

            // Use this native browser method, if available.
            var rec = t.getBoundingClientRect(),
                tViz = rec.top    >= 0 && rec.top    <  vpHeight,
                bViz = rec.bottom >  0 && rec.bottom <= vpHeight,
                lViz = rec.left   >= 0 && rec.left   <  vpWidth,
                rViz = rec.right  >  0 && rec.right  <= vpWidth,
                vVisible   = partial ? tViz || bViz : tViz && bViz,
                hVisible   = partial ? lViz || rViz : lViz && rViz;

            if(direction === 'both')
                return clientSize && vVisible && hVisible;
            else if(direction === 'vertical')
                return clientSize && vVisible;
            else if(direction === 'horizontal')
                return clientSize && hVisible;
        } else {

            var viewTop         = $w.scrollTop(),
                viewBottom      = viewTop + vpHeight,
                viewLeft        = $w.scrollLeft(),
                viewRight       = viewLeft + vpWidth,
                offset          = $t.offset(),
                _top            = offset.top,
                _bottom         = _top + $t.height(),
                _left           = offset.left,
                _right          = _left + $t.width(),
                compareTop      = partial === true ? _bottom : _top,
                compareBottom   = partial === true ? _top : _bottom,
                compareLeft     = partial === true ? _right : _left,
                compareRight    = partial === true ? _left : _right;

            if(direction === 'both')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
            else if(direction === 'vertical')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
            else if(direction === 'horizontal')
                return !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
        }
    };

})(jQuery);

// Apply parallax effect to a jquery selected visible background
// Dependencies: jquery & visible jquery plugin
// Built as a prototype class for the sake of this exercise
var parallaxBackground = function(jqueryString, scrollFactor, customizedXPosition) {

	this.jqueryString = jqueryString;
	this.scrollFactor = scrollFactor;
	this.customizedXPosition = customizedXPosition;
    this.$background;

	this.initialize();

};
parallaxBackground.prototype.initialize = function () {

    if(typeof this.scrollFactor !== 'number' || this.scrollFactor === NaN) {
        // set default x position value
        this.scrollFactor = 0.5;
    }

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

    console.log('update', this);

    if(this.$background.visible(true)) {
        window.requestAnimationFrame(function(self) { return function() {

            self.$background.css('background-size', 'auto' + ' ' + (self.$background.height()+self.$background.height()*self.scrollFactor) + 'px');
            self.$background.css('background-position', self.customizedXPosition + ' ' + 'calc(50% + ' + (self.$background.offset().top-$(window).scrollTop())*self.scrollFactor + 'px)');
            
        }; }(this));
    }

}

new parallaxBackground('.header-img-container', 0.5);
new parallaxBackground('.kylo-img-container', 0.5);
new parallaxBackground('.troopers-img-container', 0.5);