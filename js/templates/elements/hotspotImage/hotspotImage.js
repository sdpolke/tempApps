define(['underscore',
        'text!templates/elements/hotspotImage/hotspotImage.html',
        "jquery",
        "libs/jquery-ui-touch"], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "hotspotImage",
		render : function (modelData) {
			this.append(element(modelData));
			
			// Make fancy tooltips.
			var tooltipElements = $(".hotspot-control", this).tooltip({position: {my: "bottom", at: "top"}});
			
//			if (modelData.element.tooltipStateOpen) {
//				tooltipElements.tooltip("open");
//				setTimeout(function() {tooltipElements.tooltip("open");}, 1500);
//			}
		}
	};
});
