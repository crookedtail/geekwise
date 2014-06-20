(function(angular) {
	"use strict";

	var app = angular.module('MyStore', ['ngCookies', 'ngMessages', 'ui.router']);

	app.value('config', {
		paypal: {
			merchantID: 'aaronaroberson@gmail'
		}
	});

})(window.angular);