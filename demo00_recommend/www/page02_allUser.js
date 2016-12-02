function bringFront(node){
    node.parentElement.appendChild(node)
}

function bringFrontPage01Elements() {
    bringFront(oneUserSvg.node().querySelector("#data0"))
    bringFront(oneUserSvg.node().querySelector("#data1"))
    bringFront(oneUserSvg.node().querySelector("#data2"))
    bringFront(oneUserSvg.node().querySelector("#text0"))
    bringFront(oneUserSvg.node().querySelector("#text1"))
    bringFront(oneUserSvg.node().querySelector("#text2"))
}

function removePage01Elements() {
    oneUserSvg.node().querySelector("#data0").remove()
    oneUserSvg.node().querySelector("#data1").remove()
    oneUserSvg.node().querySelector("#data2").remove()
    oneUserSvg.node().querySelector("#text0").remove()
    oneUserSvg.node().querySelector("#text1").remove()
    oneUserSvg.node().querySelector("#text2").remove()
}

function page02Animation() {
    var gGroups = oneUserSvg.append('g')
	.attr("id", "table")
	.selectAll('g')
	.data(dataSet)
	.enter()
	.append('g')

    var _ = gGroups.selectAll('rect')
	.data(function(d,i){return d.map(function(dd){return [i,dd]});})
	.enter()
	.append('rect')
	.attr("class", "occ")
	.attr("x", function(d,i){return xleft1 + i * xstep1})
	.attr("y", function(d,i){return ytop1 + ystep1 * d[0]})
	.attr("fill", "none")
	.attr("stroke-opacity", 0.2)
	.attr("stroke", "black")
	.attr("width", xstep1)
	.attr("height", ystep1)

    var _ = gGroups.selectAll('text')
	.data(function(d,i){return d.map(function(dd){return [i,dd]});})
	.enter()
	.append('text')
	.attr("class", "occ")
	.attr("font-family","sans-serif")
	.attr("font-size","8px")
	.attr("text-anchor","middle")
	.attr("x", function(d,i){return xleft1 + i * xstep1 + xstep1 / 2})
	.attr("y", function(d,i){return ytop1 + ystep1 * 3 / 4 + ystep1 * d[0]})
	.text(function(d,i){return d[1]})

    var _ = gGroups.append('text')
	.attr("font-family","sans-serif")
	.attr("font-size","8px")
	.attr("x", function(d,i){return xleft1 - xstep1 * 3})
	.attr("y", function(d,i){return ytop1 + ystep1 * 3 / 4 + ystep1 * i})
	.text(function(d,i){return userNames[i]})

    var _ = gGroups.append('rect')
	.data(d3.range(dataSet.length))
	.attr("x", xleft1)
	.attr("y", function(d,i){return ytop1 + ystep1 * d})
	.attr("fill-opacity",0)
	.attr("fill", "white")
	// .attr("stroke-opacity", 0)
	.attr("stroke", "none")
	.attr("width", xstep1 * dataSet[0].length)
	.attr("height", ystep1)

    var whiteboard = oneUserSvg.append('rect')
	.attr("id", "wb")
	.attr("x", xleft1 - 2 - xstep1 * 3)
	.attr("y", ytop1 - 2)
	.attr("width", xstep1 * 20 + 4 + xstep1 * 3)
	.attr("height", ystep1 * 40 + 4)
	.attr("fill", "white")
	.attr("stroke", "white")

    bringFrontPage01Elements()

    var _ = d3.select(oneUserSvg.node().querySelector("#wb")).transition()
	.duration(1000)
	.attr("height",0)
    	.attr("y", ytop1 + ystep1 * 40 + 2)
	.remove()

    oneUserSvg.node().querySelector("#btn02").remove()
    addBtn03()
}

function addBtn02() {
    oneUserSvg.append('g')
	.append('rect')
	.attr("id", "btn02")
	.attr("width", 200)
	.attr("height", 30)
	.attr("x", 600)
	.attr("y", 550)
	.attr("fill","white")
	.attr("stroke","blue")
	.on('click',page02Animation)
}
