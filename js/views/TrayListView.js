define([
    'jquery',
    'underscore',
    'backbone', 'spin','views/TrayListItemView',
    'text!templates/trayList.html'
],
    function ($, _, Backbone, Spinner,TrayListItemView, tplTrayList) {
        "use strict";

        return Backbone.View.extend({

            // The DOM Element associated with this view
            //el: "#leftMenuWrapper",
             tagName:"div",

            template: _.template(tplTrayList),


            initialize: function () {
                //_.bindAll(this, 'renderModel', 'render');
                this.collection.bind('reset change', this.render,this);

            },

            events: {
                'click #btnTrayBack':'gotoTrayIndex'
            },

            render: function(title){
              this.$el.html(this.template({data:this.collection.toJSON(),title:title}));
              return this;
            },

            gotoTrayIndex:function(){
                App.Views.trayView.render();
            }


        });
    }
);
