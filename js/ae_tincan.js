define([ "tincan" ], function() {
	var analyticsConfig = App.config.analytics;
	var userId = (localStorage.getItem(analyticsConfig.key) || "THISISATESTUDID123456789") + "@local.host";
	var verbs = {
		"clicked" : "http://adlnet.gov/expapi/verbs/attempted",
		"visited" : "http://adlnet.gov/expapi/verbs/experienced"
	};
	
	var tincan = new TinCan({
		recordStores : [ {
			endpoint : "https://cloud.scorm.com/tc/AX4DOV1HE4/",
//			username : "nikhil.wanpal@e-zest.in",
//			password : "SCORMTABit3"
//			username : "byl9l4yQxRyIppRUg94",
//			password : "YWLrNmq7FzgYFYM5n3U"
			username : analyticsConfig.userid,
			password : analyticsConfig.pwd
		} ]
	});
	
	App.Helper.analyticsEngine = {
		send: function(action, target, type) {
			tincan.sendStatement({
				actor : {
					mbox : userId
				},
				verb : {
					id : verbs[action]
				},
				target : {
					id : analyticsConfig.makeURL+target.replace(/ /g, "")
				}
			});
		}
	};

});