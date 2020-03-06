define(['underscore',
        'text!templates/elements/nissanSentra/nissanSentra.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "nissanSentra",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
