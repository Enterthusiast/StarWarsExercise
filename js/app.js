'use strict';

$(document).ready(function () {


	//Scrolling Ad function
	var scrollingAd = function() {

		var self = this;

		var $starwarsAd = $('.article-one-ad-img');

		var left = $starwarsAd.position().left.toString() + 'px';
		var width = $starwarsAd.width().toString() + 'px';
		var height = $starwarsAd.height().toString() + 'px';
		var top = 1125 - $starwarsAd.height();
		top = top.toString() + 'px';
		var scroll;

		// Update position depending scroll value
		var updatePosition = function() {

			scroll = $(window).scrollTop();

			if(scroll > 525 && scroll < 1125 && $starwarsAd.css('top') !== '75px') {
				$starwarsAd.css({
					'position': 'fixed',
					'top': '75px',
					'left': left,
					'width': width,
					'height': height,
				});
			} else if(scroll < 525 && $starwarsAd.css('top') !== '0px') {
				$starwarsAd.css({
					'position': 'static',
					'top': '0px'
				});
			} else if(scroll >= 1125 && $starwarsAd.css('position') !== 'relative') {
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