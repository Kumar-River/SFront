(function() {
	'use strict';

	angular
		.module('core')
		.controller('PaymentController', PaymentController);

	PaymentController.$inject = ['$scope', '$state', '$window', 'MESSAGES', 'Notification', 'AuthenticationService'];

	function PaymentController($scope, $state, $window, MESSAGES, Notification, AuthenticationService) {

		var customerObjFromCookies = AuthenticationService.getCustomerCredentials();

		if (!customerObjFromCookies) {
			$state.go('forbidden');
			return;
		}


	}
}());