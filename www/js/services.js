angular.module('starter.services', [])

  .factory('TreeViewService', function ($http, localStorageService, _, TreeNode, CircularJSON) {
    var self = this;

    self.root = new TreeNode({value: "root"});
    self.key = 0;

    self.current = {node:self.root};

    var storedNodes = localStorageService.get('tree');

    if (storedNodes === null) {
      {
        $http({
          method: 'GET',
          url: '/empty.txt'
        }).then(function (response) {

          var parsed = CircularJSON.parse(response.data);
          AddNodes(CircularJSON.parse(response.data));

        });
      }
    }
    else {

      var parsed = CircularJSON.parse(storedNodes);
      AddNodes( CircularJSON.parse(storedNodes));
      var x = 1;

    }

    function AddNodes(jsonData) {

      var nodes = new TreeNode().fromJSON(self.root, jsonData);//todo: use static method!
      _.forEach(nodes.children, function (node) {
        self.current.node.children.push(node);
      });
    }

    return {
      /*  Init: function (viewRefreshHandler) {
       if (viewRefreshHandler) self.viewRefreshHandler = viewRefreshHandler;
       var storedNodes = localStorageService.get('tree');

       if (storedNodes === null) {
       {
       $http({
       method: 'GET',
       url: '/empty.json'
       }).then(function (response) {

       self.root = new TreeNode().fromJSON(null, response.data);//todo: use static method!
       self.current = self.root;
       deferred.resolve();
       });
       }
       }
       else {

       var parsed = CircularJSON.parse(storedNodes);
       self.root = new TreeNode().fromJSON(null, parsed);//todo: use static method!
       self.current = self.root;
       deferred.resolve();
       }

       return deferred.promise;
       },*/
      Save: function () {
        localStorageService.set('tree', CircularJSON.stringify(self.root));
      },
      Remove: function (key) {
        self.root.removeChildByKey(key);

        /*        self.viewRefreshHandler();*/

      },
      MoveToNode: function (node) {

        self.current.node = self.root.find(node.key);


      },
      MoveToParentNode: function () {

        self.current.node = self.current.node.parent;

        /*   self.viewRefreshHandler();*/

      },
      AddNode: function (text) {

        var node = new TreeNode({value: text});
        self.current.node.addChild(node);

        /* self.viewRefreshHandler();*/
      },
      Current: function () {
        return self.current;
      },
      HasParent: function () {
        return self.current.node.parent != null;
      },



    }
  });

