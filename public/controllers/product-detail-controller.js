(function(angular) {
	"use strict";

	var app = angular.module('MyStore');

	app.controller('ProductDetail', function($scope, $stateParams, ProductService) {

		// Set the id from the $stateParams to a local product_guid variable
		var product_guid = $stateParams.id;
		//console.log(product_guid);

		//Add a featuredProducts model to the $scope and initialize it as an array literal
		$scope.featuredProducts = [];

		// Get a product from the product service
		ProductService.getProduct(product_guid)
		.then
		(function(response) {
			// Initialize an empty product variable on the scope
			$scope.product = response.data;
		});
		//console.log(product);

		// Get the products from the product service
		ProductService.getProducts()
		.then
		(function(response) {

			var products = response.data;

			// Loop through the products array using Angular's built-in forEach function
			angular.forEach(products, function(product) {

				// Check if the current product's guid property is equal to id from the URL
				if(product.guid !== product_guid && product.isFeatured) {

					//add the featured product to the featured products array
					$scope.featuredProducts.push(product);
				}

			});  

		});

	});

})(window.angular);