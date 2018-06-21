(function() {
	'use strict';

	angular
		.module('core')
		.controller('OrderStatusController', OrderStatusController);

	OrderStatusController.$inject = ['$scope', '$state', 'AuthenticationService', 'ORDER_STATUS', 'customerResolve', 'orderResolve'];

	function OrderStatusController($scope, $state, AuthenticationService, ORDER_STATUS, customerResolve, orderResolve) {

		console.log('customerResolve ' + JSON.stringify(customerResolve));
		console.log('orderResolve ' + JSON.stringify(orderResolve));

		if (!customerResolve || customerResolve.length == 0 || !orderResolve) {
			$state.go('not-found');
			return;
		}

		$scope.model = {
			customer: customerResolve[0]
		};
		$scope.orderDetails = orderResolve;

		var customerObjFromCookies = AuthenticationService.getCustomerCredentials();
		if (!customerObjFromCookies || customerObjFromCookies.id != $scope.model.customer.id) {
			$state.go('forbidden');
			return;
		}

		$scope.ui = {
			product: $scope.orderDetails.products.items[0]
		};

		$scope.orderAmountdetails = $scope.orderDetails.orderAmountdetails;


		$scope.getOrderStatus = function(status) {
			return _.find(ORDER_STATUS, ['id', status]).name;
		};

		$scope.getStausClass = function(status) {

			if (status <= $scope.orderDetails.orderStatus) {
				return 'item default-4  tablet-small-16 active';
			} else {
				return 'item default-4  tablet-small-16';
			}

		}
	}
}());