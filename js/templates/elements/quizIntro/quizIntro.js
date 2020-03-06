define(['underscore',
        'text!templates/elements/quizIntro/quizIntro.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "quizIntro",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
