(function() {
  'use strict';

  angular
    .module('core')
    .controller('AdminOrderViewController', AdminOrderViewController);

  AdminOrderViewController.$inject = ['$scope', '$state', 'orderResolve', 'OrdersService', 'ORDER_STATUS', 'Notification', 'MESSAGES'];

  function AdminOrderViewController($scope, $state, orderResolve, OrdersService, ORDER_STATUS, Notification, MESSAGES) {
    var vm = this;

    vm.order = new OrdersService(orderResolve);

    vm.order_statuses = ORDER_STATUS;

    vm.form = {};

    $scope.getOrderStatus = function(status) {
      return _.find(ORDER_STATUS, ['id', status]).name;
    };

    $scope.back = function() {
      $state.go('admin.orders');
    };

    $scope.save = function(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.orderForm');
        return false;
      }

      if (vm.note) {
        vm.order.notes.push({
          notedOn: new Date(),
          note: vm.note
        });
      }

      if (vm.order._id) {
        vm.order.$update(successCallback, errorCallback);
      }

      function successCallback(res) {

        Notification.success({
          message: MESSAGES.SUCCESS_MSG_UPDATE_ORDER,
          title: '<i class="glyphicon glyphicon-remove"></i> Success'
        });

        $state.go('admin.orders');
      }

      function errorCallback(res) {

        Notification.error({
          message: res.data.message,
          title: '<i class="glyphicon glyphicon-remove"></i> Error'
        });
      }
    };
  }
}());
