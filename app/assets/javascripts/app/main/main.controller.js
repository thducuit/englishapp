(function() {
    'use strict';
    
    angular.module('audioManagerApp')
    .controller('MainCtrl', ['$scope', 'AudioSrv',  function ($scope, AudioSrv) {
      
    var vm = this;
    vm.audio = null;
    
    function getAll() {
      AudioSrv.getAll().then(function success(response) {
        return getAllCallback(response);
      }, function error(error) {
        console.error("ERROR");
      });  
    }
    
    function getAllCallback(response) {
      if(response && response.data && angular.isArray(response.data) && response.data.length) {
        vm.audio = AudioSrv.parse.toAudio(response.data[0]);
      }
    }
    
    vm.configAudio = {};

    vm.getText = function(text){
      // if(text !== $scope.lyricsContent) {
      //   $scope.lyricsContent = text;
      // }
      console.log(text);
      //vm.configAudio.pause(pauseCallback);
    };

    var pauseCallback = function (time){
      console.log('current time' ,time);
    };

    vm.pauseAudio = function() {
      vm.configAudio.pause(pauseCallback);
    };

    vm.playAudio = function() {
      vm.configAudio.play();
    };
    
    
    (function init() {
      getAll();
    })();
    
  }]);
})();