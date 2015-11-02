angular.module('app.controllers')


  .controller('app.controllers.tree', function ($scope, _, $ionicPopup, TreeViewService) {

    $scope.model.editable=true;
    /*   var model = $scope.model;

     model.nodeText = "";
     model.textLimit = 15;
     var editNode = null;


     TreeViewService.Current().then(function(current)
     {
     model.current = current;
     });


     $scope.IsEditNode = function (nodeId) {
     return editNode === nodeId;
     }

     $scope.SetEditNode = function (nodeId) {
     editNode = nodeId;
     }




     $scope.PopupDelete = function (key) {
     var confirmPopup = $ionicPopup.confirm({
     title: 'Consume Ice Cream',
     template: 'Are you sure you want to eat this ice cream?'
     });
     confirmPopup.then(function (res) {
     if (res) {
     TreeViewService.Remove(key);

     }
     });
     }

     })

     .controller("AddNodeCtrl", function ($scope, TreeViewService) {
     $scope.AddNode = function (nodeText) {

     TreeViewService.AddNode(nodeText);
     $scope.addModal.hide();
     }
     })

     .controller("HomeCtrl", function ($scope, TreeViewService) {

     var model = {};
     $scope.model = model;

     TreeViewService.Current().then(function(current)
     {
     model.root = current;
     });*/


  })



