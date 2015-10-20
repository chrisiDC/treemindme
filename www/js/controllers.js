angular.module('starter.controllers', [])


  .controller('BaseCtrl', function ($scope, $http, localStorageService, $ionicModal, TreeNode, CircularJSON) {


    var root = null;
    var current = null;
    var addModal = null;


    $ionicModal.fromTemplateUrl('templates/AddNode.html', function (modal) {
      addModal = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    });
    var storedNodes = localStorageService.get('tree');

    if (storedNodes === null) {
      {
        $http({
          method: 'GET',
          url: '/empty.json'
        }).then(function (response) {

          root = new TreeNode({});
          current = root;

        });
      }
    }
    else {

      var parsed = CircularJSON.parse(storedNodes);
      root = new TreeNode().fromJSON(null, parsed);
      current = root;
    }



    $scope.GetCurrent = function () {
      return current;
    }

    $scope.SetCurrent = function (key) {
      current = root.find(key);
    }

    $scope.Save = function () {
      localStorageService.set('tree', CircularJSON.stringify(root));
    }

    $scope.openModal = function () {
      addModal.show();
    };
    $scope.closeModal = function () {
      addModal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      addModal.remove();
    });
    $scope.PopupDelete = function (key) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Consume Ice Cream',
        template: 'Are you sure you want to eat this ice cream?'
      });
      confirmPopup.then(function (res) {
        if (res) {
          OnNodeDelete(key);
        }
      });
    }


    function OnNodeDelete(key) {
      root.removeChildByKey(key);

    }


  })
  .controller('HomeCtrl', function ($scope, _, TreeNode) {

    $scope.viewModel = {};
    $scope.viewModel.nodeText = "";


    var editNode = null;


    $scope.textLimit = 15;

    function PrepareViewNode(node) {
      var cloned = _.cloneDeep(node);
      cloned.children = [];
      cloned.parent = null;
    }

    $scope.IsEditNode = function (nodeId) {
      return editNode === nodeId;
    }

    $scope.SetEditNode = function (nodeId) {
      editNode = nodeId;
    }

    $scope.Expand = function (node) {
      $scope.nodes = [];
      $scope.SetCurrent(node.key);
      _.forEach($scope.GetCurrent().children, function (node) {

        var clone = _.cloneDeep(node);
        clone.children = [];
        clone.parent = null;
        $scope.nodes.push(clone);
      })

    }

    $scope.Collapse = function () {

      $scope.nodes = [];
      $scope.SetCurrent($scope.GetCurrent().getParentNode().key);
      _.forEach($scope.GetCurrent().children, function (node) {

        $scope.nodes.push(PrepareViewNode(node));
      })

    }


  })

  .controller("AddNodeCtrl", function ($scope,TreeNode) {
    $scope.AddNode = function (nodeText) {

      var node = new TreeNode({value: nodeText});
      $scope.GetCurrent().addChild(node);
      $scope.nodes.push(PrepareViewNode(node));
    }
  });





