define(['underscore',
        'text!templates/elements/home/home.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "home",
		render : function (modelData) {
			this.append(element(modelData));
			
			$('.homeScreen ol li').on('click',function(e){
                e.preventDefault();
                var navigate = $(e.currentTarget).attr('data-navigate');
                App.Router.navigate('#'+navigate,true);
            });
		}
	};
});
