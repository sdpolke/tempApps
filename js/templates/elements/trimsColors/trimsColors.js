define(['underscore',
        'text!templates/elements/trimsColors/trimsColors.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "trimsColors",
		render : function (modelData) {
			this.append(element(modelData));
			
			$('.bullet,.vehicleColor').hide();
            $('.modelL').show();
            $('.vehicleTrimsColors').hide();
            $('.modelImg:first-child .vehicleTrimsColors:first-child').show();
            $('.btnModelSelector li:first-child, .btnVehicleColor li:first-child').addClass('active');
            var colorname = $('.vehicleColor.modelL ul li:first-child').attr('colorname');
            $('.modelL .colorName').text(colorname);
            var tabs = $('.btnModelSelector li');
            tabs.bind('click', function (ev) {
                $('.vehicleColorWrap ul li').removeClass('active');
                $('.vehicleColorWrap ul li:first-child').addClass('active');
                $('.btnModelSelector li').removeClass('active');
                $(this).addClass('active');
                var $anchor = $(this);
                var ids = tabs.each(function(){
                    $($(this).attr('modelname')).hide();
                });
                var currentclass=$anchor.attr('modelname');
                var findColor=".vehicleColor"+currentclass+" ul li:first-child";
                $($anchor.attr('modelname')).show();
                var colorname = $(findColor).attr('colorname');
               // console.log(colorname);
                $(currentclass+' .colorName').text(colorname);
                $('.vehicleTrimsColors').hide();
                $(currentclass+ ' .vehicleTrimsColors:first-child').show();
                //forImage Change first

            });
            $('.vehicleColorWrap ul li').bind("click",function(){
                $('.vehicleColorWrap ul li').removeClass('active');
                $(this).addClass('active');
                //alert('inside');
                var color=$(this).attr('colorname');
                $('.vehicleColorWrap .colorName').text(color);
                var tab1 = $('.btnModelSelector li');
                var $anchor = $(this);
                $('.vehicleTrimsColors').hide();
                $($anchor.attr('vehicle')).show();
            });
		}
	};
});
