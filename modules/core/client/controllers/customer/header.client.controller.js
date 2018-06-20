(function() {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['Authentication', '$scope', '$state'];

  function HeaderController(Authentication, $scope, $state) {

    $scope.authentication = Authentication

    $scope.onNeedHelpClicked = function() {
      $state.go('help');
    };

    $scope.logout = function() {
      localStorage.removeItem('log_in_time');
      window.location.href = '/api/auth/signout';
    };

  }
}());