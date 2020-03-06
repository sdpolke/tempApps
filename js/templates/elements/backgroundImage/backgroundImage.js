define(['underscore',
        'text!templates/elements/backgroundImage/backgroundImage.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "backgroundImage",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
