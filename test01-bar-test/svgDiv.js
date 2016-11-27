function showSvgDiv(dataSet){
    var emptyArray = []

    var svgGroup = svgDiv.selectAll('svg')
	.data(dataSet)
	.enter()
	.append('svg')
	.attr('width', svgWidth)
	.attr('height', svgHeight)
	.on('mouseover', function(d,i){
	    reverseRowColor(currentRow);
	    changeRowColor(i);
	    updateSelectedDiv(i);
	    currentRow = i;})

    var rectgroup = svgGroup.selectAll('rect')
	.data(function(d,i){return d;})
	.enter()
	.append('rect')

    var _ = rectgroup.merge(rectgroup)
	.attr('x', function(d,i) {return rectValueScaleX(i);})
	.attr('y', function(d) {return svgHeight - rectValueScaleY(d);})
	.attr('width', function(d) {return barWidth - 1;})
	.attr('height', function(d) {return rectValueScaleY(d);})
	.attr('fill', function(d,i,j){
	    // parentIndex = Array.prototype.indexOf.call(j[i].parentNode.parentNode.childNodes,j[i].parentNode);
	    // // a = svgDiv.node().childNodes[currentRow]
	    return d3.rgb(200 - 144 * rectValueScaleColor(d),
			  200 - 144 * rectValueScaleColor(d),
			  255);
	})
}

function changeRowColor(rowId){
    var _ = d3.select(svgDiv.node()
		      .childNodes[rowId]).selectAll("rect")
	.attr('fill', function(d,i,j){
	    return d3.rgb(255,
			  200 - 144 * rectValueScaleColor(d),
			  200 - 144 * rectValueScaleColor(d));
	})}

function reverseRowColor(rowId){
    var _ = d3.select(svgDiv.node()
		      .childNodes[rowId]).selectAll("rect")
	.attr('fill', function(d,i,j){
	    return d3.rgb(200 - 144 * rectValueScaleColor(d),
			  200 - 144 * rectValueScaleColor(d),
			  255);
	})}

function hideSvgDiv(dataSet){
    svgDiv.selectAll('svg').remove()
}
