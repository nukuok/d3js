var sort1 = function() {
    selected.select('svg')
	.selectAll('rect')
	.sort(function (a,b) {
	    return d3.ascending(a,b);
	})
	.transition()
	.duration(1000)
	.attr("x",function(d,i) {
	    return rectValueScaleX(i);
	})
}
