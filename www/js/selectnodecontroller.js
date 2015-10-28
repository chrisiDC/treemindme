angular.module('starter.controllers')



  .controller('SelectNodeCtrl', function ($scope, TreeViewService) {

    var model = $scope.model;
    model.Editable=false;

    $scope.tasks = [
      {
        name: 'first task 1',
        checked: false,
        tree: [
          {
            name: 'first task 1.1',
            checked: true
          },
        ]
      },
      {
        name: 'first task 2',
        checked: true
      }
    ];

    /*   var model = {};
       $scope.model = model;
       $scope.modalData = {};
       model.valuePath = "";
       model.nodeText = "";
       model.textLimit = 15;
       var editNode = null;


       $scope.hasParent = function () {
         var hasParent= TreeViewService.HasParent();
         return hasParent;
       }


       $scope.MoveToRoot = function () {
         TreeViewService.MoveToRoot();
         model.valuePath = TreeViewService.GetValuePath();
         TreeViewService.Current().then(function(current)
         {
           model.current = current;

         });
       }

       $scope.MoveToParentNode = function () {

         TreeViewService.MoveToParentNode();
         model.valuePath = TreeViewService.GetValuePath();
         TreeViewService.Current().then(function(current)
         {
           model.current = current;
         });

       }

       $scope.MoveToNode = function (node) {
         TreeViewService.MoveToNode(node);
         model.valuePath = TreeViewService.GetValuePath();
         TreeViewService.Current().then(function(current)
         {
           model.current = current;
         });

       }



       TreeViewService.Current().then(function(current)
       {
         model.current = current;
         model.valuePath = TreeViewService.GetValuePath();
       });*/



  })



