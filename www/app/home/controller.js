angular.module('app.controllers')

  .controller("app.controllers.home", function ($scope, $rootScope, localStorageService, $timeout, $state, $ionicLoading, TreeViewService) {

    var model = {};
    $scope.model = model;

    TreeViewService.Current().then(function (current) {
      var selectedNode = localStorageService.get('selected');
      model.root = current;

      model.selected = selectedNode != null ? TreeViewService.GetNode(selectedNode) : TreeViewService.GetInbox();
    });

    $scope.$on('NodeSelected', function (event, data) {
      model.selected = data;
      localStorageService.set("selected", data.key);
      TreeViewService.Save();
    });

    $scope.model.Save = function () {


      TreeViewService.AddNode(model.text, TreeViewService.NODETYPES.VALUE, model.selected);
      model.text = "";
      $timeout(function () {
        $ionicLoading.hide();
      }, 500);
      $ionicLoading.show({
        template: "Saving..."
      });

    }


    $scope.goToSelect = function () {
      $state.transitionTo('tab.tree', {
        select: true
      });
    }

/*
 $scope.GoToTree=function()
 {
 $state.go('tab.tree', {select:true}, {reload: true});
 }
 */

})






