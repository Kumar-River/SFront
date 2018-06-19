(function() {
  'use strict';

  angular
    .module('core')
    .controller('AdminOrderListController', AdminOrderListController);

  function AdminOrderListController($scope, $state) {
    var vm = this;

    vm.orderview = orderview;

    vm.hasUploadInstallerList = false;

    vm.orderLists = [{
      'orderId': 45001,
      'orderDate': new Date(),
      'customerName': 'John Doe',
      'siteAddress': '626 1st Ave New York',
      'installerName': 'Solar Inc',
      'orderStatus': 'Order Placed'
    }, {
      'orderId': 45002,
      'orderDate': new Date(),
      'customerName': 'Mike',
      'siteAddress': '125 3rd Cross Street CA',
      'installerName': 'Franklin Solar Inc',
      'orderStatus': 'Installer Confirmed'
    }, {
      'orderId': 45003,
      'orderDate': new Date(),
      'customerName': 'Cristy',
      'siteAddress': '626 1st Ave New York',
      'installerName': 'Solar Inc',
      'orderStatus': 'Order Placed'
    }, {
      'orderId': 45004,
      'orderDate': new Date(),
      'customerName': 'Mike',
      'siteAddress': '125 3rd Cross Street CA',
      'installerName': 'Franklin Solar Inc',
      'orderStatus': 'Installer Confirmed'
    }];

    $scope.searchparams = {
      keyword: undefined
    };

    function orderview(order) {
      $state.go('admin.orderview', {
        orderId: order.orderId
      });
    };
  }
}());
