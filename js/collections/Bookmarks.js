define([
    'underscore',
    'backbone',
    'models/Bookmark'
],
    function(_, Backbone,Bookmark) {
        "use strict";

        return Backbone.Collection.extend({
            model:Bookmark

        })
    }
);