(function() {
	'use strict';

	angular
		.module('core')
		.controller('WelcomeController', WelcomeController);
	
	WelcomeController.$inject = ['$scope', 'customerId', 'CustomersService'];

	function WelcomeController($scope, customerId, CustomersService) {
		var vm = this;

		$scope.model = {
			customer:null
		};

		CustomersService.requestCustomer({
			"id": customerId
		}).then(function(response) {
			console.log("response " + JSON.stringify(response));

			if (response.length > 0) {
				$scope.model.customer = response[0];
			}
			else {
				console.log("Customer not found.");
			}

		});

		console.log("WelcomeController " + customerId);


	}
}());