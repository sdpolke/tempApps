define(['underscore',
        'text!templates/elements/footerTray/footerTray.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "footerTray",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
