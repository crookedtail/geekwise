(function(angular) {
	"use strict";
	
	var app = angular.module('MyStore');
	
	app.factory('ProductService', function($http) {
			//Angular factories return service objects
			//Object literal
			return {
				getProduct: function (guid) {
					//return the promise
					return $http.get('/api/product/' + guid);
				},
				
				getProducts: function() {
					//Return the promise
					//return $http.get('assets/json/products.json');
					//Point to the api, which in routes is pointed to the mongoose model
					return $http.get('/api/products');
				},
				
				getFeaturedProducts: function() {
					//Return the promise
					return $http.get('/api/featured');
				},
				
				getProductFilters: function () {
					//Return the promise
					return $http.get('assets/json/product-filters.json');
				}
			};
			
	});
	
})(window.angular);