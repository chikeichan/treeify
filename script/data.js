//Data Manipulation
var Tree = function(x, y, width, color){
	var tree = {};
	tree.root = {'x': x, 'y': y};
	tree.height = findRandom(200,100);
	tree.width = width;
	tree.color = color; 
	tree.angle = findRandom(55,-55); // Denominated in degrees.
	tree.isLeaf = true;
	tree.children = [];

	tree.insert = function(){
		//Create new root (x,y), 
		var newRoot = nextRoot.call(this);
		var newTree = Tree(newRoot.x, newRoot.y, this.width/2, this.color);
		this.children.push(newTree);
		return newTree;

	};
	tree.visualize = function(){
		//should return an array of all children ready for d3
	};

	var nextRoot = function(){
		//takes in the current Tree's x, y, and outputs an object with the next level's root
		var radian = toRadian(this.angle);
		newX = this.root.x + this.height * (Math.sin(radian));
		newY = this.root.y - this.height * (Math.cos(Math.abs(radian)));
		return {'x': newX, 'y': newY};
	};
	var toDegree = function(radian){
		return radian*(180/Math.PI);
	};
	var toRadian = function(degree){
		return degree*(Math.PI/180);
	}

	return tree;
};

var findRandom = function(max,min){
	return Math.floor(Math.random()*(max-min))+ min;
}

