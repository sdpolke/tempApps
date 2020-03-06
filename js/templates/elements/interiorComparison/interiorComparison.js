define(['underscore',
        'text!templates/elements/interiorComparison/interiorComparison.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "interiorComparison",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
