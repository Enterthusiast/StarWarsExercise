"use strict";

$.getJSON( "js/menu.json", function( data ) {

	var items = [];

	$.each( data, function( key, val ) {
		items.push( '<li class="main-menu-item"><a href="">' + val + '</a></li>' );
	});

	$(".main-menu-list").append(items.join(""));

});