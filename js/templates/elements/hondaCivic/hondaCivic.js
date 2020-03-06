define(['underscore',
        'text!templates/elements/hondaCivic/hondaCivic.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "hondaCivic",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
