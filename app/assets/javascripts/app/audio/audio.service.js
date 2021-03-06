(function() {
  'use strict';

  angular.module('audioManagerApp')
    .factory('AudioSrv', ['audioConstant', '$http', 'Upload', function(audioConstant, $http, Upload) {
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
      
      srv.getAudio = function(object) {
        return $http.get([audioConstant.audio.api.v1.get, object.id].join('/'));
      };
      
      srv.deleteAudio = function(object) {
        return $http.delete([audioConstant.audio.api.v1.get, object.id].join('/'));
      };
      
      srv.updateLyric = function(object) {
        return $http.put([audioConstant.audio.api.v1.putLyric, object.id].join('/'), object);
      };
      
      srv.postAudio = function(object) {
        //return $http.post(audioConstant.audio.api.v1.post, object);
        return Upload.upload({
          url: audioConstant.audio.api.v1.post,
          method: 'POST',
          headers: { 'Content-Type': false },
          data: {
            audio: object
          }
        });
      };
      
      srv.parse = {
        toAudio: function(object) {
          object.file  = object.url;
          object.lyric = object.lyric ? object.lyric : [];
          object.time = object.lyric;
          return object;
        },
        request: {
          updateLyric: function(object) {
            delete object.file;
            return object;
          }
        }
      };

      init();
      return srv;
    }]);
})();