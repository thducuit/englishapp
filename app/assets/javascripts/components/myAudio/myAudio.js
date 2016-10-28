(function () {
  'use strict';
  angular.module('myDirectives')
    .constant('myAudioConstant', {
      defaultConfig: {
        mode: 'step', // 'step'
        delay: 5, // second .
        repeat: false,
        volume: 1,
        isMute: false,
        showControls: false,
        lyrics: false,
        subtitle: true,
        pauseTrigger: angular.noop,
        continueTrigger: angular.noop
      },
      defaultAudioObject: {
        file: 'scripts/components/myAudio/3018.mp3',
        time: [
//          {
//            stop: 9.7,
//            content: 'Not many people would want to live in the Arctic areas of northern Canada, Alaska, and Greenland'
//          },
//          {
//            stop: 15.7,
//            content: 'In these places, the summers are very short, and the winters are extremely cold and dark'
//          }
        ]
      },
      mode: {
        STEP: 'step',
        AUTO: 'auto'
      }
    })
    .filter('trusted', ['$sce', function ($sce) {
      return function (url) {
        return $sce.trustAsResourceUrl(url);
      };
    }])
    .directive('myAudio', ['$http', 'myAudioConstant', '$compile', function ($http, myAudioConstant, $compile) {
      console.log('test audio');
      return {
        restrict: 'EA',
        scope: {
          value: '=',
          config: '=',
          sendText: '&'
        },
        template: '<div class="audio-sub" ng-hide="!isShowLyrics()">{{ subtitle }}</div>' +
          '<div class="audio-file"></div>',
        link: function (scope, element) {
          console.log('hello audio');
          var audio = null;
          var subtitle = null;

          scope.inPlay = false;
          //var inStop = false;
          scope.currentTime = 0;
          scope.subtitle = '...';

          var currentTimeInterval = null;
          //var playStateListener = null;
          var timeListener = null;
          var audioListener = null;
          var waitingListener = null;

          var index = 0;
          var subtitles = [];

          function goPlay() {
            scope.inPlay = true;
            audio.play();
            createCurrentTimeInterval();
          }

          function goStop() {
            scope.inPlay = false;
            audio.pause();
            clearCurrentTimeInterval();
          }

          function goPause() {
            scope.inPlay = false;
            audio.pause();
          }

          function goContinue() {
            scope.inPlay = true;
            audio.play();
          }

          scope.$watch(function () {
            return scope.inPlay;
          }, function(val) {
            if(val) {
              scope.config.continueTrigger(scope.currentTime, subtitle);
            }else{
              scope.config.pauseTrigger(scope.currentTime, subtitle);
            }
          });


          function nextStep() {}

          function previousStep() {}

          /**
           * check period
           * it 's must between 0-10,
           * change volume by period if true
           * @param period
           */
          function setVolume(period) {
            if (period > 10 || period < 0){
              return;
            }
            var p = parseFloat(period / 10);
            audio.volume(p);
          }

          function setMute() {
            audio.volume(0);
          }

          function showControls() {
            audio.showControls();
          }

          function hideControls() {
            audio.hideControls();
          }

          function showSubtitle(text) {
            scope.subtitle = text;
          }


          /**
           *  reset index when subtitle
           *  is the last element in list
           */
          function nextIndex() {
            if (index === subtitles.length) {
              index = 0;
            } else {
              index++;
            }
          }


          /**
           * display subtitle
           * @param text
           */
          function displaySubtitle(text) {
            if (!scope.config.subtitle) {
              return;
            }
            showSubtitle(text);
            scope.sendText({text:text});
          }

          /**
           * true if in Auto mode
           * @returns {boolean}
           */
          function isAutoMode() {
            return scope.config.mode ===  myAudioConstant.mode.AUTO;
          }

          /**
           * running
           */
          function running() {
            console.log('running...');
            if (subtitles.length > 0 && index < subtitles.length) {
              //  get current subtitle then increment index
              subtitle = subtitles[index];

              //  show subtitle
              displaySubtitle(subtitle.content);
            }

            // check stop time
            if (subtitle) {
              var stop = subtitle.stop;
              if (scope.currentTime === stop) {
                console.log('STOP');
                goPause();

                //  delay if in auto mode
                if(isAutoMode()) {
                  waitingTask();
                }

              }
            }
          }

          /**
           * task delay
           */
          function waitingTask() {
            waitingListener = setTimeout(function () {
              goContinue();
              nextIndex();
              clearWaitingTask();
            }, 3000);
          }

          function clearWaitingTask() {
            if(waitingListener) {
              clearTimeout(waitingListener);
            }
          }

          /**
           *
           * @type {*|function()}
           */
          timeListener = scope.$watch(function () {
            return scope.currentTime;
          }, function () {
            running();
          });

          /**
           * create Current time Interval
           * @type {setInterval|*|number}
           */
          function createCurrentTimeInterval() {
            currentTimeInterval = setInterval(function () {
              scope.$apply(function() {
                scope.currentTime = Math.round(audio.getCurrentTime() *  10) / 10;
              });
            }, 100);
          }

          /**
           * clear Current time Interval
           */
          function clearCurrentTimeInterval() {
            scope.currentTime = 0;
            if (currentTimeInterval) {
              clearInterval(currentTimeInterval);
            }
          }


          /**
           * get default scope.audio
           * @type {copy|*|XMLList|XML|copy|copy}
           */
          scope.audio = angular.copy(myAudioConstant.defaultAudioObject);


          /**
           * get default config
           * @type {*|extend|extend|extend|void|Object}
           */
          scope.config = angular.extend(angular.copy(myAudioConstant.defaultConfig), scope.config);


          /**
           * Config to define myAudio 's API
           * @type {{play: Function, pause: Function}}
           */
          scope.configFunction = {
            play: function (callback) {
              goPlay();
              if (callback && angular.isFunction(callback)) {
                callback();
              }
            },
            pause: function (callback) {
              goPause();
              if (callback && angular.isFunction(callback)) {
                callback(scope.currentTime);
              }
            },
            stop: function () {
              goStop();
            },
            continue: function (callback) {
              goContinue();
              if (callback && angular.isFunction(callback)) {
                callback(scope.currentTime);
              }
            },
            setVolume: function (period) {
              setVolume(period);
            },
            setMute: function () {
              setMute();
            },
            nextStep: function() {
              nextStep();
            },
            previousStep: function() {
              previousStep();
            }
          };
          scope.config = angular.extend(scope.config, scope.configFunction);


          /**
           * Watch if scope.audio have a change
           */
          audioListener = scope.$watch(function () {
            return scope.value;
          }, function (newVal) {
            if (newVal) {
              scope.audio = newVal;
              getSubtitleList();
              audio.change(newVal);
            }
          });


          /**
           *  Audio Class
           * @constructor
           */
          function Audio() {
            this.file = angular.element(element).find('#the-audio')[0];
          }

          Audio.prototype = {
            play: function () {
              this.file.play();
            },
            pause: function () {
              this.file.pause();
            },
            reload: function () {
              this.file.load();
            },
            change: function (audio) {
              if (!audio.file) {
                console.error('ERROR: File is required!');
              }
              angular.element(this.file).find('source').attr('src', audio.file);
              this.reload();
            },
            volume: function (period) {
              this.file.volume = period;
            },
            getCurrentTime: function () {
              return this.file.currentTime;
            },
            setCurrentTime: function (time) {
              this.file.currentTime = time;
            },
            showControls: function () {
              this.file.controls = true;
            },
            hideControls: function () {
              this.file.controls = false;
            }
          };


          /**
           *  Subtitle Class
           * @constructor
           */
          function Subtitle(stop, content) {
            this.stop = stop;
            this.content = content;
          }

          Subtitle.prototype = {};


          /**
           * get subtitle list
           */
          function getSubtitleList() {
            subtitles = [];
            if (scope.audio && scope.audio.time && scope.audio.time.length) {
              scope.audio.time.forEach(function (item) {
                subtitles.push(new Subtitle(item.stop, item.content));
              });
            }
          }

          /**
           * Build audio template
           */
          function buildAudioTemplate() {
            var template = (
              '<audio id="the-audio" controls>' +
                '<source ng-src="{{ audio.file | trusted }}" type="audio/mpeg">' +
                '</audio>'
              );
            element.find('.audio-file').append($compile(template)(scope));
          }

          /**
           * setting up the first time by input config
           */
          function initAudioByConfig() {
            scope.config.setVolume(scope.config.volume);
            if (scope.config.isMute) {
              setMute();
            }
            if (scope.config.showControls) {
              showControls();
            } else {
              hideControls();
            }
          }

          scope.isShowLyrics = function() {
            return scope.config.lyrics;
          };

          function init() {
            buildAudioTemplate();
            audio = new Audio();
            getSubtitleList();
            initAudioByConfig();
          }

          init();
        }
      };
    }]);
})();