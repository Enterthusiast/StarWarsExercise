'use strict';

$(document).ready(function () {

	// Star Wars Animation
	var starwarsAnim = function(jqueryString) {

		setTimeout(function() {

			// Easter Egg on click
			$('.article-one-main').dblclick(function() {

				// Check resolution
				if($(window).width() >= 1007) {
					var $animatedEl = $(jqueryString);

					// Prevent element resize during animation (reset style if required)
					if($animatedEl.attr('style') === '' || $animatedEl.attr('style') === undefined) {
						$animatedEl.css({
							'height': $animatedEl.height()
						});
					} else {
						$animatedEl.attr('style','');
					}

					// Aplly additional style to start the anmiation (reset styles if required)
					$(jqueryString + ' .animation-container').toggleClass('scroll-up-container');

					if($(jqueryString + ' .animation-container').attr('style') === '' ||
						$(jqueryString + ' .animation-container').attr('style') === undefined) {
						$(jqueryString + ' .animation-container').css({
							'width': $animatedEl.width(),
							'height': $animatedEl.height()
						});
					} else {
						$(jqueryString + ' .animation-container').attr('style','');
					}

					if($(jqueryString + ' .animation-container a').attr('style') === '' ||
						$(jqueryString + ' .animation-container a').attr('style') === undefined) {
						$(jqueryString + ' .animation-container a').css({
							'color': 'yellow'
						});
					} else {
						$(jqueryString + ' .animation-container a').attr('style','');
					}

					$(jqueryString + ' .animation-shape').toggleClass('scroll-up-shape');
					$(jqueryString + ' .animation-text').toggleClass('scroll-up-text');

					// Clean up styles after animation completed
					$animatedEl.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(event) {

						$animatedEl.attr('style','');
						$(jqueryString + ' .animation-container').attr('style','');
						$(jqueryString + ' .animation-container a').attr('style','');
						$(jqueryString + ' .animation-container').removeClass('scroll-up-container');
						$(jqueryString + ' .animation-shape').removeClass('scroll-up-shape');
						$(jqueryString + ' .animation-text').removeClass('scroll-up-text');

					});

				}

			});

		}, 500);

	}

	// Attach animation
	$('.article-one-main').load(starwarsAnim('.article-one-content'));

	// Scrolling Ad function
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
			stop = start + $contentBound.height() - $starwarsAd.height();

		};

		// Update position depending scroll value
		var updatePosition = function() {

			if($('.article-one-ad').css('display') !== 'none') {
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
				} else if(scroll >= stop && $starwarsAd.css('top') !== top) {
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

		};

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

		// Attach update position to scroll event
		$(window).scroll(updatePosition);

		// Execute first update, timeout added as a workaround
		// Because stop and top values are not good even after
		// waiting for the image and/or the whole article to load
		setTimeout(updatePosition, 500);

	};

	// Execute Scrolling Ad function after image is loaded
 	$('.article-one-ad-img').load(scrollingAd());

	// Toggle mobile menu
	$('.main-menu-button').click(function() {
		$('.main-menu').toggleClass('main-menu-show');
		$('.main-menu').toggleClass('main-menu-hide');
		$('.main-menu-button-icon').toggle();
		$('.main-menu-button-icon-close').toggle();
	});

});