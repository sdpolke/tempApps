define([
    'underscore',
    'backbone',
    'models/Note'
],
    function(_, Backbone,Note) {
        "use strict";

        return Backbone.Collection.extend({
            model:Note

        })
    }
);