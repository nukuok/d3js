var currentRow = 0
var padding = 0
var dataSetMax
var rectValueScaleY
var rectValueScaleX
var rectValueScaleColor

function changeRowColor(rowId){
    var _ = d3.select(oneUserSvg.node()
		      .querySelector("#barGraph")
		      .childNodes[rowId]).selectAll("rect")
	.attr('fill', function(d,i){
	    return d3.rgb(255,
			  200 - 144 * rectValueScaleColor(d),
			  200 - 144 * rectValueScaleColor(d));
	})}

function addSvgDiv(){
    var gGroup = oneUserSvg.append('g')
	.attr('id','barGraph')
	.selectAll('g')
	.data(dataSet)
	.enter()
	.append('g')
	// .on('mouseover', function(d,i){
	//     reverseRowColor(currentRow);
	//     changeRowColor(i);
	//     updateSelectedDiv(i);
	//     currentRow = i;})

    var rectgroup = gGroup.selectAll('rect')
	.data(function(d,i){return d.map(function(dd){return [i,dd]})})
	.enter()
	.append('rect')

    var _ = rectgroup.merge(rectgroup)
	.attr('x', function(d,i) {return xleft1 + rectValueScaleX(i);})
	.attr('y', function(d) {return ytop1 + ystep1 * (d[0] + 1) - rectValueScaleY(d[1]);})
	.attr('width', function(d) {return xstep1;})
	.attr('height', function(d) {return rectValueScaleY(d[1]);})
	.attr('fill', function(d,i){
	    return d3.rgb(200 - 144 * rectValueScaleColor(d[1]),
			  200 - 144 * rectValueScaleColor(d[1]),
			  255)})
	.attr('opacity', 0)
	.transition()
	.duration(1000)
	.attr('opacity', 1)
}


function reverseRowColor(rowId){
    var _ = d3.select(svgDiv.node()
		      .childNodes[rowId]).selectAll("rect")
	.attr('fill', function(d,i,j){
	    return d3.rgb(200 - 144 * rectValueScaleColor(d),
			  200 - 144 * rectValueScaleColor(d),
			  255);
	})}

// function hideSvgDiv(dataSet){
//     svgDiv.selectAll('svg').remove()
// }


function page03Animation() {

    dataSetMax = d3.max(dataSet, function(d){return d3.max(d);})

    rectValueScaleY = d3.scaleLinear()
	.domain([0, dataSetMax])
	.range([padding, ystep1 - padding])

    rectValueScaleX = d3.scaleLinear()
	.domain([0, dataSet[0].length - 1])
	.range([padding, xstep1 * dataSet[0].length - padding - xstep1])

    rectValueScaleColor = d3.scaleLinear()
	.domain([0, dataSetMax])
	.range([0, 1])


    removePage01Elements();
    addSvgDiv();
    oneUserSvg.node().querySelector("#btn03").remove();

    d3.select(oneUserSvg.node().querySelector('#table'))
	.selectAll('g')
	.selectAll('text.occ')
	.attr("fill-opacity", 1)
	.transition()
	.duration(1000)
	.attr("fill-opacity", 0)
	.remove()

    d3.select(oneUserSvg.node().querySelector('#table'))
	.selectAll('g')
	.selectAll('rect.occ')
	.attr("opacity", 1)
	.transition()
	.duration(1000)
	.attr("opacity", 0)
	.remove()
}

function addBtn03() {
    oneUserSvg.append('g')
	.append('rect')
	.attr("id", "btn03")
	.attr("width", 200)
	.attr("height", 30)
	.attr("x", 600)
	.attr("y", 550)
	.attr("fill","white")
	.attr("stroke","blue")
	.on('click',page03Animation)
}
