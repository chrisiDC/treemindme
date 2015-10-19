angular.module('starter.controllers', [])


    .controller('BaseCtrl', function ($scope, $http, localStorageService, $ionicPopup, TreeNode, CircularJSON) {


        var root = null;
        var current = null;
        $scope.nodes = [];

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
            root = new TreeNode().fromJSON(null,parsed);
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

        $scope.PopupAdd = function (node) {
            $scope.popupData = {};
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="popupData.nodeText" autofocus>',
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
                            OnNodeAdd(node, $scope.popupData.nodeText);


                        }
                    }
                ]
            });
        }

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

        function OnNodeAdd(node, nodeText) {

            root.find(node.key).addChild(new TreeNode({value: nodeText}));
            $scope.nodes.push(node);
        }


    })
    .controller('HomeCtrl', function ($scope, TreeService) {

        var editNode = null;


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

                var clone = _.cloneDeep(node);
                clone.children = [];
                clone.parent = null;
                $scope.nodes.push(clone);
            })

        }


    })







