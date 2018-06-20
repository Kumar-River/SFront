(function() {
  'use strict';

  angular
    .module('core')
    .controller('AdminOrderListController', AdminOrderListController);

  AdminOrderListController.$inject = ['$scope', '$state', 'ordersResolve', 'ORDER_STATUS'];  

  function AdminOrderListController($scope, $state, ordersResolve, ORDER_STATUS) {
    var vm = this;

    vm.orderview = orderview;

    vm.hasUploadInstallerList = false;

    vm.orders = ordersResolve;

    $scope.searchparams = {
      keyword: undefined
    };

    function orderview(order) {
      $state.go('admin.orderview', {
        orderId: order._id
      });
    };

    $scope.getOrderStatus = function(status) {
      return _.find(ORDER_STATUS, ['id', status]).name;
    };
  }
}());
