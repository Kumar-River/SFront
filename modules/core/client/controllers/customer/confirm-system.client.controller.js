(function() {
	'use strict';

	angular
		.module('core')
		.controller('ConfirmSystemController', ConfirmSystemController);

	ConfirmSystemController.$inject = ['$scope', '$state', '$window', 'MESSAGES', 'Notification', 'AuthenticationService'];

	function ConfirmSystemController($scope, $state, $window, MESSAGES, Notification, AuthenticationService) {
		var vm = this;

		$scope.model = {
			customer: $state.params.customer
		};

		$scope.onCorrectButtonClicked = function() {
			AuthenticationService.setCustomerCredentials($scope.model.customer);
			$state.go('orderdetails', {
				customerId: $scope.model.customer.id
			});
			$window.scrollTo(0, 400);
		};
	}
}());