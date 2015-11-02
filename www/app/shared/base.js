angular.module('app.controllers')

  .controller('app.controllers.base', function ($scope, $rootScope,$ionicModal, $ionicPopup, TreeViewService) {

    var model = {};
    $scope.model = model;
    $scope.modalData = {};
    model.valuePath = "";
    model.nodeText = "";
    model.textLimit = 15;
    model.editable = true;

    var editNode = null;


    TreeViewService.Current().then(function(current)
    {
      model.root = current;
      model.current = current;
      model.valuePath = TreeViewService.GetValuePath();
      model.NODETYPES = TreeViewService.NODETYPES;
    });

    $ionicModal.fromTemplateUrl('app/addnode/template.html', function (modal) {
      $scope.addModal = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    });

    $scope.$on('modal.hidden', function () {
      $scope.modalData.nodeText = "";
    });

    $scope.toggleNode = function(node) {
      node.collapsed = !node.collapsed;
      /* _.forEach(node.children,function(child)
       {
       child.show = true;
       });*/

    };

    $scope.isVisible=function(node)
    {

      return (node.data.type === model.NODETYPES.CONTAINER) && ((node.parent != null && node.parent.collapsed) || node.parent.key === 0);
    }

    $scope.nodeSelected = function(node)
    {
      $rootScope.$broadcast('NodeSelected', 'Data to send');
    }


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





    $scope.hasChildContainer=function(node)
    {
      return _.findIndex(node.children, function(node) {
          return node.data.type === $scope.model.NODETYPES.CONTAINER;
        }) !== -1;
    }
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
