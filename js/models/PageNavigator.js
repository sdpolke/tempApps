define([
    'backbone',
    'models/Page',
    'models/Section'
],
    function(Backbone,Page,Section) {
        "use strict";

        return Backbone.Model.extend({
            defaults: {
               nextAction:"",
               preAction:""
            },initialize: function() {
                this.calculateNextPage();
                this.calculatePrePage();
            },calculateNextPage:function(){
                //chapter-1/section-0/page-0
                var chapterId =App.Models.PageParam.get("selectedChapterId");
                var sectionId =App.Models.PageParam.get("selectedSectionId");
                var pageId =App.Models.PageParam.get("selectedPageId");
                this.nextAction = "chapter-"+chapterId;
                if(chapterId == 0){
                    this.nextAction ="";
                }else if(App.Models.appData.getSelectedSection().isLastSection(sectionId) && App.Models.appData.getSelectedPage().isLastPage(pageId)){
                    this.nextAction = "";
                }else if(App.Models.appData.getSelectedPage().isLastPage(pageId)){
                    this.nextAction = this.nextAction+"/section-"+(parseInt(sectionId)+1)+"/page-"+0;
                }else{
                    this.nextAction = this.nextAction+"/section-"+sectionId+"/page-"+(parseInt(pageId)+1);
                }

            },calculatePrePage:function(){
                //chapter-1/section-0/page-0
                var chapterId =App.Models.PageParam.get("selectedChapterId");
                var sectionId =App.Models.PageParam.get("selectedSectionId");
                var pageId =App.Models.PageParam.get("selectedPageId");
                this.preAction = "chapter-"+chapterId;
                if(chapterId == 0){
                    this.preAction ="";
                }else if(App.Models.appData.getSelectedSection().isFirstSection(sectionId) && App.Models.appData.getSelectedPage().isFirstPage(pageId)){
                    this.preAction = "";
                }else if(App.Models.appData.getSelectedPage().isFirstPage(pageId)){
                    var preSection = parseInt(sectionId)-1;

                    // calculate
                    var perPageIndex = App.Models.appData.getSelectedChapter().sections.findWhere({id:preSection}).get('page').length-1;
                    this.preAction = this.preAction+"/section-"+preSection+"/page-"+perPageIndex;


                }else{
                    this.preAction = this.preAction+"/section-"+sectionId+"/page-"+(parseInt(pageId)-1);
                }

            }

        });
    }
);