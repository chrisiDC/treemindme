angular.module('app.controllers')

.controller("app.controllers.addnode", function ($scope, TreeViewService) {
  $scope.model ={};
  $scope.model.choice=  TreeViewService.NODETYPES.VALUE;
  $scope.model.NODETYPES = TreeViewService.NODETYPES;
  $scope.AddNode = function (nodeText) {

    TreeViewService.AddNode(nodeText,$scope.model.choice);
    $scope.addModal.hide();
  }
})
