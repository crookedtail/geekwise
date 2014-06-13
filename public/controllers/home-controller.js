(function(angular) {
	"use strict";

	var app = angular.module('MyStore');

	//Inject the $scope and 'ProductService' dependencies into the controller
	app.controller('HomeController', function($scope, ProductService) {

		//Initialize a 'featuredProducts' array literal on the $scope
		$scope.featuredProducts = new Array();

		//Loop through the results of the getProducts() method using angular.forEach():
		// Get the products from the product service
		ProductService.getFeaturedProducts()
		.then(
		function(response) {
			$scope.featuredProducts = response.data;
			//console.log(response.data);

			//Day 7
			// Add the resulting array of products to a local products variable
			/*var products = response.data;

			angular.forEach(products, function(product) {

			//Write an if statement to see if the 'isFeatured' property is true.
			if(product.isFeatured) {

			//When true, push the product to the $scope.featuredProducts array
			$scope.featuredProducts.push(product);
			}*/

		});

	});

})(window.angular);