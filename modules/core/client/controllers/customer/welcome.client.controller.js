(function() {
	'use strict';

	angular
		.module('core')
		.controller('WelcomeController', WelcomeController);

	WelcomeController.$inject = ['$scope', '$state', '$window', 'customerId', 'CustomersService', 'MESSAGES', 'Notification', 'AuthenticationService', 'OrdersService'];

	function WelcomeController($scope, $state, $window, customerId, CustomersService, MESSAGES, Notification, AuthenticationService, OrdersService) {

		$scope.model = {
			customer: null
		};

		$scope.ui = {
			postalCode: null
		};

		CustomersService.requestCustomer({
			"id": customerId
		}).then(function(response) {
			console.log("response " + JSON.stringify(response));

			if (response.length > 0) {
				$scope.model.customer = response[0];
			} else {
				console.log("Customer not found.");
			}

		});

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