define(['underscore',
        'text!templates/elements/hyundaiElantra/hyundaiElantra.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "hyundaiElantra",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
