define(['underscore',
        'text!templates/elements/landing/landing.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "landing",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
