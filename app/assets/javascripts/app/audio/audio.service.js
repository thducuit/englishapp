(function() {
  'use strict';

  angular.module('audioManagerApp')
    .factory('AudioSrv', ['audioConstant', '$http', function(audioConstant, $http) {
      var srv = {};

      var mode = {
        view: {
          url: audioConstant.audio.template.view,
          title: 'Audio List'
        },
        add: {
          url: audioConstant.audio.template.action,
          title: 'New Audio'
        },
        edit: {
          url: audioConstant.audio.template.action,
          title: 'Edit Audio'
        },
        lyrics: {
          url: audioConstant.audio.template.lyrics,
          title: 'Update Lyrics'
        }
      };

      srv.switchView = function(key) {
        srv.cache.viewObject = mode[key];
      };

      function init() {
        srv.cache = {};
        srv.cache.viewObject = mode.view;
      }
      
      srv.getAll = function() {
        return $http.get(audioConstant.audio.api.v1.get);
      };
      
      srv.post = function(object) {
        return $http.post(audioConstant.audio.api.v1.post, object);
      };

      init();
      return srv;
    }]);
})();