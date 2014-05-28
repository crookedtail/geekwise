(function(angular) {
	"use strict";
	
	var app = angular.module('MyStore');
	
	app.factory('ProductService', function($http) {
			//Angular factories return service objects
			return {
				//Object literal
				getProducts: function() {
					
					return $http.get('assets/json/products.json');
				},
				
				getProductFilters: function () {
					//Return the promise
					return $http.get('assets/json/product-filters.json');
				}
			};
			
	});
	
})(window.angular);