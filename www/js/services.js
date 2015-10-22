angular.module('starter.services', [])

  .factory('TreeViewService', function ($http, $q, localStorageService, _, TreeNode, CircularJSON) {
    var self = this;

    self.root = new TreeNode({value:"root"});
    self.key=0;

    self.current = root;
/*    self.viewRefreshHandler = null;*/
    self.deferred = $q.defer();

/*
    if (viewRefreshHandler) self.viewRefreshHandler = viewRefreshHandler;*/
    var storedNodes = localStorageService.get('tree');

    if (storedNodes === null) {
      {
        $http({
          method: 'GET',
          url: '/empty.json'
        }).then(function (response) {

          var nodes = new TreeNode().fromJSON(null, response.data);//todo: use static method!
          _.forEach(nodes,function(node)
          {
            self.root.children.push(node);
          }

          self.deferred.resolve(self.root);
        });
      }
    }
    else {

      var parsed = CircularJSON.parse(storedNodes);
      self.root = new TreeNode().fromJSON(null, parsed);//todo: use static method!
      self.current = self.root;
      self.deferred.resolve(self.root);
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

        self.current = self.root.find(node.key);

        if (self.current === null) throw "its null";

       /* self.viewRefreshHandler();*/

      },
      MoveToParentNode: function () {

        self.current = self.current.parent;

     /*   self.viewRefreshHandler();*/

      },
      AddNode: function (text) {

        var node = new TreeNode({value: text});
        self.current.addChild(node);

       /* self.viewRefreshHandler();*/
      },
      GetView: function () {
        return self.current;
      },
      HasParent: function () {
        return self.current.parent != null;
      },
      GetRoot: function () {
        return self.deferred.promise;// self.root;
      },



    }
  });

