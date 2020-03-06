define([
    'jquery',
    'underscore',
    'backbone', 'spin',
    'text!templates/alertBox.html'
],
    function ($, _, Backbone, Spinner,tpl) {
        "use strict";

        return Backbone.View.extend({


            //el: "#modalBox",
            tagName:"div",

            template: _.template(tpl),

            // View Event Handlers
            events: {
               // 'click .btnClose': 'reRenderToParent'
            },

            // Renders the view's template to the UI
            render: function () {

                this.$el.attr('id', 'alertBox').html(this.template(this.model));
                return this;

            }


        });
    }
);
