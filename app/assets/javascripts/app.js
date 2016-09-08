'use strict';

/**
 * @ngdoc overview
 * @name engApp
 * @description
 * # engApp
 *
 * Main module of the application.
 */
angular
  .module('myDirectives', []);
angular
  .module('audioManagerApp', ['templates']);
angular
  .module('engApp', ['myDirectives', 'audioManagerApp']);

