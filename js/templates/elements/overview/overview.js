define(['underscore',
        'text!templates/elements/overview/overview.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "overview",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
