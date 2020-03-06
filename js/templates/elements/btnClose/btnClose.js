define(['underscore',
        'text!templates/elements/btnClose/btnClose.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "btnClose",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
