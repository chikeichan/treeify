//Data Manipulation
var Tree = function(x, y, width, color){
	var tree = {};
	tree.root = {'x': x, 'y': y};
	tree.height = findRandom(100,25);
	tree.width = width;
	tree.color = color; 
	tree.angle = findRandom(65,-65); // Denominated in degrees.
	tree.isLeaf = true;
	tree.children = [];

	tree.insert = function(){
		//Create new root (x,y), 
		var newRoot = this.nextRoot();
		var newTree = Tree(newRoot.x, newRoot.y, this.width/1.2, this.color);
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

var test;

$.get('/api/url',function(data){
	test = data;
})

var parsedDOM;
setTimeout(function(){
	parsedDOM = $.parseHTML(test);	
},5000)



