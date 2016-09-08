(function() {
  'use strict';

  angular.module('myDirectives')
    .directive('audioPlayer', [function() {
      console.log('test player');
      return {
        restrict: 'EA',
        scope: {
          play: '&',
          pause: '&',
          volumeUp: '&',
          volumeDown: '&'
        },
        template: '<div class="audio-player">' +
                  '<a ng-click="expandPlayerTask()" class="toggle-audio-player-btn"></a>' +
                    '<div class="audio-player-task" ng-hide="checkHide()">' +
                      '<a ng-click="playOrPause()" class="btn-click-play" ng-class="changeIcon()" href=""></a>' +
                      '<a class="btn-click-volume-down" href="" ng-class="volumeDownClasses" ng-click="down()"></a>' +
                      '<a class="btn-click-volume-up" href="" ng-class="volumeUpClasses" ng-click="up()"></a>' +
                    '</div>' +
                  '</div>',
        link: function(scope) {

          var MIN = 0, MAX = 20;

          scope.customClass = 'hide';
          scope.volume = 5;
          scope.inPlaying = false;

          scope.expandPlayerTask = function() {
            scope.customClass = (scope.customClass === 'hide') ? 'show' : 'hide';
          };

          scope.checkHide = function() {
            return scope.customClass === 'hide';
          };

          scope.playOrPause = function() {
            if(scope.inPlaying) {
              scope.pause();
              scope.inPlaying = false;
            }else{
              scope.play();
              scope.inPlaying = true;
            }
          };

          scope.changeIcon = function () {
            return scope.inPlaying ? 'pause-icon' : 'play-icon';
          };

          scope.down = function() {
            scope.volume--;
            scope.volumeDown();
          };

          scope.up = function() {
            scope.volume++;
            scope.volumeUp();
          };

          scope.$watch(function() {
            return scope.volume;
          }, function(val) {
            //watch when volume is max
            if(val >= MAX) {
              scope.volume = MAX;
              scope.volumeUpClasses = 'max';
            }else{
              scope.volumeUpClasses = '';
            }
            //watch when volume is min
            if(val <= MIN) {
              scope.volume = MIN;
              scope.volumeDownClasses = 'mute';
            }else{
              scope.volumeDownClasses = '';
            }
          });

        }
      };
    }]);
})();