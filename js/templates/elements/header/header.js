define(['underscore',
        'text!templates/elements/header/header.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "header",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
