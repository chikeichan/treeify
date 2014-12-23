var svgWidth = 500;
var svgHeight = 750;
var allTrees = [];

var rootTree = Tree(svgWidth/2, svgHeight, 10, 'black');
rootTree.angle = 0;       
allTrees.push(rootTree);


setTimeout(function(){
//want to call insert on rootTree 1ce for every element in ParsedDOM
//after inserting, put element in the treeQueue
//

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

for (var i = 0 ; i < parsedDOM.length; i++){
	scrape(parsedDOM[i], rootTree);
	rootTree.isLeaf = false;
}
console.dir(allTrees);
var leafCoordinates = [];
_.each(allTrees,function(tree,index){
	if(tree.isLeaf){
		leafCoordinates.push(tree.nextRoot())
	}
})
console.log(leafCoordinates);
//




var svg = d3.select('body').append('svg')
						.attr('class','tree')
						.attr('width',svgWidth)
						.attr('height',svgHeight)

svg.selectAll('rect').data(allTrees)
	.enter().append('rect')
		.attr('x',function(d){return d.root.x - d.width/2})
		.attr('y',function(d){return d.root.y-d.height})
		.attr('height',function(d){return d.height})
		.attr('width',function(d){return d.width})
		.attr('fill', function(d){return d.color})
		.attr('transform',function(d){return 'rotate(' + d.angle + ' ' + d.root.x + ' ' + d.root.y + ')'})

svg.selectAll('circle').data(leafCoordinates)
	.enter().append('circle')
	.attr('cx',function(d){return d.x})
	.attr('cy',function(d){return d.y})
	.attr('r','5')
	.attr('fill','red')


//console.dir(allTrees);
/*
d3.select('svg').append('circle')
	.attr('cx',250)
	.attr('cy',750)
	.attr('r','10')
	.attr('fill','red')
*/
/*
svg.selectAll('rect').data([{},{width:50,height:200,level:2,ox:250,oy:550}])
	.enter().append('rect')
		.attr('x',function(d){return svgWidth/2-d.width/2})
		.attr('y',function(d){return svgHeight-d.height*d.level})
		.attr('height',function(d){return d.height})
		.attr('width',function(d){return d.width})
		.attr('fill','red')
		.attr('transform','rotate(-25 250 550)')

svg.selectAll('rect').data([{},{},{width:50,height:200,level:3}])
	.enter().append('rect')
		.attr('x',function(d){return 165.47})
		.attr('y',function(d){return 151.76})
		.attr('height',function(d){return d.height})
		.attr('width',function(d){return d.width})
		.attr('fill','green')
		//.attr('transform','rotate(-25  550)')
*/
},6000)