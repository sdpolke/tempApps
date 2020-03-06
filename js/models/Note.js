define([ 'backbone',
         'models/Bookmark'
], function(Backbone, Bookmark) {
	"use strict";

	return Bookmark.extend({
		defaults : {
			id : 0,
			title : "",
			date : "",
			action : "#",
			key : "",
			value : "",
			text : ""
		}
	});
});