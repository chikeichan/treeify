var svgWidth = 500;
var svgHeight = 750;
var allTrees = [];

var rootTree = Tree(svgWidth/2, svgHeight, 15, 'black');
rootTree.angle = 0;       
allTrees.push(rootTree);

var scrape = function(node,ctx){
	//base case
	// debugger;
	allTrees.push(ctx.insert());
	var newCTX = ctx.children[ctx.children.length-1];
	if(node.childNodes.length !== 0){
		for(var i = 0; i<node.childNodes.length; i++){
			scrape(node.childNodes[i],newCTX);
			//scrape(node.childNodes[i],ctx.children[i])
		}
	}
}
setTimeout(function(){
//want to call insert on rootTree 1ce for every element in ParsedDOM
//after inserting, put element in the treeQueue
//

var domQueue = [];
var treeQueue = [rootTree];
for(var j = 0; j<parsedDOM.length; j++){
	scrape(parsedDOM[j],rootTree)
}
console.log(allTrees);
// while(domQueue.length!==0){
// 	domQueue.push(domQueue[0])
// }


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