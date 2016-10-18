(function () {
  'use strict';
  
  angular.module('audioManagerApp')
    .controller('AudioCtrl', ['$scope', 'AudioSrv', function (scope, AudioSrv) {
      console.log('welcome audio manager app');
      
      var vm = this;
      
      vm.audios = [];
      vm.audio = {};
      
      vm.data = AudioSrv.cache;
      vm.lyricsConfig = {
        template: 'app/audio/action/test.html'
      };
      vm.myData = {
        stop: 10,
        content: 'update soon ...'
      };

      vm.myConfig = {
        pauseTrigger: function(time) {
          if(time) {
            console.log('test pause trigger', time);
            vm.myData.stop = time;
            vm.lyricsConfig.create(vm.myData);
          }
        }
      };
      vm.myAudio = {
        file: 'scripts/components/myAudio/3017.mp3',
        time: []
      };

      vm.addAction = function () {
        AudioSrv.switchView('add');
        vm.audio = {};
      };

      vm.cancelAction = function () {
        AudioSrv.switchView('view');
      };

      vm.lyricsAction = function () {
        AudioSrv.switchView('lyrics');
      };

      vm.updateLyricsAction = function() {
        console.log(vm.myAudio);
      };
      
      vm.createAction = function() {
        postAudio();
      };
      
      function postAudio() {
        AudioSrv.post(vm.audio).success(function(response) {
          console.log(response);
        });
      }


      /**
       * get all audio
       *
       */
      function getAll() {
        AudioSrv.getAll().success(function(response) {
          if(response && angular.isArray(response)) {
            vm.audios = response;
          }
        });
      }
      
      
      /**
       * Init  
       * 
       */
      (function() {
        getAll();
      })();

    }]);
})();