(function() {
	'use strict';
	angular
		.module('core', [])
		.constant('PublishableKey', 'pk_test_6vQYkVyIW2IzRywcnLh5KMlI')//Development
		.constant('Currency', 'usd')
		.constant('MESSAGES', {
			'SUCCESS_MSG_ZIP_CODE': 'Postal code verified.',
			'SUCCESS_MSG_ORDER_PLACED': 'Order place successfully.',
			'ERR_MSG_ZIP_CODE': 'Postal code is not correct.',
			'SUCCESS_MSG_UPDATE_ORDER': 'Order update successfully.'
		})
		.constant('PRODUCTS', {
			"items": [{
				"id": 1234,
				"name": "Microinverters, Envoy & Accessories",
				"price": 50.00,
				"imageURL": "https://enphase.com/sites/default/files/01-18-english-na-IQ7X-microinverter-600x484.jpg",
				"description": "Enphase IQ6 MicroTM, compatible with 60-cell PV modules, 240 VA peak power, MC4 DC connector, female AC connector",
				"tax": 5,
				"shippingcharge": 10
			}]
		})
		.constant('ORDER_STATUS', [{
            id: 0,
            name: "Order Placed"
        }, {
            id: 1,
            name: "Confirmed"
        }, {
            id: 2,
            name: "Shipped"
        }, {
            id: 3,
            name: "Installed"
        }])
}).call(this);