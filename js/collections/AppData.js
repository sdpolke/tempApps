define([
    'underscore',
    'backbone',
    'models/AppData'
],
    function(_, Backbone,AppData) {
        "use strict";

        return Backbone.Collection.extend({
            url:'config/framework.json',
            model:AppData

        })
    }
);