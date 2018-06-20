(function() {
  'use strict';

  angular
    .module('core')
    .controller('AdminOrderListController', AdminOrderListController);

  AdminOrderListController.$inject = ['Authentication', '$scope', '$state', 'ordersResolve', 'ORDER_STATUS'];  

  function AdminOrderListController(Authentication, $scope, $state, ordersResolve, ORDER_STATUS) {
    var vm = this;

    vm.orderview = orderview;
    vm.hasUploadInstallerList = false;
    vm.orders = ordersResolve;

    if(!Authentication.user) {
      $state.go('adminLogin');
    }

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
