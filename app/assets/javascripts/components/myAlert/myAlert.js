(function () {
  'use strict';
  angular.module('myDirectives')
    .directive('myAlert', ['$http', '$templateCache', '$compile', '$timeout', function ($http, $templateCache, $compile, $timeout) {
      return {
        restrict: 'EA',
        scope: {
          myAlert: '=',
          id: '@'
        },
        template: '<div ng-show="_show" class="alert {{ _class }}">' +
                    '<a href="#" class="close" ng-click="myAlert.close()">&times;</a>' +
                    '{{ _message }}' +
                  '<div>',
        link: function (scope, elements, attributes) {
            scope._class = '';
            scope._message = '';
            scope._show = false;
            
            var timerProm = null;
            
            
            scope.myAlert._success = function(message) {
                scope._class = 'alert-success';
                scope._message = message;
                show();
                closeByTimeOut();
            };
            
            scope.myAlert._info = function(message) {
                scope._class = 'alert-info';
                scope._message = message;
                show();
                closeByTimeOut();
            };
            
            scope.myAlert._danger = function(message) {
                scope._class = 'alert-danger';
                scope._message = message;
                show();
                closeByTimeOut();
            };
            
            scope.myAlert._warning = function(message) {
                scope._class = 'alert-warning';
                scope._message = message;
                show();
                closeByTimeOut();
            };
            
            scope.myAlert.close = function() {
                hide();
                removeTimeOut();
            };
            
            
            function hide() {
                scope._show = false;
            }
            
            function show() {
                scope._show = true;
            }
            
            function removeTimeOut() {
                if (timerProm) {
                  $timeout.cancel(timerProm);
                  timerProm = null;
                }
            }
            
            function closeByTimeOut() {
                if(scope.myAlert.timeout) {
                    timerProm = $timeout(function() {
                        scope._show = false;
                    }, scope.myAlert.timeout);
                }
            }
            
            

        }
      };
    }]);
})();