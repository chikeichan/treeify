//Data Manipulation
var Tree = function(x, y, width, color){
	var tree = {};
	tree.root = {'x': x, 'y': y};
	tree.height = findRandom(50,10);
	tree.width = width;
	tree.color = color; 
	tree.angle = 0; // Denominated in degrees.
	tree.isLeaf = true;
	tree.children = [];

	tree.insert = function(color){
		//Create new root (x,y), 
		var newAngle = this.angle + findRandom(30,-30)
		var newRoot = this.nextRoot();
		var newTree = Tree(newRoot.x, newRoot.y, this.width/1.2, this.color);
		newTree.angle = newAngle;
		this.children.push(newTree);
		return newTree;

	};
	tree.visualize = function(){
		//should return an array of all children ready for d3
	};

	tree.nextRoot = function(){
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
var getOppoColor = function(c1,c2){
	if(c1>=128){
		return c1-c2;
	} else {
		return c1+c2;
	}
}

var getRandomColor = function(){
	var r = findRandom(255,0);
	var g = findRandom(255,0);
	var b = findRandom(255,0);
	var r2 = getOppoColor(r,findRandom(128,100));
	var g2 = getOppoColor(g,findRandom(128,100));
	var b2 = getOppoColor(b,findRandom(128,100));


	var bgColor = 'rgb('+r2+','+g2+','+b2+')'
	var leafColor = 'rgb('+r+','+g+','+b+')'
	return {bgColor: bgColor, leafColor: leafColor}
}







