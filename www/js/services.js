angular.module('starter.services', [])

  .factory('TreeViewService', function ($http, localStorageService, _, TreeNode, CircularJSON) {
    var self=this;
    self.viewNodes = [];
    self.root = null;
    self.current = null;
    self.viewRefreshHandler = null;

    function PrepareViewNode(node) {
      var cloned = _.cloneDeep(node);
      cloned.children = [];
      cloned.parent = null;

      return cloned;
    }


    return {
      Init: function (viewRefreshHandler) {
        if (viewRefreshHandler) self.viewRefreshHandler = viewRefreshHandler;
        var storedNodes = localStorageService.get('tree');

        if (storedNodes === null) {
          {
            $http({
              method: 'GET',
              url: '/empty.json'
            }).then(function (response) {

              self.root = new TreeNode({});
              self.current = self.root;

            });
          }
        }
        else {

          var parsed = CircularJSON.parse(storedNodes);
          self.root = new TreeNode().fromJSON(null, parsed);//todo: use static method!
          self.current = self.root;
          _.forEach(self.root.children,function(child)
          {
            self.viewNodes.push(PrepareViewNode(child));
          })
        }
      },
      Save: function () {
        localStorageService.set('tree', CircularJSON.stringify(self.root));
      },
      Remove: function (key) {
        self.root.removeChildByKey(key);
        _.remove(self.viewNodes,{key:key});
        self.viewRefreshHandler();

      },
      MoveToNode: function (node) {

        self.viewNodes = [];

        self.current = self.root.find(node.key);

        console.log(self.current);
        if (self.current === null) throw "its null";

        _.forEach(self.current.children, function (node) {

          self.viewNodes.push(PrepareViewNode(node));
        })

        self.viewRefreshHandler();

      },
      MoveToParentNode: function () {

        self.viewNodes = [];
        self.current = self.current.parent;
        console.log(self.current);
        _.forEach(self.current.children, function (node) {

          self.viewNodes.push(PrepareViewNode(node));
        })

        self.viewRefreshHandler();

      },
      AddNode: function (text) {

        var node = new TreeNode({value: text});
        self.current.addChild(node);
        self.viewNodes.push(PrepareViewNode(node));

        self.viewRefreshHandler();
      },
      GetView:function()
      {
        return self.viewNodes;
      },
      HasParent:function()
      {
        return self.current.parent != null;
      }
    }
  });

