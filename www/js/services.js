angular.module('starter.services', [])

  .factory('TreeService', function ($http, localStorageService, _, TreeNode) {


    var tree = null;
    var storedNodes = localStorageService.get('tree');

    if (!storedNodes || storedNodes.length === 0) {
      {
        $http({
          method: 'GET',
          url: '/example.json'
        }).then(function (response) {

          tree = new TreeNode(response.data);
        });
      }
    }
    else {
      tree = new TreeNode();
    }

    /*    function Reset(nodes)
     {
     current.length = 0;
     _.forEach(nodes, function (node) {
     current.push(node);
     });
     }*/

    /*function AddNodes(nodesToAdd) {
     _.forEach(nodesToAdd, function (node) {
     nodes.push(node);
     });
     }*/


    return {
      GetTree: function () {
        return tree;
      },
      Save: function () {
        localStorageService.set('tree', tree.GetRoot());
      },
      AddNode: function (name) {

        tree.addChild(new TreeNode({name: name}));
      },
      RemoveNode: function (node) {
        tree.removeChild(node);
      },
      Expand: function (nodeId) {
        var node = _.find(nodes, {id: nodeId});

        parents[nodeId] = current;
        current = node.nodes;

      },

      Collapse: function (nodeId) {

        current = parents[nodeId];


      },

      Get: function () {
        return current;
      }
    }
  })

  .factory('TreeViewService', function ($http,localStorageService, _, TreeNode,CircularJSON) {

    var nodes = [];
    var root = null;
    var current = null;


    return {
      Init:function()
      {
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
      }
    }
  });

