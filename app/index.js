'use strict';

angular.module('raboApp', [
    'ui.router',
]).config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    //controller and view assignment
    $stateProvider.state('main', {
        url: '/',
        templateUrl: 'views/rabo-table.view.html',
        controller: 'RaboTable'
    });

});
