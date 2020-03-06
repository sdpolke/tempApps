define(['underscore',
        'text!templates/elements/dodgeDart/dodgeDart.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "dodgeDart",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
