/**
 * User.js
 * Deals with the user specific configuration or users data.
 * 
 * Copyrights e-Zest Solutions Ltd.
 */

define([
    "backbone",
    "AssociatedModel",
    "models/Bookmark",
    "models/Note",
    "models/MenuItem",
    "collections/Bookmarks",
	"collections/Notes"
],
    function(Backbone, AssociatedModel, Bookmark, Note, MenuItem, Bookmarks, Notes) {
        "use strict";

        return Backbone.AssociatedModel.extend({
            url:"config/user.json",
            relations: [
				{
					type: Backbone.Many,//nature of the relation
					key: "notes", //attribute of Project
					collectionType:Notes //AssociatedModel for attribute key
				}, {
					type: Backbone.Many,//nature of the relation
					key: "menuItems", //attribute of Project
					relatedModel:MenuItem //AssociatedModel for attribute key
				}, {
					type: Backbone.Many,//nature of the relation
					key: "bookmarks", //attribute of Project
					collectionType:Bookmarks //AssociatedModel for attribute key
				}
            ],
            defaults: {
                id : "1",
                name : "",
                email : "",
                token : "",
                bookmarks : [],
                menuItems : [],
                notes : []
            },
            reSetUser :function (){
                var menuItem = this.get("menuItems").findWhere({chapter:App.Models.appData.getSelectedChapter().id}).toJSON();
                if(App.Models.PageParam.get("selectedSectionId") > menuItem.section) {
                    menuItem.section = App.Models.PageParam.get("selectedSectionId");
                    menuItem.page = App.Models.PageParam.get("selectedPageId");
                } else if(App.Models.PageParam.get("selectedSectionId") == menuItem.section){
                    if(App.Models.PageParam.get("selectedPageId") > menuItem.page) {
                        menuItem.page = App.Models.PageParam.get("selectedPageId");
                    }
                }

                menuItem.rank = this.statusCalculation();


                App.Models.user.get("menuItems").remove(menuItem);
                App.Models.user.get("menuItems").push(menuItem);
                App.Models.appData.loadDefaultProgress();
            },
            statusCalculation: function (){
                var total = App.Models.appData.getPageTotalCount();
                var enableCount = App.Models.appData.getEnablePageCount()+1;
                return  Math.round( (enableCount * 100 )/  total);

            }
        });
    })