define(['underscore',
        'text!templates/elements/volkswagenJetta/volkswagenJetta.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "volkswagenJetta",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
