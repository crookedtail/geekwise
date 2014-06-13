(function(angular) {
	"use strict";

	var app = angular.module('MyStore');

	app.controller('ProductDetail', function($scope, $stateParams, ProductService) {

		// Set the id from the $stateParams to a local product_guid variable
		var product_guid = $stateParams.id;
		//console.log(product_guid);

		//NEED TO REWRITE USING THE FEATUREDPRODS MODEL
		//Add a featuredProducts model to the $scope and initialize it as an array literal
		$scope.featuredProducts = new Array();

		// Initialize an empty product variable on the scope
		$scope.product;

		// Get the products from the product service
		ProductService.getProducts()
		.then
		(function(response) {

			// Add the resulting array of products to a local products variable
			var products = response.data;
			//console.log(products);

			// Loop through the products array using Angular's built-in forEach function
			angular.forEach(products, function(product) {

				// Check if the current product's guid property is equal to id from the URL
				if(product.guid === product_guid) {

					// We've found a match, add the matching product to the $scope
					$scope.product = product;
					
				} else if (product.isFeatured) {
					//Add the featured product to the featuredProducts array
					$scope.featuredProducts.push(product);
				}

			});

		});

	});

})(window.angular);