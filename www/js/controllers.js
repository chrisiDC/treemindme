angular.module('starter.controllers', [])


  .controller('BaseCtrl', function ($scope, $ionicModal, $ionicPopup, TreeViewService) {


    $scope.modalData = {};

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
      return TreeViewService.HasParent();
    }


    $scope.MoveToParentNode = function () {

      TreeViewService.MoveToParentNode();

    }

  })
  .controller('TreeCtrl', function ($scope, _, $ionicPopup, TreeNode,TreeViewService) {

    var model = {};
    $scope.model = model;
    model.nodeText = "";

    var editNode = null;

    model.current= TreeViewService.Current();

    model.textLimit = 15;


    $scope.IsEditNode = function (nodeId) {
      return editNode === nodeId;
    }

    $scope.SetEditNode = function (nodeId) {
      editNode = nodeId;
    }

    $scope.MoveToNode = function (node) {
      TreeViewService.MoveToNode(node);


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

    TreeViewService.GetRoot().then(function(root)
    {
      $scope.node = root;
    });

    $scope.AddNode = function (nodeText) {

      TreeViewService.AddNode(nodeText);
      $scope.addModal.hide();
    }
  })



