(function () {
  'use strict';
  angular.module('myDirectives')
    .directive('myScreen', ['$http', '$templateCache', 'myLyricsConstant', '$compile', function ($http, $templateCache, myLyricsConstant, $compile) {
      return {
        restrict: 'EA',
        scope: {
          text: '@'
        },
        template: '<div id="my-screen">' +
          '<div ng-hide="!isShow()" id="my-screen-action">{{ data }}</div>' +
          '<div>',
        link: function (scope, elements, attributes) {

          attributes.$observe('text', function(newValue) {
            scope.data = newValue;
          });

          scope.isShow = function() {
            return scope.data;
          };

        }
      };
    }]);
})();