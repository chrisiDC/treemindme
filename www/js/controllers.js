angular.module('starter.controllers', [])


  .controller('BaseCtrl', function ($scope, $ionicModal, $ionicPopup, TreeViewService) {

    var model = {};
    $scope.model = model;
    $scope.modalData = {};
    model.valuePath = "";
    model.nodeText = "";
    model.textLimit = 15;
    var editNode = null;


    $ionicModal.fromTemplateUrl('templates/AddNode.html', function (modal) {
      $scope.addModal = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    });

    $scope.$on('modal.hidden', function () {
      $scope.modalData.nodeText = "";
    });

    $scope.Save = function () {
      TreeViewService.Save();

    }

    $scope.openModal = function () {
      $scope.addModal.show();
    };
    $scope.closeModal = function () {
      $scope.addModal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.addModal.remove();
    });

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
    $scope.model ={};
    $scope.model.choice=  TreeViewService.NODETYPES.VALUE;
    $scope.model.NODETYPES = TreeViewService.NODETYPES;
    $scope.AddNode = function (nodeText) {

      TreeViewService.AddNode(nodeText,$scope.model.choice);
      $scope.addModal.hide();
    }
  })

  .controller("HomeCtrl", function ($scope,$timeout, $ionicLoading,TreeViewService) {

    var model = {};
    $scope.model = model;

    TreeViewService.Current().then(function(current)
    {
      model.root = current;
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
  .controller('TreeCtrl', function ($scope, _, $ionicPopup, TreeViewService) {

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



