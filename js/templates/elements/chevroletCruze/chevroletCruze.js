define(['underscore',
        'text!templates/elements/chevroletCruze/chevroletCruze.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "chevroletCruze",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
