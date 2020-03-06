define(['underscore',
        'text!templates/elements/title/title.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "title",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
