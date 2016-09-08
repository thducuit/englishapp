(function () {
  'use strict';
  angular.module('myDirectives')
    .constant('myLyricsConstant', {
      DEFAULT_CONFIG: {
        template: null,
        createCallback: angular.noop
      }
    })
    .directive('myLyrics', ['$http', '$templateCache', 'myLyricsConstant', '$compile', function ($http, $templateCache, myLyricsConstant, $compile) {
      return {
        restrict: 'EA',
        scope: {
          config: '=',
          lyrics: '='
        },
        template: '<div id="my-lyrics">' +
          '<ul id="my-lyrics-list"></ul>' +
          '<div>',
        link: function (scope, element) {
          console.log('welcome my lyrics');
          (function () {
            if (!scope.lyrics || !angular.isArray(scope.lyrics)) {
              scope.lyrics = [];
              console.error('Model must be an array');
            }
          })();

          var templateHTML = '<li ng-repeat="item in lyrics"><span>{{item.stop}}</span><p>{{item.content}}</p>' +
            '<textarea ng-model="item.content" class="form-control" cols="30" rows="10" ng-show="this.show"></textarea>' +
            '<a class="my-lyrics-item-edit"   ng-click="edit(this)" ng-show="!this.show">&diams;</a>' +
            '<a class="my-lyrics-item-update" ng-click="update(this)" ng-show="this.show">&hearts;</a>' +
            '<a class="my-lyrics-item-remove" ng-click="remove(this)">&times;</a>' +
            '</li>';
          scope.config = angular.extend(angular.copy(myLyricsConstant.DEFAULT_CONFIG), scope.config);

          /**
           *  Config API
           * @type {{create: Function}}
           */
          scope.configCallback = {
            create: function (object) {
              scope.lyrics.push(angular.copy(object));
            }
          };
          scope.config = angular.extend(scope.config, scope.configCallback);


          /**
           * find position element in list by hashKey
           * @param list
           * @param hashKey
           * @returns {number}
           */
          function findByHashKey(list, hashKey) {
            for (var i = list.length - 1; i >= 0; i--) {
              if (list[i].$$hashKey === hashKey) {
                return i;
              }
            }
            return 0;
          }

          /**
           * Control action
           * @param object
           * @returns {Array|*}
           */
          scope.remove = function (object) {
            var index = findByHashKey(scope.lyrics, object.item.$$hashKey);
            return scope.lyrics.splice(index, 1);
          };

          scope.edit = function (object) {
            object.show = true;
          };

          scope.update = function (object) {
            object.show = false;
          };


          /**
           * Build template callback
           */
          var buildTemplate = function () {
            element.find('#my-lyrics-list').append(templateHTML);
            $compile(element.contents())(scope);
          };


          /**
           * Get custom template by url
           * @param callback
           * @returns {*|then|!Promise.<RESULT>|then|then|then}
           */
          function getTemplate(callback) {
            if(!callback) {
              return false;
            }
            if (scope.config.template) {
              return $http.get(scope.config.template, {cache: $templateCache})
                .then(function (result) {
                  if (result.status === 200) {
                    templateHTML = [
                      '<li ng-repeat="item in lyrics">',
                      result.data,
                      '<textarea ng-model="item.content" class="form-control" cols="30" rows="10" ng-show="this.show"></textarea>',
                      '<a class="my-lyrics-item-edit"   ng-click="edit(this)" ng-show="!this.show">&diams;</a>',
                      '<a class="my-lyrics-item-update" ng-click="update(this)" ng-show="this.show">&hearts;</a>',
                      '<a class="my-lyrics-item-remove" ng-click="remove(this)">&times;</a>',
                      '</li>'
                    ].join('');
                  }
                  callback();
                });
            } else {
              callback();
            }
          }

          function initConfig() {
            getTemplate(buildTemplate);
          }

          function init() {
            initConfig();
          }

          init();


        }
      };
    }]);
})();