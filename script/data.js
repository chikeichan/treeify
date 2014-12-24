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
	tree.angle = 0; // Denominated in degrees.
	tree.isLeaf = true;//Init.js compiles all of the leaf nodes after the tree is created, placing circles at the ends of their parent branches.
	tree.children = [];

	/**
	 * Does not traverse the tree to add nodes to the appropriate spot. Only inserts to child array, one level down.
	 * @param  {[type]} color [!! simply passes the parent's color, parameter is likely unnecessary]
	 * @return {[Tree]}       [Return value is used in recursive tree creation (init.js) to track context.]
	 */
	tree.insert = function(color){
		//Create new root (x,y), 
		var newAngle = this.angle + findRandom(30,-30)
		var newRoot = this.nextRoot();
		var newTree = Tree(newRoot.x, newRoot.y, this.width/1.2, this.color);
		newTree.angle = newAngle;
		this.children.push(newTree);
		return newTree;

	};
	//!! not used, but could be refactored so init calls tree.visualize
	tree.visualize = function(){
		//should return an array of all children ready for d3
	};

	/**
	 * Trig-based helper function. 
	 * Inputs: current tree's x and y coordinates. 
	 * @return {[object]} [Coordinates for a child's "root". "Root" here refers to the point at the bottom-middle of the rect,
	 * the center point for any of the child node's rotations.]
	 */
	tree.nextRoot = function(){
		//takes in the current Tree's x, y, and outputs an object with the next level's root
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
 * Global helper functions: !!: could be refactored as methods of the Tree class.
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
	//!! repeated code
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


//!! should probably be a listener function we run in init, so more can be added to it
//!! without floating round in the bottom of the 
var addListeners = function(){

}

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
