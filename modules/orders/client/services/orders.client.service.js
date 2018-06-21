// Orders service used to communicate Orders REST endpoints
(function() {
  'use strict';

  angular
    .module('orders')
    .factory('OrdersService', OrdersService);

  OrdersService.$inject = ['$resource'];

  function OrdersService($resource) {
    var orderService =  $resource('/api/orders/:orderId', {
      orderId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getOrderByCustomerId: {
        method: 'POST',
        isArray: true,
        url: '/api/orders/getbycustomerid/'
      },
    });

    angular.extend(orderService, {
      requestOrderByCustomerId: function(id) {
        return this.getOrderByCustomerId(id);
      }
    });

    return orderService;
  }
}());