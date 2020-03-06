define(['underscore',
        'text!templates/elements/competition/competition.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "competition",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
