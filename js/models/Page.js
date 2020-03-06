define([
    'backbone',
    'AssociatedModel'
],
    function(Backbone,AssociatedModel) {
        "use strict";

        return Backbone.Model.extend({
            defaults: {

            }, isFirstPage: function(index) {
                return index == 0;
            },

            isLastPage: function(index) {
                return index >= App.Models.appData.getSelectedSection().pages.length - 1;
            }

        });
    }
);