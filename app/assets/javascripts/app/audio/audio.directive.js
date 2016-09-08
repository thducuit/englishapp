(function () {
  'use strict';

  angular.module('audioManagerApp')
    .directive('audioManager', [function() {
      return {
        scope: {},
        restrict: 'A',
        controller: 'AudioCtrl',
        controllerAs: 'a',
        templateUrl: 'app/audio/audio.directive.tpl.html'
      };
    }]);
})();