(function() {
	'use strict';

	angular
		.module('core')
		.controller('PaymentController', PaymentController);

	PaymentController.$inject = ['$scope', '$state', '$window', 'MESSAGES', 'Notification', 'AuthenticationService', 'stripe', 'PublishableKey', 'OrdersService'];

	function PaymentController($scope, $state, $window, MESSAGES, Notification, AuthenticationService, stripe, PublishableKey, OrdersService) {

		var customerObjFromCookies = AuthenticationService.getCustomerCredentials();

		if (!customerObjFromCookies || !$state.params.orderAmountdetails) {
			$state.go('forbidden');
			return;
		}

		stripe.setPublishableKey(PublishableKey);

		var first_name = (customerObjFromCookies.first_name != null) ? customerObjFromCookies.first_name : '';
		var last_name = (customerObjFromCookies.last_name != null) ? customerObjFromCookies.last_name : '';
		var customerFullname = first_name + last_name;

		$scope.ui = {
			hasPaymentProcessing: false
		};

		$scope.payment = {
			'card': {
				'number': 4242424242424242,
				'cvc': null,
				'exp_month': null,
				'exp_year': null,
				'name': customerFullname
			}
		};

		$scope.model = {
			'order': {
				'userID': customerObjFromCookies.id,
				'customer': customerObjFromCookies,
				'stripeToken': '',
				'email': customerObjFromCookies.email,
				'siteID': customerObjFromCookies.site_id,
				'noOfInverters': customerObjFromCookies.pcu_channel_count,
				'orderAmountdetails': $state.params.orderAmountdetails,
				'orderStatus': 0, //Todo
			}
		};

		$scope.onSubmitClicked = function(form) {

			if (form.$invalid)
				return;

			$scope.ui.hasPaymentProcessing = true;

			stripe.card.createToken($scope.payment.card)
				.then(function(response) {
					$scope.model.order.stripeToken = response.id;

					OrdersService.save($scope.model.order, successCallback, errorCallback);

					function successCallback(res) {

						$scope.ui.hasPaymentProcessing = false;

						$state.go('orderstatus');

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
				.catch(function(err) {

					$scope.ui.hasPaymentProcessing = false;

					if (err.type && /^Stripe/.test(err.type)) {
						console.log('Stripe error: ', err.message)

						Notification.error({
							message: err.message,
							title: '<i class="glyphicon glyphicon-remove"></i> Error'
						});
					} else {
						Notification.error({
							message: err.message,
							title: '<i class="glyphicon glyphicon-remove"></i> Error'
						});
					}
				});



		};



	}
}());