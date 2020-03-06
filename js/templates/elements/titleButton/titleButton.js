define(['underscore',
        'text!templates/elements/titleButton/titleButton.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "titleButton",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
