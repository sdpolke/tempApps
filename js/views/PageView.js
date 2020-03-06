define(["jquery",
	"underscore",
	"backbone",
	"views/NavigatorView",
	"models/PageNavigator",
	"models/AppData",
	"models/User",
	"models/Bookmark",
	"models/Note"
],
	function($, _, Backbone, NavigatorView, PageNavigator, AppData, User, Bookmark, Note) {
        
//define(function (require) {
//	"use strict";
//	
//	var $ = require("jquery"),
//		_ = require("underscore"),
//		Backbone = require("backbone"),
//		NavigatorView = require("views/NavigatorView"),
//		PageNavigator = require("models/PageNavigator"),
//		AppData = require("models/AppData"),
//		User = require("models/User");

    	"use strict";
    
        return Backbone.View.extend({

            // The DOM Element associated with this view
            el: "#mainWrapper",

            // View constructor
            initialize: function () {
                this.model.bind("reset", this.render, this);
            },
            // View Event Handlers //TODO: add bookmark handling using events on pageview, possible? so that we also handle overlays?
            events: {

            },
            // Renders the view's template to the UI
            render: function () {
                $("#modalBox").hide();
                var chapterID = App.Models.PageParam.get("selectedChapterId");
                var sectionID = App.Models.PageParam.get("selectedSectionId") ;
                var pageID = App.Models.PageParam.get("selectedPageId");

                var pageClass = "chapter"+chapterID+"-section"+sectionID+"-page"+pageID;

                this.$el.html("").attr("class","").addClass(pageClass);

                $("#navWrapper").html("");
                var navigatorView = new NavigatorView({model:new PageNavigator()});
                $("#navWrapper").html(navigatorView.render().el);


                this.renderPage(this.model.get("element"));
                
                // Update window title if configured so
                if (App.config.updatePageTitles) {
                	$(document).attr("title", this.model.get("name")); 
                }
                
                if (App.config.analytics.enabled) {
                	App.Helper.analyticsEngine.send("visited", this.model.get("name"), "event");
                }
                
                return this;
            },
            renderPage : function(elements) {
                var that = this,
                	elementIdPrefix = App.Models.PageParam.get("currentUrl")+"/",
                	currModal = App.Models.PageParam.get("selectedModalId");
                    
                if (currModal !== -1) {
                	elementIdPrefix+= "modal-" + currModal +"/";
                }
                    
                _.each(elements, function(element,index){
                    that.renderElement(element,index, elementIdPrefix);
                });

            },
            renderElement : function(element, id, elementIdPrefix) {
                var templateHandler = App.Views.appElements[element.type];
                
                if (templateHandler) {
                	var wrapper = $("<div data-element=\""+ elementIdPrefix + id +"\">").appendTo(this.$el);
                	
                	templateHandler.render.call(wrapper, {element:element, id:id});
                } else {
                	this.$el.append("<div class='text-danger'> Element type : [ " + element.type + " ] not found.<div>");
                	throw new Error("CONFIG: Element used in page but not configured: " + element.type);
                }
            },
            handleBookmark: function(event, scope) {
            	event.stopPropagation();
            	scope = scope || $("#mainWrapper");
            	var prefix = App.Views.pageView.bookmarkPrefix = App.Views.pageView.bookmarkPrefix || App.Models.user.get("bookmarksConfig").prefix,
            		currentLocation = window.location.hash,
            		key = prefix + currentLocation,
            		bookmarkItem = App.Collections.bookmarks.findWhere({key: key});
                
                if (localStorage.getItem(key)) {
                	App.Collections.bookmarks.remove(bookmarkItem);
                	localStorage.removeItem(key);
                	
                	$(event.target).removeClass("selected");
                } else {
//					var bookmarkTitle = $(".titleElement h1").eq(0).html();
//					if (bookmarkTitle) {
//						bookmarkTitle = $(".infoElement h1").eq(0).html();
//					}
//					if (!bookmarkTitle) {
//						bookmarkTitle = $(".tabContent h1").eq(0).html(); //TODO What is this?
//					}
//					if (!bookmarkTitle){
//						bookmarkTitle = $("#sliderInfoElement0 h1").html(); //TODO What is this?
//					}
                	// Get the title of the element.
                	//TODO check for performance.
					var bookmarkTitle = $(".titleElement h1", scope).eq(0).html()
						|| $(".infoElement h1", scope).eq(0).html()
						|| $(".tabContent h1", scope).eq(0).html()
						|| $("#sliderInfoElement0 h1", scope).html();
                	
					var item = new Bookmark({
						name: $(event.target).attr('bookmark-name'), //mb removed 5/28/13 //TODO what?
						action: currentLocation ,
						key: key,
						//"title":$(event.target).attr('bookmark-name'), //mb removed 5/28/13 //TODO why?
						title: bookmarkTitle,
						text: $(event.target).attr('bookmark-name')
					});
					
					localStorage.setItem(item.get('key'), JSON.stringify(item));
					
					if(bookmarkItem === localStorage.getItem(item.get('key'))){
						App.Collections.bookmarks.add(item);
					} else {
						App.Collections.bookmarks.remove(bookmarkItem);
						App.Collections.bookmarks.add(item);
					}
					
//					if(App.TrayState == "true"){
//						//alert('inside true');
//						App.Views.trayMenuView.trayBookmarks();
//					} else{
//						App.Views.trayMenuView.render();
//					}
					
                	$(event.target).addClass("selected");
                }
            },
            bookmarkExists: function(key) {
            	var prefix, currentLocation;
            	if (!key) {
            		prefix = App.Views.pageView.bookmarkPrefix = App.Views.pageView.bookmarkPrefix || App.Models.user.get("bookmarksConfig").prefix,
            		currentLocation = window.location.hash,
            		key = prefix + currentLocation;
            	}
            	
            	return localStorage.getItem(key);
            },
            handleNotes: function(event, scope) {
            	scope = scope || $("#mainWrapper");
            	
            	var newText = $.trim($("#noteArea", scope).val());
                var newTitle = $.trim($("#notesTitle", scope).val());
                if(newTitle === "") {
                    if(newText.length > 10){
                        newTitle = newText.substring(0,10);
                    } else {
                        newTitle = newText;
                    }
                }
                
                var prefix = App.Views.pageView.notePrefix = App.Views.pageView.notePrefix || App.Models.user.get("notesConfig").prefix,
        		currentLocation = window.location.hash,
        		key = prefix + currentLocation,
        		noteItem = App.Collections.notes.findWhere({key: key});
                
                //TODO use scope
                $("#notesDelete", scope).addClass("selected");
                $("#btnNoteModal").addClass('active');
                
                var item = new Note({
                    name: $(event.target).attr('note-name'),
                    action: currentLocation,
                    key: key,
                    title: newTitle,
                    text: newText ,
                    date: new Date()
                });
            	//}, this); //TODO Why were options passed if not used in the constructor?
                
                //Remove invalid/blank note.
                if (newText = "") {
                	var noteItem = App.Collections.notes.findWhere({key: key});
                	
                	if(noteItem !== undefined) {
	                	App.Collections.notes.remove(noteItem);
	                	localStorage.removeItem(noteItem);
	                }
	                App.Collections.notes.remove(item);
	                localStorage.removeItem(key);
	                
//					if(App.TrayState == "true"){
//						//alert('inside true');
//						App.Views.trayMenuView.trayNotes();
//					} else{
//						App.Views.trayMenuView.render();
//					}
	                
	                //TODO use scope
	                $("#btnNoteModal", scope).removeClass('active');
                } else {
                	var noteItem = App.Collections.notes.findWhere({key: key});
                	if (noteItem === undefined) {
						// alert('inside if');
						App.Collections.notes.add(item);
					} else {
						App.Collections.notes.remove(noteItem);
						App.Collections.notes.add(item);
					}
                	
                	localStorage.setItem(key, JSON.stringify(item));
                	
//					if(App.TrayState == "true"){
//						//alert('inside true');
//						App.Views.trayMenuView.trayNotes();
//					} else{
//						App.Views.trayMenuView.render();
//					}
                }
            },
            deleteNote : function(event, scope) {
            	var prefix = App.Views.pageView.notePrefix = App.Views.pageView.notePrefix || App.Models.user.get("notesConfig").prefix,
        		currentLocation = window.location.hash,
        		key = prefix + currentLocation;

            	$("#notesDelete").removeClass("selected");
            	
				if (this.retrieveNote(key)) {
					var noteItem = App.Collections.notes.findWhere({key : key});
					App.Collections.notes.remove(noteItem);
					localStorage.removeItem(key);
					$("#notesTitle").val(""); //TODO test
					$("#noteArea").val("");
					$("#btnNoteModal").removeClass('active');

				}
			},
            retrieveNote: function(key) {
            	var prefix, currentLocation;
            	if (!key) {
            		prefix = App.Views.pageView.notePrefix = App.Views.pageView.notePrefix || App.Models.user.get("notesConfig").prefix,
            		currentLocation = window.location.hash,
            		key = prefix + currentLocation;
            	}
            	
            	return $.parseJSON(localStorage.getItem(key));
            }
        });
    }
);
