angular.module('app.controllers')


  .controller('app.controllers.tree', function ($scope,$rootScope,  $location, $stateParams, _, $ionicModal,$ionicPopup,TreeViewService) {


    var model = {
      editNode: null,
      select: $stateParams.select==="true",
      valuePath: "",
      nodeText: "",
      textLimit: 15

    };
    $scope.model = model;


    $scope.modalData = {};


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


    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.addModal.remove();
    });

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


    $scope.Save = function () {
      TreeViewService.Save();

    }

    $scope.openModal = function () {
      $scope.addModal.show();
    };
    $scope.closeModal = function () {
      $scope.addModal.hide();
    };

    $scope.IsEditNode = function (nodeId) {
      return model.editNode === nodeId;
    }

    $scope.SetEditNode = function (nodeId) {
      model.editNode = nodeId;
    }

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


    $scope.nodeSelected = function(node)
    {
      $rootScope.$broadcast('NodeSelected', node);
      $location.path('/tab/home');
    }

    $scope.hasChildContainer=function(node)
    {
      if (model.select) {
        return _.findIndex(node.children, function (node) {
            return node.data.type === $scope.model.NODETYPES.CONTAINER;
          }) !== -1;
      }
      else
      {
        return node.children.length > 0;
      }
    }



  })



