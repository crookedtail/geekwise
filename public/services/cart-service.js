(function(angular) {
	"use strict";

	var app = angular.module('MyStore');

	app.factory('CartService', function($cookieStore, ProductService, config) {

		// Private items variable
		//var items = [];
		var items = {};

		// Angular factories return service objects
		var cart = {

			getItems: function() {
				var itemsCookie;
				// Returns items object
				if ( !items.length ) {
					itemsCookie = $cookieStore.get('items');
					if (itemsCookie) {
						angular.forEach(itemsCookie, function (item, key) {
							//console.log(item);
							ProductService.getProduct(key).then(function (response){
								var product = response.data;
								product.quantity = item;
								//console.log(product.quantity);
								items[product.guid] = product;
							});
						});
					}
				}
				return items;
			},

			addItem: function(item) {
				// Checks if item already exists
				// If it exists, updates the quantity
				// If it doesn't exist, adds quantity property with value of 1 then
				// pushes the item onto the items array
				//item.quantity = 1;
				//items.push(item);

				//DAY 9
				if ( !items[item.guid] ) {
					item.quantity = 1;
					items[item.guid] = item;
				} else {
					items[item.guid].quantity += 1;
				}

				cart.updateItemsCookie();
			},

			removeItem: function(guid) {
				// Removes an item from the items array
				// Can use angular.forEach(array, function(item, index) to splice
				delete items[guid];

				cart.updateItemsCookie();
			},

			emptyCart: function() {
				// Sets items array to empty array
				items = {};
				// Remove the items cookie
				$cookieStore.remove('items');
			},

			getItemCount: function() {
				// returns number of items, including item quantity
				var total = 0;
				angular.forEach(items, function(item) {
					//console.log(item);
					total += item.quantity;
				});
				return total;
			},

			getCartSubtotal: function() {
				// Return the item quantity times item price for each item in the array
				/*var total = 0;
				angular.forEach(items, function(item) {
				var qVal = parseInt(item.quantity);
				var q = isNaN(qVal) ? 0 : qVal;
				var p = parseFloat(item.isSpecial ? item.specialPrice : item.price);
				total += q * p;
				});*/

				var total = 0;
				angular.forEach(items, function(item) {
					console.log(item);
					var s = parseInt(item.quantity);
					//console.log(s);
					var q = isNaN(s) ? 0 : s;
					//console.log(q);
					var p = cart.getItemPrice(item);
					//console.log(p);
					total += q * p;
				});

				return total;
			},

			getCartTotal: function() {
				//TODO Return the cartSubtotal plus shipping and handling
				return cart.getCartSubtotal();
			},

			updateItemsCookie: function() {
				//DAY 11
				var itemsCookie = {};
				angular.forEach(items, function(item, key) {
					itemsCookie[key] = item.quantity;
				});
				$cookieStore.put('items', itemsCookie);
			},

			getItemPrice: function(item) {
				return parseFloat(item.isSpecial ? item.specialPrice : item.price);
			},

			checkout: function() {
				//Create form DOM element
				var form = $('<form></form>');

				var data = {
					business: config.paypal.merchantId,
					currency_code: 'USD',
					cmd: '_cart',
					upload: 1,
					charset: 'utf-8'
				};

				var counter = 0;

				angular.forEach(items, function(item, key) {
					counter += 1;
					data["item_number_" + counter] = item.id;
					data["item_name_" + counter] = item.title;
					data["quantity_" + counter] = item.quantity;
					data["amount_" + counter] = cart.getItemPrice(item);
				});

				form.attr("action", "https://www.paypal.com/cgi-bin/webscr");
				form.attr("method", "POST");
				form.attr("style", "display:none;");

				angular.forEach(data, function(value, name) {
					if (value != null) {
						var input = $("<input></input>").attr("type", "hidden").attr("name", name).val(value);
						form.append(input);
					}
				});

				$("body").append(form);

				// submit form
				form.submit();
				form.remove();
			}
		};

		return cart;

	});

})(window.angular);
