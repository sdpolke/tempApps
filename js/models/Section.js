define([
    'backbone',
    'collections/Pages'
],
    function(Backbone,Pages) {
        "use strict";

        return Backbone.Model.extend({
            collection:Pages,
            initialize:function(){
                //console.log("Chapter >>>>");
                //console.log(this);
                this.pages = new Pages();
                _.each(this.get('page'),function(page){
                    //console.log(page);
                    this.pages.add(page);
                },this);




            },
            defaults: {


            },isFirstSection: function(index) {
                return (index == 0)
            },

            isLastSection: function(index) {
                return (index == ( App.Models.appData.getSelectedChapter().sections.length - 1))
            }
        });
    }
);