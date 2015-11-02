angular.module('app.controllers')

  .controller("app.controllers.home", function ($scope,$rootScope,$timeout, $ionicLoading,TreeViewService) {

    var model = {};
    $scope.model = model;

    TreeViewService.Current().then(function(current)
    {
      model.root = current;
    });

    $scope.$on('NodeSelected', function (event, data) {
      console.log(data);
    });

    $scope.model.Save=function()
    {


      TreeViewService.AddNode(model.text,TreeViewService.NODETYPES.VALUE,TreeViewService.GetInbox());
      model.text="";
      $timeout(function()
      {
        $ionicLoading.hide();
      },500);
      $ionicLoading.show({
        template: "Saving..."
      });

    }

  })




