define(['underscore',
        'text!templates/elements/fordFocus/fordFocus.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "fordFocus",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
