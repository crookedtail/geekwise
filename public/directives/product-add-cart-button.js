(function(angular) {

	var app = angular.module('MyStore');

	app.directive('msProductAddCartButton', function(CartService) {	

		return {
			scope: { //scope object
				//3 type of bindings for scope properties
				//@ string
				//& one-way binding, passing a function
				//= two-way binding
				product: '=' //product-id
			},
			//E for Element
			//A for attribute
			//C for Class    
			restrict: 'E',
			replace: true,
			templateUrl: 'templates/product-add-cart-button.html',
			link: function(scope, elem, attr) {
				
				scope.addItem = CartService.addItem;
				
			}
		};
	});

})(window.angular);