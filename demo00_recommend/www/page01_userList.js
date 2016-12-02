var xleft1 = 70
var ytop1 = 20
var xstep1 = 20
var ystep1 = 14

function userDataList(gNode, ii) {
    // pageConfigUpdate()
    oneUserGraphGroup = d3.select(gNode)

    var _ = oneUserGraphGroup
	.selectAll('rect')
	.data(dataSet[ii])
	.attr("stroke-opacity", 1)
	.transition()
	.duration(800)
	.attr("x", function(d,i){return xleft1 + i * xstep1})
	.attr("y", ytop1 + ystep1 * ii)
	.attr("fill", "none")
	.attr("stroke-opacity", 0)
	.attr("stroke", "black")
	.attr("width", xstep1)
	.attr("height", ystep1)

    var _ = oneUserGraphGroup
	.selectAll('text')
	.transition()
	.duration(800)
	.attr("font-family","sans-serif")
	.attr("font-size","8px")
	.attr("text-anchor","middle")
	.attr("x", function(d,i){return xleft1 + i * xstep1 + xstep1 / 2})
	.attr("y", ytop1 + ystep1 * 3 / 4 + ystep1 * ii)
	.text(function(d,i){return d})
}

function updateUserName(textNode, ii) {
    var _ = d3.select(textNode)
	.transition()
	.duration(800)
	.attr("font-family","sans-serif")
	.attr("font-size","8px")
	.attr("x", xleft1 - xstep1 * 3)
	.attr("y", ytop1 + ystep1 * 3 / 4 + ystep1 * ii)
}

function page01Animation(){
    oneUserSvg.node().querySelector("#rname").remove()
    userDataList(oneUserSvg.node().querySelector("#data0"),0)
    userDataList(oneUserSvg.node().querySelector("#data1"),12)
    userDataList(oneUserSvg.node().querySelector("#data2"),35)
    updateUserName(oneUserSvg.node().querySelector("#text0"),0)
    updateUserName(oneUserSvg.node().querySelector("#text1"),12)
    updateUserName(oneUserSvg.node().querySelector("#text2"),35)

    oneUserSvg.node().querySelector("#btn01").remove()
    addBtn02()
}

function addBtn01() {
    oneUserSvg.append('g')
	.append('rect')
	.attr("id", "btn01")
	.attr("width", 200)
	.attr("height", 30)
	.attr("x", 600)
	.attr("y", 550)
	.attr("fill","white")
	.attr("stroke","blue")
	.on('click',page01Animation)
}

addBtn01()
