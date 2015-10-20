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


  })
  .controller('HomeCtrl', function ($scope, _, $ionicPopup, TreeViewService) {

    $scope.viewModel = {};
    $scope.viewModel.nodeText = "";


    var editNode = null;

    TreeViewService.Init(Init);

    Init();


    function Init() {
      $scope.nodes = [];
      var nodes = TreeViewService.GetView();
      _.forEach(nodes, function (node) {
        $scope.nodes.push(node)
      });
      //$scope.hasParent = TreeViewService.HasParent();
    }

    $scope.hasParent = function () {
      return TreeViewService.HasParent();
    }

    $scope.textLimit = 15;


    $scope.IsEditNode = function (nodeId) {
      return editNode === nodeId;
    }

    $scope.SetEditNode = function (nodeId) {
      editNode = nodeId;
    }

    $scope.MoveToNode = function (node) {
      TreeViewService.MoveToNode(node);


    }

    $scope.MoveToParentNode = function () {

      TreeViewService.MoveToParentNode();

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

  .
  controller("AddNodeCtrl", function ($scope, TreeViewService) {
    $scope.AddNode = function (nodeText) {

      TreeViewService.AddNode(nodeText);
      $scope.addModal.hide();
    }
  });





