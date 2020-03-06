define([
    'jquery',
    'underscore',
    'backbone',
    'hammer',
    'spin',
    'models/Stub',
    'collections/Stubs',
    'views/PageView',
    'text!templates/app.html'
],
    function ($, _, Backbone, jq_hammer, Spinner, StubDataModel, StubCollection, PageView, tplApp) {
        "use strict";

        return Backbone.View.extend({

            // The DOM Element associated with this view
            el: "#pageWrapper",

            // Setting the view's template property using the Underscore template method
            template: _.template(tplApp),

            // View constructor
            initialize: function () {
                this.model.bind("change", this.render, this);

                 // Calls the view's render method
                this.render();



            },

            // View Event Handlers
            events: {
                  //'click #menuHandle':'animateTray'
            },

            // Renders the view's template to the UI
            render: function () {

                this.$el.html(this.template(this.model.toJSON()));
                
                /** Remove the tray menu if not required */
                if (!App.config.showTray) {
                	$("#menuHandle, #leftTrayWrapper, #trayOpaque").remove();
                	return this;
                }
                
                var self = this;
                //this.pageRender();
                //gestures on LogoTab
                var leftTray = "#leftTrayWrapper";
                var startPoint = 0;
                var endPoint = 0;
                var startBoundaryPoint = 0;
                var trayWidth = $(leftTray).outerWidth();
                var endBoundaryPoint = trayWidth;
                var offSet = -1;
                var dragLimit = trayWidth * 0.15;
                var traySpeed = 100;

                $("#menuHandle").hammer({ drag_max_touches: 0}).bind("drag dragstart dragend tap touch", function (ev) {
                    //alert('inside');
                    ev.gesture.preventDefault();
                    ev.stopPropagation();
                    //console.log('hammer on');
                    var touches = ev.gesture.touches;
                    switch (ev.type) {
                        case 'drag':
                            if (touches[0].pageX > (offSet + startBoundaryPoint) && touches[0].pageX < (offSet + endBoundaryPoint)) {
                                $(this).css({left: touches[0].pageX - offSet });
                                $(leftTray).css({   left: touches[0].pageX - offSet - trayWidth });
                            }
                            $('#trayOpaque').css('z-index',99999).fadeIn();
                            break;
                        case 'dragstart':
                            startPoint = touches[0].pageX;
                            if (offSet == -1) {
                                offSet = startPoint;
                            }
                            $('#trayOpaque').css('z-index',99999).fadeIn();
                            break;
                        case 'dragend':
                            startPoint = parseInt(startPoint);
                            endPoint = parseInt(touches[0].pageX);

                            if (ev.gesture.direction == "right") {
                                if ($(this).position().left > dragLimit) {
                                    $(this).animate({
                                        "left": endBoundaryPoint
                                    }, {queue: false, duration: traySpeed});
                                    $(leftTray).animate({
                                        "left": endBoundaryPoint - trayWidth
                                    }, {queue: false, duration: traySpeed});
                                    $('#trayOpaque').css('z-index',99999).fadeIn();

                                } else {
                                    $(this).animate({
                                        "left": startBoundaryPoint
                                    }, {queue: false, duration: traySpeed,complete: function(){

                                        $('#trayOpaque').css('z-index',0).fadeOut();
                                        }});


                                    $(leftTray).animate({
                                        "left": startBoundaryPoint - trayWidth
                                    }, {queue: false, duration: traySpeed});

                                }
                               // alert('inside');

                            }

                            if (ev.gesture.direction == "left") {
                                if ($(this).position().left < (trayWidth - dragLimit)) {
                                    $(this).animate({
                                        "left": startBoundaryPoint
                                    }, {queue: false, duration: traySpeed,complete: function(){

                                        $('#trayOpaque').css('z-index',0).fadeOut();
                                    }});
                                    $(leftTray).animate({
                                        "left": startBoundaryPoint - trayWidth
                                    }, {queue: false, duration: traySpeed});

                                } else {
                                    $(this).animate({
                                        "left": endBoundaryPoint
                                    }, {queue: false, duration: traySpeed});
                                    $(leftTray).animate({
                                        "left": endBoundaryPoint - trayWidth
                                    }, {queue: false, duration: traySpeed});

                                }

                            }
                            break;
                        case 'tap':
                            var leftPos = $(this).position();
                            //console.log(leftPos.left)
                            if (leftPos.left == 0) {
                                $(this).animate({left: endBoundaryPoint}, traySpeed);
                                $(leftTray).animate({left: endBoundaryPoint - trayWidth}, traySpeed);
                                $('#trayOpaque').css('z-index',99999).fadeIn();
                            } else {
                                $(this).animate({
                                    "left": startBoundaryPoint
                                }, {queue: false, duration: traySpeed,complete: function(){

                                    $('#trayOpaque').css('z-index',0).fadeOut();
                                }});
                                $(leftTray).animate({left: startBoundaryPoint - trayWidth}, traySpeed);

                            }
                            break;
                    }
                });
                
                $('#trayOpaque').bind("click",function(){
                   $(leftTray).animate({left:'-300px'},traySpeed);
                    $('#menuHandle').animate({left:'0px'},traySpeed);
                    $(this).css('z-index',0).fadeOut();
                });

                return this;
            },
            

            animateTray:function(){
                //console.log("tray button clicked");

            },
            pageRender:function(){
                //var self = this;
                /*var pages = new StubCollection();
                _.each(this.model.getSelectedPage(),function(page){
                    pages.add(page)        ;
                }) ;*/

                this.pageView = new PageView({
                    model:this.model.getSelectedPage()
                },this);
            }
        });
    }
);
