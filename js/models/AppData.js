/**
 * AppData.js
 * Loads the application configuration. and uses User model to load the user configuration.
 * 
 * Copyrights e-Zest Solutions Ltd.
 */
define([
	"underscore",
	"backbone",
	"models/Stub",
	"models/Chapter",
	"models/User",
	"models/Bookmark",
    "models/Note",
	"collections/Stubs",
	"collections/Chapters",
	"collections/AppData",
	"collections/Bookmarks",
	"collections/Notes"
],
	function (_, Backbone, Stub, Chapter, User, Bookmark, Note, StubCollection, Chapters, AppData, Bookmarks, Notes) {
		"use strict";

		return Backbone.Model.extend({
			initialize: function (attributes, options) {
				var chapters = this.chapters = new Chapters();
				var user = App.Models.user = new User();
				App.Models.user.parse = function (data, options) {
					for (var i = 0; i < data.chapterCount; i++) {
						// Get the count of chapters, loop, create models and load chapter configs.
						chapters.add({id: i});
					}
					
					if (data.bookmarksConfig) {
						var bookmarksPrefix = data.bookmarksConfig.prefix;
						var bookmarksArray = App.Models.appData.getLocalData(bookmarksPrefix, Bookmark);
						this.bookmarks = App.Collections.bookmarks = new Bookmarks(bookmarksArray);
						//user.set({"bookmarks": this.bookmarks}); //TODO Associated model??
					}
					
					if (data.notesConfig) {
						var notesPrefix = data.notesConfig.prefix;
						var notesArray = App.Models.appData.getLocalData(notesPrefix, Note);
						this.notes = App.Collections.notes = new Notes(notesArray);
						//user.set({"notes": this.notes}); //TODO Associated model??
					}
					
					return data;
				};
			},
			url: "config/framework.json",
			parse: function (data, options) {
				// Export the application level constants for easy and speedy access.
				App.globalConst = data.globalConst;
				App.config = data.config;
				
				return data;
			},

			getSelectedChapter: function () {
				return this.chapters.findWhere({id: App.Models.PageParam.get("selectedChapterId")});

			},

			getSelectedSection: function () {
				//console.log(this.getSelectedChapter())
				return this.getSelectedChapter().sections.findWhere({id: App.Models.PageParam.get("selectedSectionId")});

			},
			getSelectedPage: function () {
				//console.log(this.getSelectedSection())
				return this.getSelectedSection().pages.findWhere({id: App.Models.PageParam.get("selectedPageId")});
			},
			loadDefaultProgress: function () {

				var menuItem = App.Models.user.get("menuItems").findWhere({chapter: this.getSelectedChapter().id});
				this.getSelectedChapter().sections.each(function (section) {

					if (section.id < menuItem.get("section")) {
						section.status = "completed";
						_.each(section.pages.models, function (page) {
							page.set({"enable": true});
						});


					} else if (section.id == menuItem.get("section")) {
						section.status = "inProgress";
						_.each(section.pages.models, function (page) {
							if (page.get("id") <= menuItem.get("page")) {
								page.set({"enable": true});
							}

						});

					}
				});
			},

			getPageTotalCount: function () {
				var total = 0;
				this.getSelectedChapter().sections.each(function (section) {
					total = total + section.pages.length;
				});
				return total;
			},

			getEnablePageCount: function () {
				var total = 0;
				this.getSelectedChapter().sections.each(function (section) {
					total = total + section.pages.where({"enable": true}).length;
				});
				return total;
			},
			
			getLocalData: function(itemKey, Type) {
				var list = new Array(),
				key, item;
				for (var i = 0; i < localStorage.length; i++) {
					key = localStorage.key(i);
					if (key.indexOf(itemKey) === 0) {
						item = localStorage.getItem(key);
						list.push(new Type($.parseJSON(item)));
					}
				}
				return list;
			}
		});
	}
);
