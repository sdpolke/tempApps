define(['underscore',
        'text!templates/elements/info/info.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "info",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
