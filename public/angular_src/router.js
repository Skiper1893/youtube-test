var app = angular.module('youtybe-watch', ['ui.router', 'ui.bootstrap','ngMaterial']);

  app.config(function($stateProvider) {
  var mainState = {
    name: 'main',
    url: '/main',
    templateUrl: "../view/main.html"
  }

  var createState = {
    name: 'create',
    url: '/create',
    templateUrl: "../view/create.html"
  }

  $stateProvider.state(mainState);
  $stateProvider.state(createState);
});