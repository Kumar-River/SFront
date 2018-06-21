(function() {
	'use strict';

	angular
		.module('core')
		.controller('WelcomeController', WelcomeController);

	WelcomeController.$inject = ['$scope', '$state', '$window', 'MESSAGES', 'Notification', 'AuthenticationService', 'customerResolve', 'ordersResolve'];

	function WelcomeController($scope, $state, $window, MESSAGES, Notification, AuthenticationService, customerResolve, ordersResolve) {

		$scope.model = {
			customer: null
		};

		$scope.ui = {
			postalCode: null
		};

		if (!customerResolve || customerResolve.length == 0) {
			//AuthenticationService.clearCustomerCredentials();
			return;
		}
		$scope.model.customer = customerResolve[0];

		if (ordersResolve && ordersResolve.length > 0) {

			AuthenticationService.setCustomerCredentials($scope.model.customer);

			$state.go('orderstatus', {
				customerId: $scope.model.customer.id,
				orderId: ordersResolve[0]._id
			});

			return;
		}

		console.log('customerzip '+$scope.model.customer.zip);

		$scope.validatePostalCode = function() {

			if (!$scope.ui.postalCode)
				return;

			if ($scope.ui.postalCode == $scope.model.customer.zip) {

				$state.go('confirmsystem', {
					customer: $scope.model.customer
				});
				$window.scrollTo(0, 400);

				Notification.success({
					message: MESSAGES.SUCCESS_MSG_ZIP_CODE,
					title: '<i class="glyphicon glyphicon-remove"></i> Success'
				});
			} else {
				Notification.error({
					message: MESSAGES.ERR_MSG_ZIP_CODE,
					title: '<i class="glyphicon glyphicon-remove"></i> Error'
				});
			}
		};

	}
}());