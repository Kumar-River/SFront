(function() {
	'use strict';

	angular
		.module('core')
		.controller('WelcomeController', WelcomeController);

	WelcomeController.$inject = ['customerId', 'CustomersService'];

	function WelcomeController(customerId, CustomersService) {
		var vm = this;

		CustomersService.requestCustomer({
			"id": customerId
		}).then(function(response) {
			console.log("response " + JSON.stringify(response));
		});

		console.log("WelcomeController " + customerId);


	}
}());