define(["googleae"], function() {
	var analyticsConfig = App.config.analytics;
	var userId = (localStorage.getItem(analyticsConfig.key) || "THISISATESTUDID123456789");

	//	ga('create', 'UA-51407965-1', { 'userId': userId });
	ga('create', analyticsConfig.trackerId);
	// Set the user ID using signed-in user_id.
	ga("set", "&uid", userId);
	ga("set", "userId", userId);
	ga("set", "custUserId", userId);
	ga('send', 'pageview', { 'custUserId': userId, "dimension01": userId });

	App.Helper.analyticsEngine = {
		send: function(action, target, type) {
//			ga("set", "&uid", userId);
			ga('send', 'event', target.replace(/ /g, ""), 'clicked', { 'custUserId': userId, "dimension01": userId});
//			ga('send', 'pageview', 'page path');
		}
	};
});