define(['underscore',
        'text!templates/elements/video/video.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "video",
		render : function (modelData) {
			this.append(element(modelData));
		}
	};
});
