(function() {
	'use strict';

	angular
		.module('core')
		.controller('HelpController', HelpController);

	HelpController.$inject = ['$scope'];

	function HelpController($scope) {
		var vm = this;
	}
}());