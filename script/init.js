var svgWidth = 500;
var svgHeight = 750;
var allTrees = [];

var rootTree = Tree(svgWidth/2, svgHeight, 25, 'black');
rootTree.angle = 0;       
allTrees.push(rootTree);

for (var i = 0; i < 5; i++){
	allTrees.push(rootTree.insert());
	for(var j = 0; j < 5; j++){
		allTrees.push(rootTree.children[i].insert())
	}
}


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


console.dir(allTrees);
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