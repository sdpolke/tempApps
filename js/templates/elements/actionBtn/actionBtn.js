define(['underscore',
        'text!templates/elements/actionBtn/actionBtn.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "actionBtn",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
