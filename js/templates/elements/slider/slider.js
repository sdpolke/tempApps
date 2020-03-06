define(['underscore','libs/jquery.touchslider.min',
        'text!templates/elements/slider/slider.html'], function(_, slide, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "slider",
		render : function (modelData) {
			this.append(element(modelData));
			
            $(".touchslider-demo").touchSlider({
            	 mouseTouch: true,
                 autoplay: true,
                 margin: 0,
                 duration:500,
                 delay: 5500
            });
            $('.touchslider-nav a:first-child').addClass('touchslider-nav-item-current');
		}
	};
});
