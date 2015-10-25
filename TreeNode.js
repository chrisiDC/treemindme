var _ = require("lodash");

var key = "";

var self=this;

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

TreeNode.findNode=function(key, rootNode) {
  var i,
    currentChild,
    result;

  var pathItems=[rootNode];

  if (key === rootNode.key) {
    return rootNode;
  } else {

    // Use a for loop instead of forEach to avoid nested functions
    // Otherwise "return" will not work properly
    for (i = 0; i < rootNode.children.length; i += 1) {
      currentChild = rootNode.children[i];

      pathItems.push(currentChild);
      // Search in the current child
      result = TreeNode.findNode(key, currentChild);

      // Return the result if the node has been found
      if (result !== null) {
        return result;
      }
    }

    // The node has not been found and we have no more options
    return null;
  }
}


function TreeNode(data,uniqueId) {

  if (uniqueId != null) this.key = uniqueId;
  else this.key = guid();
  this.data = data;
  this.children = [];
  this.parent = null;


}


TreeNode.fromJSON=function(jsonRoot,treeNodeRoot)
{
  var currentNode=treeNodeRoot;
  if (treeNodeRoot == null) currentNode = new TreeNode(jsonRoot.data,0);

  _.forEach(jsonRoot.children,function(child)
  {
    var childNode = new TreeNode(child.data,child.key);
    childNode.parent=currentNode;
    currentNode.children.push(childNode);

    TreeNode.fromJSON(child,childNode);

  })

  return currentNode;

}



TreeNode.prototype.setParentNode = function (node) {
  this.parent = node;
}

TreeNode.prototype.getParentNode = function () {
  return this.parent;
}

/*TreeNode.prototype.GetRoot = function () {
 var root = null;
 var node = this;
 while (node.parent != null) {
 node = node.parent;
 }

 root = node;

 return root;
 }*/

TreeNode.prototype.addChild = function (node) {
  node.setParentNode(this);
  this.children[this.children.length] = node;
}

TreeNode.prototype.removeChild = function (child) {
  _.remove(this.children, function (item) {
    return item.key === child.key
  });
}

TreeNode.prototype.removeChildByKey = function (key) {


  //var root = this.GetRoot();
  var nodeToRemove = TreeNode.findNode(key, this);

  if (nodeToRemove !== null) _.remove(nodeToRemove.parent.children, function (item) {
    return item.key === key
  });
}

TreeNode.prototype.getChildren = function () {
  return this.children;
}

TreeNode.prototype.removeChildren = function () {
  this.children = [];
}

TreeNode.prototype.GetData = function () {
  return this.data;
}



TreeNode.prototype.PathByValue = function () {

  var items = [];

  var node = this;

  while (node != null)
  {

    items.push(node);
    node = node.parent;
  }


  return items.reverse();
}


module.exports = TreeNode;
