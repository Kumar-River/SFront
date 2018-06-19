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

		var first_name = (customerObjFromCookies.first_name != null) ? customerObjFromCookies.first_name : '';
		var last_name = (customerObjFromCookies.last_name != null) ? customerObjFromCookies.last_name : '';
		var customerFullname = first_name + last_name;

		$scope.ui = {
			hasPaymentProcessing : false
		};

		$scope.payment = {
			'card': {
				'number': 4242424242424242,
				'cvc': 123,
				'exp_month': 12,
				'exp_year': 2018,
				'name': customerFullname
			},
			'email': customerObjFromCookies.email
		};

		$scope.model = {
			'order': {
				'userID': customerObjFromCookies.id,
				'fullName': customerFullname,
				'token': '',
				'email': customerObjFromCookies.email,
				'siteID': customerObjFromCookies.site_id,
				'noOfInverters': customerObjFromCookies.pcu_channel_count,
				'orderStatus': 0, //Todo
			}
		};

		$scope.onSubmitClicked = function() {

			$scope.ui.hasPaymentProcessing = true;

			stripe.card.createToken($scope.payment.card)
				.then(function(response) {
					$scope.model.order.token = response.id;

					OrdersService.save($scope.model.order, successCallback, errorCallback);

					function successCallback(res) {

						$scope.ui.hasPaymentProcessing = false;

						Notification.success({
							message: MESSAGES.SUCCESS_MSG_ORDER_PLACED,
							title: '<i class="glyphicon glyphicon-remove"></i> Success'
						});
					}

					function errorCallback(res) {

						$scope.ui.hasPaymentProcessing = false;

						Notification.error({
							message: res.data.message,
							title: '<i class="glyphicon glyphicon-remove"></i> Error'
						});
					}

				})
				.then(function(payment) {
					console.log('successfully submitted payment for ')					
				})
				.catch(function(err) {

					$scope.ui.hasPaymentProcessing = false;

					if (err.type && /^Stripe/.test(err.type)) {
						console.log('Stripe error: ', err.message)

						Notification.error({
							message: err.message,
							title: '<i class="glyphicon glyphicon-remove"></i> Error'
						});
					} else {
						console.log('Other error occurred, possibly with your API', err.message)

						Notification.error({
							message: err.message,
							title: '<i class="glyphicon glyphicon-remove"></i> Error'
						});
					}
				});



		};



	}
}());