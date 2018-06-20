(function () {
  'use strict';

  angular
    .module('core.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

      if (hasTrailingSlash) {
        // if last character is a slash, return the same url without the slash
        var newPath = path.substr(0, path.length - 1);
        $location.replace().path(newPath);
      }
    });

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    $stateProvider
      .state('adminLogin', {
        url: '/',
        templateUrl: '/modules/core/client/views/admin/admin-login.client.view.html',
        controller: 'AdminLoginController',
        controllerAs: 'vm'
      })
      .state('welcome', {
        url: '/customer/:customerId',
        templateUrl: '/modules/core/client/views/customer/welcome.client.view.html',
        controller: 'WelcomeController',
        controllerAs: 'vm',
        resolve: {
          customerId: function($stateParams) {
            return $stateParams.customerId;
          }
        }
      })
      .state('confirmsystem', {
        templateUrl: '/modules/core/client/views/customer/confirm-system.client.view.html',
        controller: 'ConfirmSystemController',
        params: {
          customer: null
        },
        controllerAs: 'vm'
      })
      .state('orderdetails', {
        url: '/orderdetails',
        templateUrl: '/modules/core/client/views/customer/order-details.client.view.html',
        controller: 'OrderDetailsController',
        controllerAs: 'vm'
      })      
      .state('payment', {
        url: '/payment',
        templateUrl: '/modules/core/client/views/customer/payment.client.view.html',
        controller: 'PaymentController',
        controllerAs: 'vm'
      })
      .state('admin.orders', {
        url: '/orders',
        templateUrl: '/modules/core/client/views/admin/order-list.client.view.html',
        controller: 'AdminOrderListController',
        controllerAs: 'vm',
        resolve: {
          ordersResolve: ['$injector', '$q', function($injector, $q) {
            return $injector.invoke(orderData).$promise;   // cached, otherwise we would have called IncidentNoteTitle.query().
          }]
        },
      })
      .state('admin.orderview', {
        url: '/order/:orderId',
        templateUrl: '/modules/core/client/views/admin/order-view.client.view.html',
        controller: 'AdminOrderViewController',
        controllerAs: 'vm',
        resolve: {
          orderResolve: getOrder,
        },
      })       
      .state('help', {
        url: '/help',
        templateUrl: '/modules/core/client/views/customer/help.client.view.html',
        controller: 'HelpController',
        controllerAs: 'vm'
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: '/modules/core/client/views/404.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function ($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true
        }
      })
      .state('bad-request', {
        url: '/bad-request',
        templateUrl: '/modules/core/client/views/400.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function ($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true
        }
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: '/modules/core/client/views/403.client.view.html',
        data: {
          ignoreState: true
        }
      });
  }

  getOrder.$inject = ['$stateParams', 'OrdersService'];

  function getOrder($stateParams, OrdersService) {
    return OrdersService.get({
      orderId: $stateParams.orderId
    }).$promise;
  }

  orderData.$inject = ['OrdersService'];

  function orderData(OrdersService) {
    return OrdersService.query();
  }

}());
