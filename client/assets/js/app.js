(function() {
  'use strict';

  angular.module('billiardStats', [
      'ui.router',
      'ngAnimate',

      //foundation
      'foundation',
      'foundation.dynamicRouting',
      'foundation.dynamicRouting.animations'
    ])
    .run(function() {
      FastClick.attach(document.body);
    })
    .config([
      '$urlRouterProvider', '$locationProvider',
      function($urlProvider, $locationProvider) {
        $urlProvider.otherwise('/');

        $locationProvider.html5Mode({
          enabled: false,
          requireBase: false
        });

        $locationProvider.hashPrefix('!');
      }]);


})();
