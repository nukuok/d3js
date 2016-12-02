var recommendSet
var currentRowId = 0

var xlefttarget = 550
var ytoptarget = 0
var xsteptarget = 12
var ysteptarget = 60

var recommendNum = 5
var recommendGroup
var histHeight = 540/(5 + 1)

var cateNum = 20
var pathFix = 20
var pathBlank = 3
var pathGroup

var lineFunction = d3.line()
    .x(function(d) { return d[0]; })
    .y(function(d) { return d[1]; })
    .curve(d3.curveBasis)

function generateLineData(ii, rtId){
    point1 = [pathBlank + xleft1 + xstep1 * cateNum, ytop1 + ystep1 * ii + ystep1 / 2]
    point2 = [pathBlank + xleft1 + xstep1 * cateNum + pathFix, ytop1 + ystep1 * ii + ystep1 / 2]
    point3 = [xlefttarget - pathBlank - pathFix, ytoptarget + histHeight * rtId + histHeight - ysteptarget / 2]
    point4 = [xlefttarget - pathBlank, ytoptarget + histHeight * rtId + histHeight - ysteptarget / 2]
    return [point1,point2,point3,point4]
}

function changeUserColor(){
    var dataSetMax = d3.max(dataSet[currentRowId])

    rectValueScaleColor = d3.scaleLinear()
	.domain([0, dataSetMax])
	.range([0, 1])

    var mame = d3.select(oneUserSvg.node().querySelector("#barGraph").childNodes[currentRowId])
    mame.selectAll("rect").merge(mame)
	.transition()
	.duration(1000)
	.attr('fill', function(d,i){
	    var c = 200 - 144 * rectValueScaleColor(d[1]);
	    return d3.rgb(255,
			  c,
			  c);
	})

    recommendSet[currentRowId].map(function(d){
	var dataSetMax = d3.max(dataSet[d])

	rectValueScaleColor = d3.scaleLinear()
	    .domain([0, dataSetMax])
	    .range([0, 1])

	d3.select(oneUserSvg.node().querySelector("#barGraph").childNodes[d])
	    .selectAll("rect")
	    .transition()
	    .duration(1000)
	    .attr('fill', function(d,i){
		var c = 200 - 144 * rectValueScaleColor(d[1]);
		return d3.rgb(c,
			      255,
			      c);
	    })})
}

function drawPaths(){
    toDraw = [[0,0]]
    d3.range(recommendNum).map(function(d){toDraw.push([recommendSet[currentRowId][d], d+1])})
    pathGroup = oneUserSvg.append("g")
	.attr("id","path")

    toDraw.map(function(d){pathGroup.append("path")
			   .attr("d", lineFunction(generateLineData(d[0],d[1])))
			   .attr("stroke", "black")
			   .attr("fill", "none")
			   .attr("stroke-opacity", 0)
			   .transition()
			   .duration(1000)
			   .attr("stroke-opacity", 1)
			   ;})
}

function page04NewElements() {
    recommendGroup = oneUserSvg.append('g')
	.attr('id','recommend')

    page04RecommendTarget(recommendGroup)
    d3.json(host.concat("/recommend-for-all"),
	    function(d){recommendSet = d;
			changeUserColor();
			drawPaths();
			d3.range(5).map(
			    function(d){page04RecommendedTargets(recommendGroup, d)})})

}

function page04RecommendTarget(rG) {
    dataSetMax = d3.max(dataSet[currentRowId])

    rectValueScaleY = d3.scaleLinear()
	.domain([0, dataSetMax])
	.range([0, ysteptarget])

    rectValueScaleX = d3.scaleLinear()
	.domain([0, dataSet[0].length - 1])
	.range([0, xsteptarget * dataSet[currentRowId].length - xsteptarget])

    rectValueScaleColor = d3.scaleLinear()
	.domain([0, dataSetMax])
	.range([0, 1])

    var recommendTarget = rG.append('g')
	.attr('id','recommendTarget')
	.selectAll('rect')
	.data(dataSet[currentRowId])
	.enter()
	.append('rect')
	.attr('x', function(d,i) {return xlefttarget + rectValueScaleX(i);})
	.attr('y', function(d) {return ytoptarget + histHeight - rectValueScaleY(d);})
	.attr('width', function(d) {return xsteptarget;})
	.attr('height', function(d) {return rectValueScaleY(d);})
	.attr('fill', function(d,i){
	    return d3.rgb(255,
			  200 - 144 * rectValueScaleColor(d),
			  200 - 144 * rectValueScaleColor(d))})
	.attr("fill-opacity", 0)
	.transition()
	.duration(1000)
	.attr("fill-opacity", 1)
}

function page04RecommendedTargets(rG, rtid) {
    targetId = recommendSet[currentRowId][rtid]
    dataSetMax = d3.max(dataSet[targetId])

    rectValueScaleY = d3.scaleLinear()
	.domain([0, dataSetMax])
	.range([0, ysteptarget])

    rectValueScaleX = d3.scaleLinear()
	.domain([0, dataSet[0].length - 1])
	.range([0, xsteptarget * dataSet[currentRowId].length - xsteptarget])

    rectValueScaleColor = d3.scaleLinear()
	.domain([0, dataSetMax])
	.range([0, 1])

    var recommendTarget = rG.append('g')
	.attr('class','recommendResult' + rtid)
	.selectAll('rect')
	.data(dataSet[targetId])
	.enter()
	.append('rect')
	.attr('x', function(d,i) {return xlefttarget + rectValueScaleX(i);})
	.attr('y', function(d) {return ytoptarget + histHeight * (2 + rtid) - rectValueScaleY(d);})
	.attr('width', function(d) {return xsteptarget;})
	.attr('height', function(d) {return rectValueScaleY(d);})
	.attr('fill', function(d,i){
	    return d3.rgb(200 - 144 * rectValueScaleColor(d),
			  255,
			  200 - 144 * rectValueScaleColor(d))})
	.attr("fill-opacity", 0)
	.transition()
	.duration(1000)
	.attr("fill-opacity", 1)
}

function page04Animation() {
    oneUserSvg.node().querySelector("#btn04").remove()
    page04NewElements()
    addBtn05()
}

function addBtn04() {
    oneUserSvg.append('g')
	.append('rect')
	.attr("id", "btn04")
	.attr("width", 200)
	.attr("height", 30)
	.attr("x", 600)
	.attr("y", 550)
	.attr("fill","white")
	.attr("stroke","blue")
	.on('click',page04Animation)
}
