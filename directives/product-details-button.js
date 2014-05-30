(function(angular) {

	var app = angular.module('MyStore');

	app.directive('msProductDetailsButton', function() {	

		return {
			scope: { //scope object
				//3 type of bindings for scope properties
				//@ string
				//& one-way binding, passing a function
				//= two-way binding
				myVar: '@productId' //product-id
			},
			//E for Element
			//A for attribute
			//C for Class    
			restrict: 'E',
			replace: true,
			templateUrl: 'templates/product-details-button.html',
			link: function(scope, elem, attrs) {
				
			}
		};
	});

})(window.angular);