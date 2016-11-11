(function () {
  'use strict';
  
  angular.module('audioManagerApp')
    .controller('AudioCtrl', ['$scope', 'AudioSrv', function (scope, AudioSrv) {
      console.log('welcome audio manager app');
      
      var vm = this;
      
      vm.audios = [];
      vm.audio = {};
      
      vm.myAlert = {
        timeout: 1500
      };
      
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
        backToViewPage();
      };

      vm.lyricsAction = function (object) {
        getAudio(object, function(response) {
          vm.audio = AudioSrv.parse.toAudio(response);
          AudioSrv.switchView('lyrics');
        });
      };
      
      vm.editAction = function (object) {
        getAudio(object, function(response) {
          vm.audio = response.data;
          AudioSrv.switchView('edit');
        });
      };
      
      vm.deleteAction = function(object) {
        deleteAudio(object, function() {
          backToViewPage();
        });
      }

      vm.updateLyricsAction = function() {
        updateLyric();
      };
      
      vm.createAction = function() {
        postAudio();
      };
      
      function postAudio() {
        AudioSrv.postAudio(vm.audio).success(function(response) {
          backToViewPage();
        });
      }
      
      function updateLyric() {
        AudioSrv.updateLyric(vm.audio).success(function() {
          backToViewPage();
          vm.myAlert._success("Update lyric successfully")
        });
      }
      
      function backToViewPage() {
        AudioSrv.switchView('view');
        getAll();
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
       * get Audio by ID
       * 
       */
      function getAudio(object, callback) {
        AudioSrv.getAudio(object).success(function(response) {
          if(response) {
            return callback ? callback(response) : null;
          }
        });
      }
      
      
      /**
       * delete Audio 
       * 
       */
      function deleteAudio(object, callback) {
        AudioSrv.deleteAudio(object).success(function(response) {
          if(response) {
            return callback ? callback(response) : null;
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