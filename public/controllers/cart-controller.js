(function(angular) {

	var app = angular.module('MyStore');

	// Inject in the ProductService
	app.controller('CartController', function($scope, CartService) {

		// Set the items on the scope to the items in the ProductService
		$scope.items = CartService.getItems();

		//Day 9
		$scope.getItemCount = CartService.getItemCount;
		$scope.addItem = CartService.addItem;			
		$scope.removeItem = CartService.removeItem;
		$scope.emptyCart = CartService.emptyCart;
		$scope.cartSubtotal = CartService.getCartSubtotal;
		$scope.cartTotal = function() {
			return CartService.getCartTotal();
		}
		$scope.checkout = function() {
			CartService.checkout();
		}


		/*$scope.addItem = function(item) {
		// Add the item using the ProductService
		CartService.addItem(item);
		};

		$scope.removeItem = function(item) {
		// Remove the item using the ProductService				
		CartService.removeItem(item);
		};

		$scope.cartSubtotal = function() {
		// Returns the cartSubtotal from the ProductService
		CartService.getCartSubtotal();
		};

		$scope.cartTotal = function() {
		// Returns the cartTotal from the ProductService
		CartService.getCartTotal();
		}*/

	});

})(window.angular);
