define(['underscore',
        'text!templates/elements/headerBtnGroup/headerBtnGroup.html'], function(_, tmpl) {
	"use strict";
	
	var element = _.template(tmpl);

	return {
		type : "headerBtnGroup",
		render : function (modelData) {
			this.append(element(modelData));
			
			$('#btnBookmarkPage').bind('click',function(e){
                e.preventDefault();
                //alert('bookmark');
                if($(e.currentTarget).hasClass('selected')){
                    $(e.currentTarget).removeClass('selected');
                    $('#btnBookmarkPage').removeClass('selected');
                }else{
                    $('#btnBookmarkPage').removeClass('selected');
                    $(e.currentTarget).addClass('selected');
                }
            });

            $('#btnNotePage').bind('click',function(e){
                e.preventDefault();
                //alert('notes');
                if($(e.currentTarget).hasClass('selected')){
                    $(e.currentTarget).removeClass('selected');
                    $('#btnNotePage').removeClass('selected');
                    $('#noteBox').hide();
                }else{
                    $('#btnNotePage').removeClass('selected');
                    $(e.currentTarget).addClass('selected');
                    $('#noteBox').show();
                }
            });


            var format1= 'media/'+element.songName+'.mp3';
            var format2= 'media/'+element.songName+'.ogg';
             //console.log(format1+format2);
            $("#jquery_jplayer_1").jPlayer({
                ready: function (event) {
                    $(this).jPlayer("setMedia", {
                        mp3:format1,
                        oga:format2
                    });

                    $(this).bind($.jPlayer.event.timeupdate,
                        function(event) {
                            //console.log(event.jPlayer.status.currentTime);

                        });

                },
                swfPath: "js/plugin",
                supplied: "mp3, oga",
                wmode: "window"
            });
		}
	};
});
