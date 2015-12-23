'use strict';

$(document).ready(function () {


	//Scrolling Ad function
	var scrollingAd = function() {

		var self = this;

		var $starwarsAd = $('.article-one-ad-img');
		var $contentBound = $('.article-one-ad');

		// Fixed value
		var width = '300px';
		var height = '600px';

		// Layout dependent values
		var left;
		var top;
		var start;
		var stop;
		var scroll;

		// Update layout dependant values
		var updateAnchor = function () {

			left = $starwarsAd.position().left.toString() + 'px';
			top = $contentBound.height() - $starwarsAd.height() + 'px';
			start = $contentBound.position().top - 75;
			stop = $contentBound.position().top + $contentBound.height() - $starwarsAd.height();

		}

		// Update position depending scroll value
		var updatePosition = function() {

			updateAnchor();

			scroll = $(window).scrollTop();

			if(scroll > start && scroll < stop && $starwarsAd.css('top') !== '75px') {
				$starwarsAd.css({
					'position': 'fixed',
					'top': '75px',
					'left': left,
					'width': width,
					'height': height,
				});
			} else if(scroll < start && $starwarsAd.css('top') !== '0px') {
				$starwarsAd.css({
					'position': 'static',
					'top': '0px'
				});
			} else if(scroll >= stop && $starwarsAd.css('position') !== 'relative') {
				$starwarsAd.css({
					'position': 'relative',
					'top': top,
					'left': 0,
					'width': width,
					'height': height,
					'z-index': '-1'
				});
			}

		}

		// If resize, we need to store new coordinates
		$(window).resize(function() {
			// Set position back to default
			$starwarsAd.css({
				'position': 'static',
				'top': '0px'
			});
			// Get left position
			left = $starwarsAd.position().left.toString() + 'px';
			// Update position accordingly
			updatePosition();			
		});

		// Attach uodate position to scroll event
		$(window).scroll(updatePosition);

	}

	// Execute Scrolling Ad function after image is loaded
	var imageAd = new Image();
	imageAd.onload = function () {
	   scrollingAd();
	}
	imageAd.src = $('.article-one-ad-img').attr('src');

	// Toggle mobile menu
	$('.main-menu-button').click(function() {
		$('.main-menu').toggleClass('main-menu-show');
		$('.main-menu-button-icon').toggle();
		$('.main-menu-button-icon-close').toggle();
	});

})