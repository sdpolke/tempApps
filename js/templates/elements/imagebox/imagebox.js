define(['underscore', "libs/idangerous.swiper",
        'text!templates/elements/imagebox/imagebox.html'], function(_, swiper, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "imagebox",
		render : function (modelData) {
			this.append(element(modelData));
			
			var mySwiper = new Swiper('.swiper-container',{
				pagination: '.pagination',
				paginationClickable: true,
				loop:true,
				//arrows:true
			})	
			
		}
	};
});
