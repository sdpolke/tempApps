/**
 * main.js
 * Main file of the require script.
 * 
 * Copyrights e-Zest Solutions Ltd.
 */

(function() {
	"use strict";

	require.config({

		paths : {

			// Core Libraries
			jquery : 'libs/jquery-min',
			underscore : 'libs/underscore-min',
			backbone : 'libs/backbone-min',
			text : 'libs/text',
			AssociatedModel : "libs/backbone-associations.min",

			// libs
			spin : 'libs/spin',
			hammer : 'libs/jquery.hammer.min',
			reel : 'libs/jquery.reel',
			enscroll : 'libs/enscroll',
			pano2vr : 'libs/pano2vr_player',
			panoskin : 'libs/skin',
			touchSlider : "libs/jquery.touchslider.min",
			jPlayer : "libs/jquery.jplayer.min",
			jPlayerPlaylist : "libs/jplayer.playlist.min",
			swfobject : "libs/swfobject",

			// Application Folders
			"collections" : "collections",
			"models" : "models",
			"templates" : "templates",
			"views" : "views",
			"tincan": "libs/tincan-min",
			"googleae": "libs/google-analytics"
		},
		shim : {
			"jquery": {
				exports: "$"
			},
			"underscore" : {
				exports : "_"
			},
			"backbone" : {
				"deps" : [ "underscore", "jquery" ],
				"exports" : "Backbone"
			},
			"AssociatedModel" : {
				"deps" : [ "underscore", "jquery", "backbone" ]//,
				//"exports" : "associated"
			},
			"hammer" : [ "jquery" ],
			"reel" : [ "jquery" ],
			"enscroll" : [ "jquery" ],
			"touchSlider" : [ "jquery" ],
			"jPlayer" : [ "jquery" ],
			"jPlayerPlaylist" : [ "jquery", "jPlayer" ],
			"libs/jquery-ui-min" :[ "jquery" ],
			"libs/jquery-ui-touch": [ "libs/jquery-ui-min" ],
			"tincan": {
				"exports": "TinCan"
			}			
		}
	});

	// spinner till all other js/data gets loaded
	require([ 'jquery', 'spin' ], function($, Spinner) {
		var spinner = new Spinner().spin();
		$('#pageWrapper').html(spinner.el);
	});

	// global app
	window.App = {
		Models : {},
		Collections : {},
		Views : {},
		Router : {},
		Helper : {}
	};
	
	/**
	 * Bootstrap the application by fetching the config files first.
	 * It uses a different format of defining module and requirements cause
	 * some of the dependencies are dynamic and this format allows for loading
	 * dynamic dependencies.
	 */
	define(function(require) {
		
		var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		AppData = require('models/AppData'),
		AppRouter = require('router');

		//TODO Use $.promise here.. 
		var appData = App.Models.appData = new AppData();
		appData
			.fetch() // fetch framework.json
			.then(function() {
				App.Models.user
				.fetch() // fetch user.json
				.then(function() {
					var helpersList = [];
					// Fetch only when the application is modifiable.
					//TODO Code now no more fetched from here.
//                    if (App.config.liveEditing) {
//                    	helpersList[helpersList.length] = "liveModify";
//                    }
                    
                    // Fetch only when analytics is required.
                    if (App.config.analytics.enabled) {
                    	helpersList[helpersList.length] = App.globalConst.ANALYTICS_ENGINE_FILE_PREFIX + App.config.analytics.engine;
                    }
					
                    require(helpersList, function() {
                    	
                    	// Fetch the list of elements.
    					var appElements = App.Views.appElements = {};
    					var elementList = App.Models.user.get('appElementsList');
    					
    					elementList = elementList.map(function(element) {
    			    		return App.globalConst.ELEMENT_URL + element + "/"+ element;
    			    	});
    					
						// Fetch all the elements required by the application
						require(elementList, function() {
				    		
				    		elementList = Array.prototype.slice.call(arguments);
				    		
				    		$.each(elementList, function(i, element) {
				            	appElements[element.type] = element;
				            });
				    		
				    		appData.set({appDataLoaded: true});
	
				    		// config fetched and set, begin!
				    		App.Router = new AppRouter();
						});
                    });
				});
			});
	});
})();