(function() {
  'use strict';

  angular
    .module('core')
    .controller('AdminOrderViewController', AdminOrderViewController);

  AdminOrderViewController.$inject = ['Authentication', '$scope', '$state', 'orderResolve', 'OrdersService', 'ORDER_STATUS', 'Notification', 'MESSAGES', 'OMIT_KEYS', 'KEYS'];

  function AdminOrderViewController(Authentication, $scope, $state, orderResolve, OrdersService, ORDER_STATUS, Notification, MESSAGES, OMIT_KEYS, KEYS) {
    var vm = this;

    vm.order = new OrdersService(orderResolve);
    vm.order_statuses = ORDER_STATUS;
    vm.form = {};
    vm.originalOrder = angular.copy(orderResolve);

    if (!Authentication.user) {
      $state.go('adminLogin');
    }

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
          note: Authentication.user.displayName + ' has added the notes: ' + vm.note
        });
      }

      _.mergeWith(vm.originalOrder, vm.order, function(objectValue, sourceValue, key, object, source) {
        if (!(_.isEqual(objectValue, sourceValue)) && (Object(objectValue) !== objectValue) && !_.includes(OMIT_KEYS, key) && objectValue !== undefined) {
          var originalOrder = objectValue === '' ? 'null' : objectValue;
          var updatedOrder = sourceValue;
          if (key === KEYS[0]) {
            originalOrder = $scope.getOrderStatus(objectValue);
            updatedOrder = $scope.getOrderStatus(sourceValue);
          }
          vm.order.notes.push({
            notedOn: new Date(),
            note: Authentication.user.displayName + ' has updated the ' + key + ' from ' + originalOrder + ' to ' + updatedOrder
          });
        }
      });

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
