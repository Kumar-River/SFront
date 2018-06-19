(function() {
	'use strict';

	angular
		.module('core')
		.controller('PaymentController', PaymentController);

	PaymentController.$inject = ['$scope', '$state', '$window', 'MESSAGES', 'Notification', 'AuthenticationService', 'stripe', 'PublishableKey', 'OrdersService'];

	function PaymentController($scope, $state, $window, MESSAGES, Notification, AuthenticationService, stripe, PublishableKey, OrdersService) {

		var customerObjFromCookies = AuthenticationService.getCustomerCredentials();

		if (!customerObjFromCookies) {
			$state.go('forbidden');
			return;
		}

		stripe.setPublishableKey(PublishableKey);

		$scope.payment = {
			'card': {
				'number': 4242424242424242,
				'cvc': 123,
				'exp_month': 12,
				'exp_year': 2018,
				'name': ''
			},
			'email': ''
		};

		/*var testCard = {
			'number': '4242424242424242',
			'cvc': '123',
			'exp_month': 12,
			'exp_year': 2018
		};*/


		


		$scope.onSubmitClicked = function() {

			//console.log('card '+JSON.stringify(stripe.card.validateCardNumber('4242-1111-1111-1111')));

			//console.log('onSubmitClicked ' + JSON.stringify($scope.payment));

			/*var token = stripe.card.createToken($scope.payment.card)
			.then(function(response) {
				console.log('token created for card ending in ', response.card.last4)
				var payment = angular.copy($scope.payment.card)
				payment.card = undefined
				payment.token = response.id

				console.log('token ' + JSON.stringify(payment));

				//return $http.post('https://yourserver.com/payments', payment)
			})
			.then(function(payment) {
				console.log('successfully submitted payment for ')
			})
			.catch(function(err) {
				if (err.type && /^Stripe/.test(err.type)) {
					console.log('Stripe error: ', err.message)
				} else {
					console.log('Other error occurred, possibly with your API', err.message)
				}
			});



			$scope.model = {
				'order':{
					'name': 'kumar',
					'token': token
				}
			};

			OrdersService.save($scope.model.order, successCallback, errorCallback);

			function successCallback(res) {
				
				console.log('order success '+res);
			}

			function errorCallback(res) {
				//vm.error = res.data.message;
				console.log('order error '+res.data.message);
			}*/

		};



	}
}());