(function(angular) {

	var app = angular.module('MyStore');

	app.config(function($stateProvider, $urlRouterProvider) {

		//set up routes
		$urlRouterProvider.otherwise('/'); //generic catchall
		
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'views/home.html'
			})
			.state('products', {
				url: '/products',
				controller: 'ProductList',
				templateUrl: 'views/product-list.html'
			})
			.state('about', {
				url: '/about',
				templateUrl: 'views/about.html'
			})
			.state('contact', {
				url: '/contact',
				templateUrl: 'views/contact.html'
			});
		
	});

})(window.angular);