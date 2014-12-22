var svgWidth = 500;
var svgHeight = 750;

var svg = d3.select('body').append('svg')
						.attr('class','tree')
						.attr('width',svgWidth)
						.attr('height',svgHeight)

svg.selectAll('rect').data([{width:25,height:200,level:1,cx:250,cy:750}])
	.enter().append('rect')
		.attr('x',function(d){return d.cx-d.width/2})
		.attr('y',function(d){return d.cy-d.height*d.level})
		.attr('height',function(d){return d.height})
		.attr('width',function(d){return d.width})
		.attr('fill','black')


svg.selectAll('rect').data([{},{width:15,height:200,level:2,cx:250,cy:550}])
	.enter().append('rect')
		.attr('x',function(d){return d.cx-d.width/2})
		.attr('y',function(d){return d.cy-d.height})
		.attr('height',function(d){return d.height})
		.attr('width',function(d){return d.width})
		.attr('fill','red')
		.attr('transform','rotate(-25 250 550)')

svg.selectAll('rect').data([{},{},{width:10,height:200,level:3,cx:165.47, cy:368.74}])
	.enter().append('rect')
		.attr('x',function(d){return d.cx-d.width/2})
		.attr('y',function(d){return d.cy-d.height})
		.attr('height',function(d){return d.height})
		.attr('width',function(d){return d.width})
		.attr('fill','green')
		.attr('transform','rotate(-35 165.47 368.74)')

d3.select('svg').append('circle')
	.attr('cx',165.47)
	.attr('cy',368.74)
	.attr('r','10')
	.attr('fill','orange')


var nextCenter = function(oldX,oldY,height,deg){
	var radian = toRadian(deg)
	var newX = oldX + height*(Math.sin(radian));
	var newY = oldY - height*(Math.cos(Math.abs(radian)));
	return [newX,newY]
}

var toDegree = function(radian){
	return radian*(180/Math.PI);
}

var toRadian = function(degree){
	return degree*(Math.PI/180);
}