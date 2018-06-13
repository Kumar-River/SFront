(function () {
  'use strict';

  angular
    .module('core')
    .controller('WelcomeController', WelcomeController);

	WelcomeController.$inject = ['customerId'];

  function WelcomeController(customerId) {
    var vm = this;


    console.log("WelcomeController "+customerId);


  }
}());
