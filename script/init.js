//!!High level changes; Should break our methods into two sections: 
//!(1)Draw-related functions that use the allTrees and leafCoordinates arrays.
//!! (2) Traversal functions, that recursively scrape dom nodes, or create the tree. Our implementation does both at the same time.

var svgWidth = $(document).width()*0.8;
var svgHeight = svgWidth;
var allTrees = [];

//Instantiates the root. Only time Tree is called.
var rootTree = Tree(svgWidth/2, svgHeight, svgWidth/200, 'black');
rootTree.angle = 0;       
allTrees.push(rootTree);

//!!(not used anymore?)
var test;

$('input').on('keydown',function(e){
	var query = $(this).val();
	if(e.keyCode === 13){
		d3.select('svg').remove();

		$.post('/api/url',{query:query})
		setTimeout(function(){
			$.get('/api/url',function(data){
				test = data;
			})
			parsedDOM = $.parseHTML(test);	
			rootTree = Tree(svgWidth/2, svgHeight, svgWidth/200, 'black');
			rootTree.angle = 0;       
			allTrees = [];
			allTrees.push(rootTree);

//Old commenting we can remove after the refactor:
//want to call insert on rootTree 1ce for every element in ParsedDOM
//after inserting, put element in the treeQueue
//

/**
 * Refactor into "recurseNode"; 
 * Note the calling function is below it
 */
var scrape = function(domNode,ctx){
	allTrees.push(ctx.insert());
	var childContext = ctx.children[ctx.children.length-1];
	if (domNode.childNodes.length > 0){
		childContext.isLeaf = false;
		for (var i = 0 ; i < domNode.childNodes.length; i++){
			scrape(domNode.childNodes[i], childContext);
		}
	}
}
//Refactor into "callFirstLevelOfDOMNodes", and note that it creates the first children of the root tree
for (var i = 0 ; i < parsedDOM.length; i++){
	scrape(parsedDOM[i], rootTree);
	rootTree.isLeaf = false;
}

//!! refactor into a "setUpLeaves" function
var leafCoordinates = [];
_.each(allTrees,function(tree,index){
	if(tree.isLeaf){
		leafCoordinates.push(tree.nextRoot())
	}
})
//!!refactor into an "assignColors" subroutine, possibly inside setUpLeaves;
var color = getRandomColor();

$('input#leafcolor').val(color.leafColor);
$('input#bgcolor').val(color.bgColor);

//!! refactor into a draw tree function; parts of this could move to data.js, in Tree.visualize();
// Seems simpler to continue iterating over the arrays though, and deprecate visualize().
var svg = d3.select('body').append('svg')
						.attr('class','tree')
						.attr('width',svgWidth)
						.attr('height',svgHeight)
						// .style('background-color',color.bgColor)
						.style('background',color.bgColor);

svg.selectAll('rect').data(allTrees)
	.enter().append('rect')
		.attr('x',svgWidth/2)
		.attr('y',svgHeight)
		.attr('height',0)
	.transition().duration(5000).delay(i=i+0)
		.attr('x',function(d){return d.root.x - d.width/2})
		.attr('y',function(d){return d.root.y-d.height})
		.attr('height',function(d){return d.height})
		.attr('width',function(d){return d.width})
		.attr('fill', function(d){return d.color})
		.attr('transform',function(d){return 'rotate(' + d.angle + ' ' + d.root.x + ' ' + d.root.y + ')'});


//!! refactor into "drawNodes", "setUpLeaves" down, make it clear that these serve the same purpose:
//painting on the circles that represent leaf nodes after the Tree is drawn
svg.selectAll('circle').data(leafCoordinates)
	.enter().append('circle')
	.attr('r',0)
.transition().duration(5000).delay(5000)
	.attr('cx',function(d){return d.x})
	.attr('cy',function(d){return d.y})
	.attr('r',function(d){return findRandom(svgWidth/200,svgWidth/1000);})
	.attr('fill',color.leafColor);

//!!deleted 30 lines of early tests appending leaves. practice note: old could should just be visible in old commits.


//!! adding a call to addListeners here, newly defined (but empty) in data.js
addListeners();
		})
	}
})
