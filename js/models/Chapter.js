/**
 * Chapter.js
 * Handles the details of a chapter.
 * 
 * Copyrights e-Zest Solutions Ltd.
 */

define([
    'backbone',
    'collections/Sections',
    'collections/Pages'
],
    function(Backbone,Sections,Pages) {
        "use strict";

        return Backbone.Model.extend({

            initialize:function(){
                //console.log("Chapter >>>>");
                //console.log(this);
                this.sections = new Sections();
                this.sections.url = "data/json/chapter-"+this.get("id")+".json";
               // alert(this.sections.url);
                this.sections.fetch() ;

               /* this.sections.fetch(function(section,index) {
                    console.log("section >>>> :::: ");
                    console.log(section);


                });*/
            },
            createSections: function(isDefaultLoad){
                this.sections = new Sections();
                this.sections.url = App.globalConst.DATA_URL + this.get("id")+ App.globalConst.DATA_FILE_TYPE;
                
                if(isDefaultLoad){
                    this.sections.fetch() ;
                }
                return this.sections;

            },
            defaults: {


            }
            //TODO remove junk code, never reached.
            
            //,
//            parse: function(data, options) {
//
//
//
//              var selectedSectionId =  App.Models.PageParam.get("selectedSectionId");
//              App.Collections.Pages = new Pages();
//                _.each(data[selectedSectionId].page,function(page){
//                   App.Collections.Pages.add(page);
//                },this) ;
//
//                return data;
//            }

        });
    }
);