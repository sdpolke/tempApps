define([
    'underscore',
    'backbone',
    'models/Page'
],
    function(_, Backbone,Page) {
        "use strict";

        return Backbone.Collection.extend({
            model:Page

        })
    }
);