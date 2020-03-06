define([
    'jquery',
    'underscore',
    'backbone', 'spin',
    'models/Page',
    'models/Section',
    'collections/Pages',
    'collections/Sections',
    'text!templates/navNextBack.html'
],
    function ($, _, Backbone, Spinner,Page,Section,Pages,Sections,tpl ) {
        "use strict";

        return Backbone.View.extend({

            // The DOM Element associated with this view
            tagName: "li",
            template: _.template(tpl),

            // View constructor
            initialize: function () {
                this.model.bind("reset", this.render, this);
                //this.model.bind("change", this.render, this);

            },

            // View Event Handlers
            events: {
            },

            // Renders the view's template to the UI
            render: function () {

                this.$el.html(this.template(this.model));

                return this;

            }
        });
    }
);
