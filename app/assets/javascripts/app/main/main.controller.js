(function() {
    'use strict';
    
    angular.module('audioManagerApp')
    .controller('MainCtrl', function ($scope) {
    $scope.configAudio = {};

    $scope.getText = function(text){
      if(text !== $scope.lyricsContent) {
        $scope.lyricsContent = text;
      }
    };

    var pauseCallback = function (time){
      console.log('current time' ,time);
    };

    $scope.pauseAudio = function() {
      $scope.configAudio.pause(pauseCallback);
    };

    $scope.playAudio = function() {
      $scope.configAudio.play();
    };
    
  });
})();