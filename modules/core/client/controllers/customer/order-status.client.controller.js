(function() {
	'use strict';

	angular
		.module('core')
		.controller('OrderStatusController', OrderStatusController);

	OrderStatusController.$inject = ['$scope', '$state', 'AuthenticationService', 'ORDER_STATUS', 'OrdersService', 'ordersResolve'];

	function OrderStatusController($scope, $state, AuthenticationService, ORDER_STATUS, OrdersService, ordersResolve) {
		
		console.log('ordersResolve ' + JSON.stringify(ordersResolve));

		if (!ordersResolve || ordersResolve.length == 0) {
			$state.go('forbidden');
			return;
		}

		$scope.orderDetails = ordersResolve[0];

		$scope.model = {
			customer: $scope.orderDetails.customer
		};

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