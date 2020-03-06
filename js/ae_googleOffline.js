define([], function() {
	var analyticsConfig = App.config.analytics;
	var userId = (localStorage.getItem(analyticsConfig.key) || "THISISATESTUDID123456789");

	//	saveAnalytics('create', 'UA-51407965-1', { 'userId': userId });
	saveAnalytics('create', analyticsConfig.trackerId);
	// Set the user ID using signed-in user_id.
	saveAnalytics("set", "&uid", userId);
	saveAnalytics("set", "userId", userId);
	saveAnalytics("set", "custUserId", userId);
	saveAnalytics('send', 'pageview', { 'custUserId': userId, "dimension01": userId });

	App.Helper.analyticsEngine = {
		send: function(action, target, type) {
//			saveAnalytics("set", "&uid", userId);
			saveAnalytics('send', 'event', target.replace(/ /g, ""), 'clicked', { 'custUserId': userId, "dimension01": userId});
//			saveAnalytics('send', 'pageview', 'page path');
		}
	};
});

function saveAnalytics(data){
	return data;
}