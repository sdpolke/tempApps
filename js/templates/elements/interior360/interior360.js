define(['underscore',
        'text!templates/elements/interior360/interior360.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "interior360",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
