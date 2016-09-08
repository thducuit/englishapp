(function() {
  'use strict';

  angular.module('audioManagerApp')
    .factory('AudioSrv', ['audioConstant', function(audioConstant) {
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

      init();
      return srv;
    }]);
})();