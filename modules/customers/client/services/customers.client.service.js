// Customers service used to communicate Customers REST endpoints
(function() {
  'use strict';

  angular
    .module('customers')
    .factory('CustomersService', CustomersService);

  CustomersService.$inject = ['$resource'];

  function CustomersService($resource) {
    var customerService = $resource('/api/customers/:customerId', {
      customerId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getByid: {
        method: 'POST',
        isArray: true,
        url: '/api/customers/getbyid/'
      },
    });

    angular.extend(customerService, {
      requestCustomer: function(id) {
        return this.getByid(id);
      }
    });

    return customerService;
  }
}());