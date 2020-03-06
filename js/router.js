/**
 * router.js
 *
 * Copyrights e-Zest Solutions Ltd.
 */

define([
    'jquery',
    'backbone',
    'models/Stub',
    'models/User',
    'models/Chapter',
    'models/Section',
    'models/AppData',
    'models/MenuItem',
    'collections/Stubs',
    'collections/Sections',
    'collections/Pages',
    'views/AppView',
    'views/TrayView',
    'views/PageView',
    'views/ModalPageView',
    'views/ProgressView',
    'views/ModalView'
],
    function ($, Backbone, Stub, User, Chapter, Section, AppData, MenuItem, Stubs, Sections, Pages, AppView, TrayView, PageView, ModalPageView, ProgressView, ModalView) {
        "use strict";

        return Backbone.Router.extend({

            initialize: function () {
                this.currentUrl = "";
                this.loadCustomRoutes();
                
                Backbone.history.start();
            },
            routes: {
            	"" : 'doUserAuthentication',
                'spinId-:spinId': 'doUserAuthentication',
                ':chapter-:chapterId': 'showPage',
                ':chapter-:chapterId/:section-:sectionId': 'showPage',
                ':chapter-:chapterId/:section-:sectionId/:page-:pageId': 'showPage',
                ':chapter-:chapterId/:section-:sectionId/:page-:pageId/:modal-:modalId': 'showPage',
//                ':chapter-:chapterId(/:section-:sectionId)(/:page-:pageId)(/:modal-:modalId)': 'showPage', //TODO Check why optional is not working!
//                ':chapter-:chapterId[/:section-:sectionId][/:page-:pageId][/:modal-:modalId]': 'showPage', //TODO Check why optional is not working!
                '*actions': 'doUserAuthentication' // Moved to cutom routes.
            },
            doUserAuthentication: function (spinId) {
                // This is a placeholder for adding authentication. the module is currently not developed.
            	// We can check the spinId to be null and operate on the same.
                //$('#modalBox').hide().html(alertView.render().$el).fadeIn('slow');
            	var firstPage = App.config.firstPage;
                this.showPage("chapter", firstPage.chapter, "section", firstPage.section, "page", firstPage.page, "modal", firstPage.modal, true);
            },
            showPage: function (chapter, chapterId, section, sectionId, page, pageId, modal, modalId, isUserAuth) {
                var self = this;
                this.loadDefaultData(chapter, chapterId, section, sectionId, page, pageId, modal, modalId);
                if (typeof App.Views.appView == 'undefined' ) {
//                    App.Models.appData = new AppData();
//                    App.Models.appData.fetch().then(function () {

                	// Now that router instantiates only after loading AppData, new instance would not be rquired.
                    var sections = App.Models.appData.getSelectedChapter().createSections();
                    sections.fetch().then(function () {
                        App.Views.appView = new AppView({model:App.Models.appData});
                        $("#dummyWrapper").empty().attr('class','').hide().css({"left":0,"top":0});
                        App.Models.user.reSetUser();
                        self.loadPageView();
                    });
//                    });
                } else {
                    App.Models.user.reSetUser();
                    self.loadPageView();
                }


            },
            loadPageView: function () {
                var self = this;
                //TODO reduce the .get() and .set() calls to improve performance
                if (typeof App.Views.pageView == 'undefined') {


                    App.Views.pageView = new PageView({
                        model: App.Models.appData.getSelectedPage()
                    });
                    
                    App.Models.PageParam.set("lastUsedUrl", App.Models.PageParam.get("currentUrl"));
                    App.Views.pageView.render();
                    if(App.Models.PageParam.get("selectedChapterId") > 0){
                     self.loadProgressView();
                    }
                    //self.loadTrayView();
                } else {

                    if (App.Models.PageParam.get("selectedModalId") == -1) {

                        if (App.Models.PageParam.get("lastUsedUrl") === undefined || App.Models.PageParam.get("lastUsedUrl") != App.Models.PageParam.get("currentUrl")) {

                            self.loadPage(App.config.animatePages);
                            App.Models.PageParam.set("lastUsedUrl", App.Models.PageParam.get("currentUrl"));
                        }

                    } else {

                        //Check old page
                        if (App.Models.PageParam.get("lastUsedUrl") === undefined || App.Models.PageParam.get("lastUsedUrl") != App.Models.PageParam.get("currentUrl")) {
                            //self.loadPageView();
                            //self.loadProgressView();
                        	if (App.Models.PageParam.get("selectedModalId") === -1) {
                        		console.error("Issue: Retest scenario and fix: It caused recursion in modal views and it seem unlikely to exists in regular behaviour.");
                        	}
                        }
                    }
                }

                if (App.Models.PageParam.get("selectedModalId") != -1) {
                    self.loadModalPage(App.Models.PageParam.get("lastUsedUrl") !== App.Models.PageParam.get("currentUrl"));
                } else {
                    if ((App.Models.PageParam.get("selectedChapterId") == 0 && App.Models.PageParam.get("selectedPageId") == 0)){
                        $("#leftTrayWrapper").hide();
                        $("#menuHandle").hide();
                    }else{
                        $("#leftTrayWrapper").show();
                        $("#menuHandle").show();
                    }
if ((App.Models.PageParam.get("selectedChapterId") == 0 && App.Models.PageParam.get("selectedPageId") != 0) || (App.Models.PageParam.get("selectedChapterId") > 0 )) {
                    self.loadTrayView();
                   }
                }
                //alert('inside'); //TODO check and allow removal of animation
                if(App.config.animateTray &&
                		App.Models.PageParam.get("selectedChapterId")== App.config.firstPage.chapter && 
                		App.Models.PageParam.get("selectedSectionId")== App.config.firstPage.section && 
                		App.Models.PageParam.get("selectedPageId")== App.config.firstPage.page && 
                		App.Models.PageParam.get("initialTray")== "false") {
                    $("#menuHandle").delay(300).animate({left: 300},800).delay(200).animate({left: 0},800);
//                    Animation For the fist time leftTrayWrapper Santosh
                    $('#leftTrayWrapper').delay(300).animate({left: 0},800).delay(200).animate({left: -300},800);
                    App.Models.PageParam.set("initialTray","true");
                }
            },
            loadModalPage: function (modalNotChild) {
            	var currentPage;
            	if (modalNotChild) {
            		currentPage = App.Models.appData.getSelectedPage();
            	} else {
            		currentPage = App.Views.pageView.model;
            	}

                var modelPages = new Stubs();

                _.each(currentPage.get('modelPage'), function (modelPage) {
                    modelPages.add(modelPage);
                }, this)


                var currentModal = modelPages.findWhere({id: App.Models.PageParam.get("selectedModalId")});

//                this.modalPageView && this.modalPageView.off();
                
                //        Added below line    Modified By Yuvraj
                this.modalPageView = new ModalPageView({model: currentModal});
                if (typeof this.modalPageView == 'undefined') {
                	console.log(this.modalPageView);
                    this.modalPageView = new ModalPageView({model: currentModal});
                    this.modalPageView.render();
                } else {
                    this.modalPageView.render();
                }
                    this.modalPageView.$el.css({zIndex: 999999}).fadeIn('slow');
            },
            loadPage: function (pageAnimation) {
                var self = this, animate;
                
                /** Show animation only when the page animation is enabled */
                if (pageAnimation) {
	                var prePage = App.Views.pageView.model.toJSON(),
	                dummyWrapper = $("#dummyWrapper");
	                animate = self.getTransitionType(prePage.transition, function () {
	                	dummyWrapper.empty();
	                });
	                dummyWrapper
	                	.empty()
	                	.attr('class', '')
	                	.hide()
	                	.css({"left": 0, "top": 0})
	                	.html(App.Views.pageView.$el.html());
	                
	                var dummyWrapperClass = App.Views.pageView.$el.attr('class');
	                dummyWrapper.attr('class', dummyWrapperClass);
                }
                
                //This has to happen before we can show the dummy wrapper for animation.
                App.Views.pageView.model = App.Models.appData.getSelectedPage();
                App.Views.pageView.render();
                
                // Show and animate the dummywrapper.
                if (pageAnimation) {
	                dummyWrapper
	                	.show()
	                	.animate(animate.properties, animate.options);
                }
                
				if(App.Models.PageParam.get("selectedChapterId") > 0){
					self.loadProgressView();
				}

            },
            getTransitionType: function (transitionType, onCompleteFn) {
                var animate = new Object();
                var properties = new Object();
                var options = new Object();
                //animate.
              
                switch (transitionType) {
                    case "slideUp":
                        properties.top = "-770px";
                        options.duration = 700;
                        break;
                    case "slideLeft":
                        properties.left = "-1030px";
                        options.duration = 700;
                        break;
                    case "slideRight":
                        properties.left = "1030px";
                        options.duration = 700;
                        break;
                    default :
                        properties.left = "-1030px";
                        options.duration = 700;
                        break;
                }

                animate.properties = properties;
                animate.options = options;
                animate.options.complete = onCompleteFn;

                return animate;


            },
            loadDefaultData: function (chapter, chapterId, section, sectionId, page, pageId, modal, modalId) {
                var self = this;
                if (typeof App.Models.PageParam == 'undefined') {
                    App.Models.PageParam = new Stub();
                    App.Models.PageParam.set("initialTray","false");
                }
                App.Models.PageParam.set("lastSelectedChapterId", self.getDefaultValue(App.Models.PageParam.get("selectedChapterId"), 0));
                App.Models.PageParam.set("lastSelectedSectionId", self.getDefaultValue(App.Models.PageParam.get("selectedSectionId"), 0));
                App.Models.PageParam.set("lastSelectedPageId", self.getDefaultValue(App.Models.PageParam.get("selectedPageId"), 0));

                App.Models.PageParam.set("selectedChapterId", self.getDefaultValue(chapterId, 0));
                App.Models.PageParam.set("selectedSectionId", self.getDefaultValue(sectionId, 0));
                App.Models.PageParam.set("selectedPageId", self.getDefaultValue(pageId, 0));
                App.Models.PageParam.set("selectedModalId", self.getDefaultValue(modalId, -1));
                
                //TODO check why not use variables for holding the chapter and section identifiers.
                App.Models.PageParam.set("currentUrl", "chapter-" + chapterId + "/section-" + sectionId + "/page-" + pageId + "");
            },
            loadProgressView:function(){
               //alert('asdasd');
                //Check for different chapter
               // $("#bottomProgressBar").html('');
                //$("#bottomProgressBar").attr({'class':''}).addClass('chapter'+App.Models.PageParam.get("selectedChapterId"))
                if(App.Views.progressView === undefined){
                    App.Views.progressView = new ProgressView({model:App.Models.user});
                    App.Views.progressView.render();
                    //$("#bottomProgressBar").html(App.Views.progressView.render().el);
                    $("#bottomProgressBar").show().animate({bottom:0},500);
                }else{
                    //App.Views.progressView.collection.reset(App.Collections.Sections);
                    //$("#bottomProgressBar").html(App.Views.progressView.render().el);
                    App.Views.progressView.render();
                }


            },
            loadTrayView:function(){
                //alert('asdasd');
                //Check for different chapter
                //$("#leftTrayWrapper").html('');
                 //f()

                if(App.Views.trayView === undefined){
                    App.Views.trayView = new TrayView({model:App.Models.user.get('menuItems')});
                    App.Views.trayView.render()
                    //$("#leftTrayWrapper").html(App.Views.trayView.render().el);
                }else{
                   // App.Views.trayView.remove();
                   // App.Views.trayView = new TrayView({model:App.Models.user.get('menuItems')});
                     /*App.Views.trayView = new TrayView({model:App.Models.user.get('menuItems')});
                    $("#leftTrayWrapper").html(App.Views.trayView.render().el);*/
                    App.Views.trayView.render()
                }


            },
            getDefaultValue: function (value, defaultValue) {

                var result = defaultValue;

                if (typeof defaultValue !== 'undefined') {
                    result = defaultValue;
                } else {
                    result = 0;
                }

                if (typeof value !== 'undefined') {
                    result = value;
                }
                return parseInt(result, 10); //safe-guarding against octals
            },
            /**
			 * This method loads custom routes, if any, mentioned in the user config file.
			 */
            loadCustomRoutes : function() {
            	/** If new routes are mentioned */
            	var router = this,
            		customRoutes = App.Models.user.get('routes');
        		if (!$.isEmptyObject(customRoutes)) {
        			$.each(customRoutes, function(key, value) {
        				var navValue = value || navValue;
        				router.route(key, key, function() {
        					router.showPage.apply(router, navValue);
        				});
        			});
        		}
            }
        })
    });
