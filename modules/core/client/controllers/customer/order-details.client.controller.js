(function() {
	'use strict';

	angular
		.module('core')
		.controller('OrderDetailsController', OrderDetailsController);

	OrderDetailsController.$inject = ['$scope', '$state', '$window', 'MESSAGES', 'Notification', 'AuthenticationService', 'PRODUCTS'];

	function OrderDetailsController($scope, $state, $window, MESSAGES, Notification, AuthenticationService, PRODUCTS) {
		
		var customerObjFromCookies = AuthenticationService.getCustomerCredentials();

		if (!customerObjFromCookies) {
			$state.go('forbidden');
			return;
		}

		$scope.model = {
			customer: customerObjFromCookies
		};

		$scope.ui = {
			product: PRODUCTS.items[0]
		};

		var totalProductPrice = $scope.ui.product.price * $scope.model.customer.pcu_channel_count;
		var totalTax = $scope.ui.product.tax * $scope.model.customer.pcu_channel_count;
		var totalShippingCharge = $scope.ui.product.shippingcharge * $scope.model.customer.pcu_channel_count;

		$scope.orderdetails = {
			totalProductPrice: totalProductPrice,
			totalTax: totalTax,
			totalShippingCharge: totalShippingCharge,
			totalAmoutToPay: totalProductPrice + totalTax + totalShippingCharge
		};



		$scope.onPaymentOptionsClicked = function() {
			$state.go('payment');
		};
	}
}());