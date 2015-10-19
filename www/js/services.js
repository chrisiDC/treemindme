angular.module('starter.services', [])

  .factory('TreeService', function ($http, $q, localStorageService, _) {

    var nodes = [];
    var parents = [];
    var current=null;

    var storedNodes = localStorageService.get('tree');

    if (!storedNodes || storedNodes.length === 0) {
      {
        $http({
          method: 'GET',
          url: '/example.json'
        }).then(function (response) {
          current = response.data.nodes;
          AddNodes(response.data);
        });
      }
    }
    else
    {
      current=storedNodes;
      AddNodes(storedNodes);
    }

    function Reset(nodes)
    {
      current.length = 0;
      _.forEach(nodes, function (node) {
        current.push(node);
      });
    }

    function AddNodes(nodesToAdd) {
      _.forEach(nodesToAdd, function (node) {
        nodes.push(node);
      });
    }

    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    };

    return {
      Save: function () {
        localStorageService.set('tree', nodes);
      },
      AddNode: function (name) {
        var node = {};

        node.id = guid();
        node.name = name;
        nodes.push(node);

      },
      RemoveNode: function (id) {
        _.remove(nodes, function (node) {
          return node.id === id;
        });

      },
      Expand: function (nodeId) {
        var node = _.find(nodes, {id: nodeId});

        parents[nodeId] = current;
        current=node.nodes;

      },

      Collapse: function (nodeId) {

        current = parents[nodeId];


      },

      Get: function () {
        return current;
      }
    }
  });
