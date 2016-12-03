// function changeRowColor(rowId){
//     var _ = d3.select(oneUserSvg.node()
// 		      .querySelector("#barGraph")
// 		      .childNodes[rowId]).selectAll("rect")
// 	.attr('fill', function(d,i){
// 	    return d3.rgb(255,
// 			  200 - 144 * rectValueScaleColor(d),
// 			  200 - 144 * rectValueScaleColor(d));
// 	})}

// function reverseRowColor(rowId){
//     var _ = d3.select(oneUserSvg.node()
// 		      .querySelector("#barGraph")
// 		      .childNodes[rowId]).selectAll("rect")
// 	.attr('fill', function(d,i,j){
// 	    return d3.rgb(200 - 144 * rectValueScaleColor(d),
// 			  200 - 144 * rectValueScaleColor(d),
// 			  255);
// 	})}

function reverseUserColor(){
    theseBars.merge(theseBars)
	.attr('fill', function(d,i){
	    return d3.rgb(200 - 144 * rectValueScaleColor(d[1]),
			  200 - 144 * rectValueScaleColor(d[1]),
			  255)})
    // var dataSetMax = d3.max(dataSet, function(d){return d3.max(d);})

    // rectValueScaleColor = d3.scaleLinear()
    // 	.domain([0, dataSetMax])
    // 	.range([0, 1])

    // var mame = d3.select(oneUserSvg.node().querySelector("#barGraph").childNodes[i])
    // mame.selectAll("rect").merge(mame)
    // 	// .transition()
    // 	// .duration(1000)
    // 	.attr('fill', function(d,i){
    // 	    var c = 200 - 144 * rectValueScaleColor(d[1]);
    // 	    return d3.rgb(c,
    // 			  c,
    // 			  255);
    // 	})

    // recommendSet[i].map(function(d){
    // 	rectValueScaleColor = d3.scaleLinear()
    // 	    .domain([0, dataSetMax])
    // 	    .range([0, 1])

    // 	d3.select(oneUserSvg.node().querySelector("#barGraph").childNodes[d])
    // 	    .selectAll("rect")
    // 	    // .transition()
    // 	    // .duration(1000)
    // 	    .attr('fill', function(d,i){
    // 		var c = 200 - 144 * rectValueScaleColor(d[1]);
    // 		return d3.rgb(c,
    // 			      c,
    // 			      255);
    // 	    })})
}

function changeNewUserColor(i){
    dataSetMax = d3.max(dataSet, function(d){return d3.max(d);})
    // var dataSetMax = d3.max(dataSet[i])
    reverseUserColor();

    rectValueScaleColor = d3.scaleLinear()
	.domain([0, dataSetMax])
	.range([0, 1])

    var mame = d3.select(oneUserSvg.node().querySelector("#barGraph").childNodes[i])
    mame.selectAll("rect").merge(mame)
	// .transition()
	// .duration(1000)
	.attr('fill', function(d,i){
	    var c = 200 - 144 * rectValueScaleColor(d[1]);
	    return d3.rgb(255,
			  c,
			  c);
	})

    recommendSet[i].map(function(d){
	dataSetMax = d3.max(dataSet, function(d){return d3.max(d);})
	// var dataSetMax = d3.max(dataSet[d])

	rectValueScaleColor = d3.scaleLinear()
	    .domain([0, dataSetMax])
	    .range([0, 1])

	d3.select(oneUserSvg.node().querySelector("#barGraph").childNodes[d])
	    .selectAll("rect")
	    // .transition()
	    // .duration(1000)
	    .attr('fill', function(d,i){
		var c = 200 - 144 * rectValueScaleColor(d[1]);
		return d3.rgb(c,
			      255,
			      c);
	    })})
}

function changePaths(i){
    toDraw = [[i,0]]
    d3.range(recommendNum).map(function(d){toDraw.push([recommendSet[i][d], d+1])})

    pathGroup.selectAll("path")
	.data(toDraw)
	.transition()
	.duration(150)
	.attr("d", function(d){return lineFunction(generateLineData(d[0],d[1]))})
}

function changeRecommend(i){
    dataSetMax = d3.max(dataSet, function(d){return d3.max(d);})
    // dataSetMax = d3.max(dataSet[i])

    rectValueScaleY = d3.scaleLinear()
	.domain([0, dataSetMax])
	.range([0, ysteptarget])

    rectValueScaleX = d3.scaleLinear()
	.domain([0, dataSet[0].length - 1])
	.range([0, xsteptarget * dataSet[i].length - xsteptarget])

    rectValueScaleColor = d3.scaleLinear()
	.domain([0, dataSetMax])
	.range([0, 1])

    recommendGroup.select('g')
	.selectAll('rect')
	.data(dataSet[i])
	.transition()
	.duration(150)
	.attr('x', function(d,i) {return xlefttarget + rectValueScaleX(i);})
	.attr('y', function(d) {return ytoptarget + histHeight - rectValueScaleY(d);})
	.attr('width', function(d) {return xsteptarget;})
	.attr('height', function(d) {return rectValueScaleY(d);})
	.attr('fill', function(d,i){
	    return d3.rgb(255,
			  200 - 144 * rectValueScaleColor(d),
			  200 - 144 * rectValueScaleColor(d))})
}

function changeRecommendResults(ii){
    d3.range(recommendNum).map(function(rtid){
	targetId = recommendSet[ii][rtid]
	dataSetMax = d3.max(dataSet, function(d){return d3.max(d);})
	// dataSetMax = d3.max(dataSet[targetId])

	rectValueScaleY = d3.scaleLinear()
	    .domain([0, dataSetMax])
	    .range([0, ysteptarget])

	rectValueScaleX = d3.scaleLinear()
	    .domain([0, dataSet[0].length - 1])
	    .range([0, xsteptarget * dataSet[0].length - xsteptarget])

	rectValueScaleColor = d3.scaleLinear()
	    .domain([0, dataSetMax])
	    .range([0, 1])

	// console.log(rtid)
	recommendGroup.select("g.recommendResult" + rtid)
	    .selectAll('rect')
	    .data(dataSet[targetId])
	    .transition()
	    .duration(150)
	    .attr('x', function(d,i) {return xlefttarget + rectValueScaleX(i);})
	    .attr('y', function(d) {return ytoptarget + histHeight * (2 + rtid) - rectValueScaleY(d);})
	    .attr('width', function(d) {return xsteptarget;})
	    .attr('height', function(d) {return rectValueScaleY(d);})
	    .attr('fill', function(d,i){
		// console.log(ii, rtid, targetId)
		return d3.rgb(200 - 144 * rectValueScaleColor(d),
			      255,
			      200 - 144 * rectValueScaleColor(d))})
    })
}

function tableListening(){
    theTable.selectAll('g')
	.on('mouseover', function(d,i){
	    // console.log(i)
	    changeNewUserColor(i);
	    // changePaths(i);
	    recommendUserGroup.remove();
	    addNamesSims(i);
	    changeRecommend(i);
	    changeRecommendResults(i);
	    currentRow = i;})
}

function page05Animation() {
    tableListening();
}

function addBtn05() {
    oneUserSvg.append('g')
	.append('rect')
	.attr("id", "btn05")
	.attr("width", 200)
	.attr("height", 30)
	.attr("x", 600)
	.attr("y", 550)
	.attr("fill","white")
	.attr("stroke","blue")
	.on('click',page05Animation)
}
