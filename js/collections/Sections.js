define([
    'underscore',
    'backbone',
    'models/Section',
    'models/Page'
],
    function(_, Backbone,Section,Page) {
        "use strict";

        return Backbone.Collection.extend({
            model:Section,
            selectCurrentSection:function(sectionid){

            }, parse: function(data, options) {
                //console.log("Sections");
                //console.log(data);
               /* _.each(data,function(item){


                },this) ;*/

                return data;
            }





        })
    }
);