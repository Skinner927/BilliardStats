// Expose jQuery to window
//require("expose?$!jquery");
//require("expose?jquery!jquery");
//import jquery from 'jquery';
//import $ from 'jquery';
var $ = require('jquery');
window.jQuery = $;
window.$ = $;
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import foundation from 'exports?"foundation"!script!foundation-apps/dist/js/foundation-apps';
import 'script!foundation-apps/dist/js/foundation-apps-templates';
import restangular from 'imports?angular=angular&_=lodash!exports?"restangular"!restangular';

import restangularConfig from './app.config.restangular';

angular.module('app', [
    foundation,
    uiRouter,
    restangular,
    Common.name,
    Components.name
  ])
  .config(restangularConfig)
  .config(($urlRouterProvider, $stateProvider) => {
    "ngInject";

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        template: '<home></home>'
      })
      .state('users', {
        url: '/users',
        template: '<users></users>'
      });
  })

  .component('app', AppComponent);


