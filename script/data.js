//Data Manipulation
var Tree = function(x,y){
	var tree = {};

	tree.root = {x: x, y:y}
	//level of tree, also represent x
	tree.level = 0;

	//level of tree, also represent height
	tree.height = 20;

	tree.children = [];
	tree.drawLeave = function(){
		//should return true if no children
	}
	tree.insert = function(x,y){
		//should insert new tree as children

	};
	tree.visualize = function(){
		//should return an array of all children ready for d3
	};
}

var tree = Tree(250,750);
tree.visualize();

