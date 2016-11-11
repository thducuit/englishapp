(function() {
  'use strict';

  angular.module('audioManagerApp')
    .constant('audioConstant', {
      audio: {
        template: {
          view: 'app/audio/view/audio.view.tpl.html',
          action: 'app/audio/action/audio.action.tpl.html',
          lyrics: 'app/audio/action/audio.lyrics.tpl.html'
        },
        api: {
          v1: {
            get: '/api/v1/audios',
            put: '/api/v1/audios',
            post: '/api/v1/audios',
            putLyric: '/api/v1/audios/lyric'
          }
        }
      }
    });
})();