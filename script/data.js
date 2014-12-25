/**
 * Only called when root node is created.
 * Subsequent nodes are creates with tree.insert. 
 * @param {[type]} x     [description]
 * @param {[type]} y     [description]
 * @param {[type]} width [description]
 * @param {[type]} color [description]
 */
var Tree = function(x, y, width, color){
	var tree = {};
	tree.root = {'x': x, 'y': y};
	tree.height = findRandom(svgWidth*0.05,svgWidth*0.01);
	tree.width = width;
	tree.color = color; 
	tree.angle = 0; // In degrees.
	tree.isLeaf = true;
	tree.children = [];
	/**
	 * Does not traverse the tree to add nodes to the appropriate spot. Only inserts to child array, one level down.
	 * @param  {[type]} color []
	 * @return {[Tree]}       [Return value is used in recursive tree creation (init.js) to track context.]
	 */
	tree.insert = function(){
		var newAngle = this.angle + findRandom(30,-30)
		var newRoot = this.nextRoot();
		var newTree = Tree(newRoot.x, newRoot.y, this.width/1.2, this.color);
		newTree.angle = newAngle;
		this.children.push(newTree);
		return newTree;
	};
	/**
	 * Uses (parent) tree's root coordinates to calculate coorindates and rotation origin for next level of trees.
	 * @return {[object]} [Coordinates for a child's "root". "Root" here refers to the point at the bottom-middle of the rect,
	 * the center point for any of the child node's rotations.]
	 */
	tree.nextRoot = function(){
		var radian = toRadian(this.angle);
		newX = this.root.x + this.height * (Math.sin(radian));
		newY = this.root.y - this.height * (Math.cos(Math.abs(radian)));
		return {'x': newX, 'y': newY};
	};
	/**
	 * toDegree and toRadian are helper functions used in nextRoot's calculations.
	 * @param  {[type]} radian [description]
	 * @return {[type]}        [description]
	 */
	var toDegree = function(radian){
		return radian*(180/Math.PI);
	};
	var toRadian = function(degree){
		return degree*(Math.PI/180);
	}

	return tree;
};
/**
 * Global helper functions:
 */
/**
 *	Used to randomize branch length and new branch angle.
 */
var findRandom = function(max,min){
	return Math.floor(Math.random()*(max-min))+ min;
}
/**
 * Used to find a color of appropriate contrast, for different properties of the graph.
 */
var getOppoColor = function(c1,c2){
	if(c1>=128){
		return c1-c2;
	} else {
		return c1+c2;
	}
}
/**
 * Outputs a random color.
 * @return {[type]} [description]
 */
var getRandomColor = function(){
	var r = findRandom(255,0);
	var g = findRandom(255,0);
	var b = findRandom(255,0);
	var r2 = getOppoColor(r,findRandom(128,100));
	var g2 = getOppoColor(g,findRandom(128,100));
	var b2 = getOppoColor(b,findRandom(128,100));

	var bgColor = 'rgb('+r2+','+g2+','+b2+')'
	var leafColor = 'rgb('+r+','+g+','+b+')'
	var gradient = 'linear-gradient(to bottom right, white -15%, '+bgColor+' 80%, black 115%)';

	return {bgColor: bgColor, leafColor: leafColor,gradient: gradient}
}
var addListeners = function(){
	$('input#bgcolor').on('change',function(e){
		$('svg').css('background-color',$(this).val())
	})

	$('input#leafcolor').on('change',function(e){
		$('circle').attr('fill',$(this).val())
	})

	$('input#branchcolor').on('change',function(e){
		$('rect').attr('fill',$(this).val())
	})

	$('input#size').on('blur',function(e){
		svgWidth = $(this).val();
		svgHeight = $(this).val();
	})
}
