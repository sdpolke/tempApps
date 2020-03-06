define([ 'backbone',
         'AssociatedModel'
],
function(Backbone, AssociatedModel) {
	"use strict";

	return Backbone.AssociatedModel.extend({
		defaults : {
			id : 0,
			title : "",
			date : "",
			action : "#",
			key : "",
			value : ""
		}

	});
});