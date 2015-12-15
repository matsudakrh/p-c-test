var app = angular.module('myApp', []);

app.directive('myTextBox', function() {
    return {
        restrict: 'E',
        scope: true,
        template: '<div><input ng-model="text"> {{text}}</div>'
    };
});

app.controller('MainCtrl', function($scope) {
});