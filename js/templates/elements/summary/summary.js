define(['underscore',
        'text!templates/elements/summary/summary.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "summary",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
