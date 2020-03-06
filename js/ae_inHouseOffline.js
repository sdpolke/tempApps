define([], function() {
	var analyticsConfig = App.config.analytics;
	var userId = (localStorage.getItem(analyticsConfig.key) || "THISISATESTUDID123456789");
	
	var tabitAEData = {
		tid: analyticsConfig.trackerId,
		ua: navigator.userAgent,
		time: +(new Date()),
		uid: userId,
		sr: screen.width+'x'+screen.height,
		vp: Math.max(document.documentElement.clientWidth, window.innerWidth || 0) + "x" + Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
		de: window.document.characterSet,
		dl: window.location.href,
		dt: window.document.title,
		events: []
	};
	
	function createEvent(type, target, event) {
		tabitAEData.events[tabitAEData.events.length] = {
				time: +(new Date()),
				sr: screen.width+'x'+screen.height,
				vp: Math.max(document.documentElement.clientWidth, window.innerWidth || 0) + "x" + Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
				dl: window.location.href,
				dt: window.document.title,
				ec: target,
				ea: event,
				t: type
			};
	}
	
	createEvent("pageview");
	
	localStorage.setItem(analyticsConfig.localStorageId, JSON.stringify(tabitAEData));

	App.Helper.analyticsEngine = {
		send: function(action, target, type) {
			createEvent('event', target.replace(/ /g, ""), 'clicked');
			localStorage.setItem(analyticsConfig.localStorageId, JSON.stringify(tabitAEData));
		}
	};
});