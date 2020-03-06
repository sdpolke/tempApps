/**
 * Chapters.js
 * Handles the details of the chapters the application.
 * 
 * Copyrights e-Zest Solutions Ltd.
 */

define([
    'underscore',
    'backbone',
    'models/Chapter'
],
    function(_, Backbone,Chapter) {
        "use strict";

        return Backbone.Collection.extend({
            model:Chapter

        })
    }
);