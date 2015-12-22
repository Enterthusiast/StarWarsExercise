"use strict";

$(document).ready(function () {

	var scrollingAd = function() {

		var $starwarsAd = $('.article-one-ad-img');

		var left = $starwarsAd.position().left.toString() + "px";
		var width = $starwarsAd.width().toString() + "px";
		var height = $starwarsAd.height().toString() + "px";
		var top = 1125 - $starwarsAd.height();
		top = top.toString() + "px";
		var scroll;

		$(window).scroll(function() {

			scroll = $(window).scrollTop();

			if(scroll > 525 && scroll < 1125 && $starwarsAd.css("top") !== "75px") {
				$starwarsAd.css({
					"position": "fixed",
					"top": "75px",
					"left": left,
					"width": width,
					"height": height,
				});
			} else if(scroll < 525 && $starwarsAd.css("top") !== "0px") {
				$starwarsAd.css({
					"position": "static",
					"top": "0px"
				});
			} else if(scroll >= 1125 && $starwarsAd.css("position") !== "relative") {
				$starwarsAd.css({
					"position": "relative",
					"top": top,
					"left": 0,
					"width": width,
					"height": height,
					"z-index": "-1"
				});
			}

		});

	}

	scrollingAd();

	$('.main-menu-button').click(function() {
		$('.main-menu').toggleClass('main-menu-show');
		$('.main-menu-button-icon').toggle();
		$('.main-menu-button-icon-close').toggle();
	});

})