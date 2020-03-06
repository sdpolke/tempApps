define([
    'jquery',
    'underscore',
    'backbone', 'spin',
    'models/Page',
    'models/Section',
    'collections/Pages',
    'collections/Sections',
    'views/ProgressItemView',
    'text!templates/progressBar.html'

],
    function ($, _, Backbone, Spinner,Page,Section,Pages,Sections,ProgressItemView,tpl ) {
        "use strict";

        return Backbone.View.extend({

            // The DOM Element associated with this view
            el: "#bottomProgressBar",
            //tagName:"div",
            className: "wrap",
            //collection:App.Collections.Sections,
            template: _.template(tpl),

            // View constructor
            initialize: function () {

             this.model.bind("change", this.render, this);
            // console.log("Init >>>>> ");
            //this.collection.bind("change", this.render, this);
            //this.collection.bind("reset", this.render, this);
            //this.model.bind("reset", this.render, this);

            },

            // View Event Handlers
            events: {
                'click .completed div.badge':'gotoSection'
            },

            // Renders the view's template to the UI
            render: function () {
                 this.$el.empty();
                this.$el.attr({'class':''}).addClass('chapter'+App.Models.PageParam.get("selectedChapterId"));

                 this.$el.html(this.template({data:App.Models.appData.getSelectedChapter().sections.models}));

                return this;

            },
            gotoSection:function(e){
                //alert("go to setcion")
                var gotoHash = 'chapter-'+ App.Models.PageParam.get("selectedChapterId")+'/'+$(e.currentTarget).attr('data-action')+'/page-0';
                App.Router.navigate(gotoHash,true);
            }
        });
    }
);
