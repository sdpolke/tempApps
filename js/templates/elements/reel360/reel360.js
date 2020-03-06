define(['underscore',
        'text!templates/elements/reel360/reel360.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "reel360",
		render : function (modelData) {
			this.append(element(modelData));
			
            var spinner = new Spinner().spin();
            $('#mainWrapper.section3-page0').prepend(spinner.el);
            $('#reel360').unreel().hide();
            $('#reel360').reel(element.option[0]).bind("loaded", function(ev){
                // Your code

                $('#reel360').fadeIn(500,function(){
                    spinner.stop();
                });
                $('.hotspotL,.hotspotR').fadeIn(500).css('display','block');
            });
		}
	};
});
