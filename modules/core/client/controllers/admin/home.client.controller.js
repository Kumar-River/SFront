(function() {
  'use strict';

  angular
    .module('core')
    .controller('AdminLoginController', AdminLoginController);

  AdminLoginController.$inject = ['Authentication', '$scope', '$state', 'Notification', 'UsersService'];

  function AdminLoginController(Authentication, $scope, $state, Notification, UsersService) {
    var vm = this;

    vm.signin = signin;
    vm.authentication = Authentication;

    if (Authentication.user) {
      $state.go('admin.orders');
    }

    function signin(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      UsersService.userSignin(vm.credentials)
        .then(onUserSigninSuccess)
        .catch(onUserSigninError);
    }

    function onUserSigninSuccess(response) {
      // If successful we assign the response to the global user model
      vm.authentication.user = response;
      Notification.info({ message: 'Welcome ' + response.firstName });
      $state.go('admin.orders');
      localStorage.setItem('log_in_time', new Date().getTime());
    }

    function onUserSigninError(response) {
      Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Signin Error!', delay: 6000 });
    }
  }
}());
