define([
    'jquery',
    'underscore',
    'backbone', 'spin',
    'views/PageView'
],
    function ($, _, Backbone, Spinner,PageView) {
        "use strict";

        return PageView.extend({


            el: "#modalBox",

            // View Event Handlers
            events: {
                'click .btnClose': 'reRenderToParent',
                'click #btnNoteModal': 'showHideNoteBox',
                'click #btnBookmarkModal': 'handleModalBookmark',
                "click #notesDelete": "deleteNote",
                "click #notesClose": "showHideNoteBox"
            },

            // Renders the view's template to the UI
            render: function () {
                var chapterID = App.Models.PageParam.get("selectedChapterId");
                var sectionID = App.Models.PageParam.get("selectedSectionId") ;
                var pageID = App.Models.PageParam.get("selectedPageId");

                var pageClass = 'chapter'+chapterID+'-section'+sectionID+'-page'+pageID;

                this.$el.html('').attr('class','').addClass(pageClass).hide();

                this.renderPage(this.model.get('element'));
                
                //TODO check if notes and bookmarks are enabled
                $('#btnNoteModal, #btnBookmarkModal').removeClass('selected');
                
                if (App.Views.pageView.bookmarkExists()) {
                	$('#btnBookmarkModal', this.$el).addClass('selected');
                }
                
                var pageNote = App.Views.pageView.retrieveNote();
                if (pageNote) {
                	//TODO Retrieve note and update content.
                	$('#btnNoteModal', this.$el).addClass('active');
                	$("#noteArea", this.$el).val(pageNote.title);
                	$("#notesTitle", this.$el).val(pageNote.text);
                }
                
                var modalView = this;
                $("#noteArea, #notesTitle", this.$el).bind('keyup',function(e){
                	App.Views.pageView.handleNotes(e, modalView.$el);
                });
                
                if (App.config.analytics.enabled) {
                	App.Helper.analyticsEngine.send("visited", this.model.get("name"), "event");
                }
                
                return this;

            },

            reRenderToParent: function (ev) {
                ev.preventDefault();
                var chapterID = App.Models.PageParam.get("selectedChapterId");
                var sectionID = App.Models.PageParam.get("selectedSectionId") ;
                var pageID = App.Models.PageParam.get("selectedPageId");
                this.$el.unbind().fadeOut('slow').children().remove();
//                this.remove();
//                this.$el.unbind(".mymodal");
                this.unbind();
                // TODO What should it be? Back should ideally mean return to previous.
                // With the enhancement that modal view can be opened from anywhere, 
                // return to 'back' makes more sense.
//                App.Router.navigate("chapter-"+chapterID+"/section-"+sectionID+"/page-"+pageID,true);
                window.history.back();

            },
            handleModalBookmark: function(e) {
            	e.preventDefault();
            	App.Views.pageView.handleBookmark(e, this.$el);
            },
//            handleModalNotes: function(e) {
//            	e.preventDefault();
//            	App.Views.pageView.handleNotes(e, this.$el);
//            },
            showHideNoteBox : function(e) {
				e.preventDefault();
				var noteBox = $('#noteBox', this.$el),
					noteBtn = $('#btnNoteModal', this.$el);

				if (noteBox.is(":visible")) {
					$(e.currentTarget).removeClass('selected');
					noteBtn.removeClass('selected');
					noteBox.hide();
				} else {
					$(e.currentTarget).addClass('selected');
					noteBtn.addClass('selected');
					noteBox.show();
				}
			},
			deleteNote: function(e) {
				e.preventDefault();
            	App.Views.pageView.deleteNote(e, this.$el);
			},
				
            off: function() {
            	this.$el.off();
            	this.$el.unbind();
// this.$el.remove();
            },
            addBookmark:function(e){ //TODO remove
                e.preventDefault();
                //alert("boobkmark")
                if($(e.currentTarget).hasClass('selected')){
                    $(e.currentTarget).removeClass('selected');
                    $('#btnBookmarkModal').removeClass('selected');
                }else{
                    $('#btnBookmarkModal').removeClass('selected');
                    $(e.currentTarget).addClass('selected');
                }
            }


        });
    }
);
