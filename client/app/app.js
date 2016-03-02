import 'normalize.css';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'script!foundation-apps/dist/js/foundation-apps';
import 'script!foundation-apps/dist/js/foundation-apps-templates';


angular.module('app', [
    'foundation',
    uiRouter,
    Common.name,
    Components.name
  ])
  .config(($locationProvider) => {
    "ngInject";


  })

  .component('app', AppComponent);
