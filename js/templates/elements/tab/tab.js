define(['underscore',
        'text!templates/elements/tab/tab.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "tab",
		render : function(modelData) {
			this.append(element(modelData));

		/*	var tabs = $('.tabElement ul li');
			$(".tab0").addClass('active');
			var previousItem = 'tab0';
			$(".content0").show();
			tabs.bind("click", function(e) {
				$(".tabElement ul li").removeClass('active');
				var background = $(".spriteTab");
				$(background).stop().animate({
					top : $(this).position()['top']
				}, {
					duration : 300
				});
				$(this).delay(1000).addClass('active');
				previousItem = $(this).attr("class");
				var activeEl = $(this);
				var ids = tabs.each(function() {
					$($(this).attr('rel')).hide();
				});
				$(activeEl.attr('rel')).show();

			});*/
			
			 $(function () {
//				    $('#myTab a:last').tab('show')
			})
			
		}
	};
});
