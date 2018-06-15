(function() {
    'use strict';
    angular
        .module('core')
        .factory('AuthenticationService', AuthenticationService);


    AuthenticationService.$inject = ['$rootScope', '$cookies'];

    function AuthenticationService($rootScope, $cookies) {
        var service = {};
        service.setCustomerCredentials = setCustomerCredentials;
        service.getCustomerCredentials = getCustomerCredentials;
        service.clearCustomerCredentials = clearCustomerCredentials;

        return service;

        function setCustomerCredentials(customerObj) {

            var now = new Date();
            // this will set the expiration to 12 months
            var exp = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

            $cookies.putObject('customer', customerObj, {
                expires: exp,
                path: '/'
            });
        }

        function getCustomerCredentials() {
            return $cookies.getObject('customer');
        }

        function clearCustomerCredentials() {
            $cookies.remove('customer');
        }
    }

}).call(this);