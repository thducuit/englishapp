(function () {
  'use strict';

  angular.module('audioManagerApp')
    .directive('main', [function() {
      return {
        scope: {},
        restrict: 'A',
        controller: 'MainCtrl',
        controllerAs: 'm',
        templateUrl: 'app/main/main.directive.tpl.html'
      };
    }]);
})();