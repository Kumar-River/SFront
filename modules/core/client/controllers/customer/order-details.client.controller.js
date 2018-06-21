(function() {
	'use strict';

	angular
		.module('core')
		.controller('OrderDetailsController', OrderDetailsController);

	OrderDetailsController.$inject = ['$scope', '$state', '$window', 'Currency', 'MESSAGES', 'Notification', 'AuthenticationService', 'PRODUCTS', 'customerResolve', 'ordersResolve'];

	function OrderDetailsController($scope, $state, $window, Currency, MESSAGES, Notification, AuthenticationService, PRODUCTS, customerResolve, ordersResolve) {

		if (!customerResolve || customerResolve.length == 0) {
			$state.go('not-found');
			return;
		}

		var customerObjFromCookies = AuthenticationService.getCustomerCredentials();
		if (!customerObjFromCookies) {
			$state.go('forbidden');
			return;
		}

		if (customerResolve[0].id != customerObjFromCookies.id) {
			$state.go('forbidden');
			return;
		}

		$scope.model = {
			customer: customerResolve[0]
		};

		if (ordersResolve && ordersResolve.length > 0) {

			$state.go('orderstatus', {
				customerId: $scope.model.customer.id,
				orderId: ordersResolve[0]._id
			});

			return;
		}

		$scope.ui = {
			product: PRODUCTS.items[0]
		};

		var totalProductPrice = $scope.ui.product.price * $scope.model.customer.pcu_channel_count;
		var totalTax = $scope.ui.product.tax * $scope.model.customer.pcu_channel_count;
		var totalShippingCharge = $scope.ui.product.shippingcharge * $scope.model.customer.pcu_channel_count;

		$scope.orderAmountdetails = {
			currency: Currency,
			totalProductPrice: totalProductPrice,
			totalTax: totalTax,
			totalShippingCharge: totalShippingCharge,
			totalAmountToPay: totalProductPrice + totalTax + totalShippingCharge
		};

		$scope.onPaymentOptionsClicked = function() {
			$state.go('payment', {
				products: PRODUCTS,
				orderAmountdetails: $scope.orderAmountdetails
			});
			$window.scrollTo(0, 400);
		};
	}
}());