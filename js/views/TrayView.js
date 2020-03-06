define([
    'jquery',
    'underscore',
    'backbone', 'spin',
    'collections/Stubs',
    'models/Stub',
    'views/TrayListItemView',
    'views/TrayListView',
    'text!templates/trayMenu.html',
    'text!templates/trayList.html',
    'libs/jquery-ui-touch'
],
    function ($, _, Backbone, Spinner,Stubs,TrayData,TrayListItemView,TrayListView, tplTrayMenu, tplTrayList) {
        "use strict";

        return Backbone.View.extend({
            el:'#leftTrayWrapper',
            template: _.template(tplTrayMenu),
            initialize: function () {
            	this.$el = (App.config.menuType === "leftTray")?$('#leftTrayWrapper'):$("#floatingMenuWrapper");
            	
               // console.log(this.model);
                this.model.bind("change ", this.render, this);
                //this.model.bind('remove', this.render, this);

                this.render();
            },

            events: {
                'click #btnBookmark':'trayBookmarks',
                'click #btnNotes':'trayNotes',
                'click .leftNav':'gotoSection',
                'click #leftTrayHeader':'gotoHome'
            },
            render: function(){

                this.$el.html(this.template({trayMenu:this.model.toJSON(),trayConfig:App.Models.user.get('trayConfig')}));
                /*
*/

                //console.log(trayListView.render().el);

                return this;
            },
            trayBookmarks:function(){
                this.trayListView  = new TrayListView({collection:App.Models.user.get('bookmarks')});
                $("#leftMenuWrapper").html(this.trayListView.render('Boomarks').el);

            },
            trayNotes:function(){
                this.trayListView  = new TrayListView({collection:App.Models.user.get('notes')});
                $("#leftMenuWrapper").html(this.trayListView.render('Notes').el);

            },

            gotoSection:function(e){
            
                if($(e.currentTarget).hasClass('disabled')){
                    return;
                }
                //alert($(e.currentTarget).attr('data-action'));
                App.Router.navigate($(e.currentTarget).attr('data-action'),true);
                $("#trayOpaque").trigger("click");
            },
            gotoHome:function(e){
                e.preventDefault();
         
                App.Router.navigate($(e.currentTarget).attr('data-action'),true);
//              Animation For the Second time that is on  onclick  leftTrayWrapper Santosh
                $('#leftTrayWrapper').animate({left:'-300px'},100);
                $('#menuHandle').animate({left:'0px'},100);
                $('#trayOpaque').css('z-index',0).fadeOut();
            }
          });
    }
);
