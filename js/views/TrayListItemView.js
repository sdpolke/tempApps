define([
    'jquery',
    'underscore',
    'backbone', 'spin',
    'text!templates/trayListItem.html'
],
    function ($, _, Backbone, Spinner, tplTrayListItem) {
        "use strict";

        return Backbone.View.extend({


            tagName: "li",
            template: _.template(tplTrayListItem),

            initialize: function () {

                this.model.on("change", this.render, this);
               // this.model.on("remove", this.remove, this);
                // Calls the view's render method
                this.render();


            },


            events: {


            },


            render: function () {
               console.log("TrayListItem is rendering");
               this.$el.html(this.template(this.model.toJSON()));
               return this;

            }

        });
    }
);
