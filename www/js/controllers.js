angular.module('starter.controllers', [])


  .controller('BaseCtrl', function ($scope, $http, $ionicPopup, TreeService) {


    var vm = {};
    $scope.vm = vm;

    vm.nodes = [];
    vm.node = "";

    vm.Delete = function () {

    }

    $scope.Save = function () {
      TreeService.Save();
    }

    $scope.PopupAdd = function () {
      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="vm.node" autofocus>',
        title: 'Enter Wi-Fi Password',
        subTitle: 'Please use normal things',
        scope: $scope,
        autofocus: true,
        buttons: [
          {text: 'Cancel'},
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function (e) {
              OnNodeAdd($scope.vm.node);


            }
          }
        ]
      });
    }

    $scope.PopupDelete = function (id) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Consume Ice Cream',
        template: 'Are you sure you want to eat this ice cream?'
      });
      confirmPopup.then(function (res) {
        if (res) {
          OnNodeDelete(id);
        }
      });
    }


    _.forEach(TreeService.Get(), function (node) {
      vm.nodes.push(node);
    });

    function OnNodeDelete(id) {
      TreeService.RemoveNode(id);

    }

    function OnNodeAdd(name) {
      TreeService.AddNode(name);

    }


  })
  .controller('HomeCtrl', function ($scope, TreeService) {

    var editNode = null;


    $scope.nodes = TreeService.Get();

    $scope.IsEditNode = function (nodeId) {
      return editNode === nodeId;
    }

    $scope.SetEditNode = function (nodeId) {
      editNode = nodeId;
    }

    $scope.Expand = function (nodeId) {
      TreeService.Expand(nodeId);
      $scope.nodes.length = 0;
      _.forEach(TreeService.Get(), function (node) {
        $scope.nodes.push(node);
      });

    }

    $scope.Collapse = function (nodeId) {

      TreeService.Collapse(nodeId);
      $scope.nodes.length = 0;
      _.forEach(TreeService.Get(), function (node) {
        $scope.nodes.push(node);
      });

    }


  })





