(function() {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state'];

  function HeaderController($scope, $state) {

    $scope.onNeedHelpClicked = function() {
      $state.go('help');
    };

  }
}());