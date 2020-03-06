define(['underscore',
        'text!templates/elements/boxNav/boxNav.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "boxNav",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
