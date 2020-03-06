define([
    'jquery',
    'underscore',
    'backbone', 'spin',
    'models/PageNavigator',
    'text!templates/navNextBack.html'

],
    function ($, _, Backbone, Spinner,PageNavigator,tplNextBack ) {
        "use strict";

        return Backbone.View.extend({

            // The DOM Element associated with this view

            template: _.template(tplNextBack),

            // View constructor
            initialize: function () {
                this.model.bind("reset", this.render, this);
                //this.model.bind("change", this.render, this);


            },

            // View Event Handlers
            events: {
                 //'click #btnNext':'slideRight'
                //'click #btnBack':'slideRight'
            },

            // Renders the view's template to the UI
            render: function () {

                 this.$el.html(this.template(this.model));
                //this.template(this.model)
               // alert()
               /* console.log("-------------------------------------------");
                console.log("nextAction   : "+this.model.nextAction);
                console.log("preAction    : "+this.model.preAction);
                console.log("-------------------------------------------");
*/
                return this;

            },
            slideRight:function(ev){
                ev.preventDefault();
                //alert($(ev.currentTarget).find('a.pageNavigation').attr('href'));
                App.Views.pageView.model.set({"transition":"slideRight"});
                App.Router.navigate($(ev.currentTarget).find('a.pageNavigation').attr('href'),true);
            }
        });
    }
);
