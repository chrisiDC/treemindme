angular.module('starter.services', [])

  .factory('TreeViewService', function ($http, $q, localStorageService, _, TreeNode, CircularJSON) {
    var self = this;

    this.NODETYPES=
    {
      VALUE:1,
      CONTAINER:2,
      SPEECH:3
    };
    this.NODEIDS=
    {
      root:0,
      inbox:1
    };


    this.root = new TreeNode({type:this.NODETYPES.CONTAINER, value: "root",constant:true},this.NODEIDS.root,{show:true});

    this.root.addChild(new TreeNode({type:this.NODETYPES.CONTAINER,value:"inbox",constant:true},this.NODEIDS.inbox,{show:true}));


    this.current = this.root;
    this.initialized = false;


    this.init = function () {

      var deferred = $q.defer();
      var storedNodes = localStorageService.get('tree');


      if (storedNodes === null) {

        /* $http({
         method: 'GET',
         url: '/empty.json'
         }).then(function (response) {

         self.root = new TreeNode().fromJSON(null, response.data);//todo: use static method!
         self.current = self.root;
         deferred.resolve();
         });*/

        this.initialized = true;
        deferred.resolve();
      }
      else {

        var parsed = CircularJSON.parse(storedNodes);
        //var root = _.assign(new TreeNode(),parsed);
        //root.children =[];
        this.current = TreeNode.fromJSON(parsed,new TreeNode({},0));
        this.root = this.current;
        this.initialized = true;
        deferred.resolve();
      }

      return deferred.promise;


    }
    /* function AddNodes(jsonData) {


     _.forEach(nodes, function (node) {
     self.current.node.children.push(node);
     });
     }*/

    return {
      NODETYPES:self.NODETYPES,
      Save: function () {
        localStorageService.set('tree', CircularJSON.stringify(self.root));
      },
      Remove: function (key) {
        self.root.removeChildByKey(key);

      },
      MoveToRoot: function () {
        self.current = self.root;
      },
      MoveToNode: function (node) {

        self.current = TreeNode.findNode(node.key,self.root);


      },
      MoveToParentNode: function () {

        self.current = self.current.parent;


      },
      AddNode: function (text,type,referencedNode) {


        var node = new TreeNode({value: text,type:type});


        if (referencedNode == null) self.current.addChild(node);
        else referencedNode.addChild(node);

        node.show = !(node.parent != null && node.parent.key !== self.NODEIDS.root);

      },
      Current: function () {
        var deferred = $q.defer();

        if (self.initialized)  deferred.resolve(self.current);
        else {
          self.init().then(function () {
            deferred.resolve(self.current)
          });
        }
        return deferred.promise;

      },
      HasParent: function () {
        var hasParent = self.current != null && self.current.key != 0;// (self.current != null && self.current.parent != null);
        return hasParent;
      },
      GetValuePath: function () {
        var items = self.current.PathByValue();
        var path = "home";
        var depth=0;
        _.forEach(items,function(item)
        {
          if (depth !== 0)
          {
            path+="/"+item.data.value

          }

          depth++;
        });
        return path;
      },
      GetInbox:function()
      {
        return TreeNode.findNode(self.NODEIDS.inbox,self.root);
      }


    }
  });


