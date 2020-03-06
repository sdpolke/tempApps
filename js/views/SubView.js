define([
    'jquery',
    'underscore',
    'backbone', 'spin',
    'models/Stub',
    'collections/Stubs'

],
    function ($, _, Backbone, Spinner,Stub,Stubs) {
        "use strict";

        return Backbone.View.extend({

            // The DOM Element associated with this view
             el: "#mainWrapper",

            // View constructor
            initialize: function () {


                this.model.bind("reset", this.render, this);


            },

            // View Event Handlers
            events: {

            },

            // Renders the view's template to the UI
            render: function () {

                return this;

            }
        });
    }
);
