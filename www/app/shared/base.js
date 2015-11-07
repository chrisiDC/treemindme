angular.module('app.controllers')

  .controller('app.controllers.base', function ($scope, $state) {
    $scope.tabClicked = function($event) {
      //"#/profile/more/"
      $event.preventDefault();
      $state.transitionTo('tab.tree', {
        select: false
      });
    }

  })
