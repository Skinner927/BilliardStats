import angular from 'angular';
import Users from './users/users';

let componentModule = angular.module('app.components', [
  Users.name
]);

export default componentModule;
