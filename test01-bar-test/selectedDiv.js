function updateSelectedDiv(rowId){
    var emptyArray = []
    var _ = selected.select('svg')
	.data(emptyArray)
	.exit()
	.remove()

    var currentSvg = selected.append('svg')
	.attr('width', svgWidth)
	.attr('height', selectedHeight)

    var rectGroup = currentSvg.selectAll('rect')
	.data(dataSet[currentRow])
	.enter()
	.append('rect')
	.attr('x', function(d,i) {return rectValueScaleX(i);})
	.attr('y', function(d) {return selectedHeight - 20 * rectValueScaleY(d);})
	.attr('width', function(d) {return barWidth - 1;})
	.attr('height', function(d) {return 20 * rectValueScaleY(d);})
	.attr('fill', function(d){return d3.rgb(255,
						200 - 144 * rectValueScaleColor(d),
						200 - 144 * rectValueScaleColor(d));})
	// .append("title")
	// .text(function(d) { return d;})

    var _ = currentSvg.selectAll('rect')
	.data(dataSet[rowId])
	// .transition()
	// .duration(1000)
	// .attr('x', function(d,i) {return rectValueScaleX(i) + 8;})
	// .attr('y', function(d) {return 20 * rectValueScaleY(d);})
	.transition()
    // .duration(150)
	// .each(function() {d3.select(this).attr("fill", "black");})
	.attr('x', function(d,i) {return rectValueScaleX(i);})
	.attr('y', function(d) {return selectedHeight - 20 * rectValueScaleY(d);})
	.attr('width', function(d) {return barWidth - 1;})
	.attr('height', function(d) {return 20 * rectValueScaleY(d);})
	.attr('fill', function(d){return d3.rgb(255,
						200 - 144 * rectValueScaleColor(d),
						200 - 144 * rectValueScaleColor(d));})
}
