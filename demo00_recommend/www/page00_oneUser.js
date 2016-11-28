function oneUser(dataSet) {
    var xleft = 100
    var ytop = 200
    var xstep = 30
    var ystep = 50

    oneUserGraphGroup = oneUserSvg.selectAll('svg')
	.data(dataSet)
	.enter()
	.append('g')

    var _ = oneUserGraphGroup
	.append('rect')
    	.attr("x", function(d,i){return xleft + i * xstep})
	.attr("y", ytop)
	.attr("fill", "white")
	.attr("stroke", "black")
	.attr("width", xstep)
	.attr("height", ystep)

    var _ = oneUserGraphGroup
	.append('text')
	.attr("font-family","sans-serif")
	.attr("font-size","20px")
	.attr("text-anchor","middle")
    	.attr("x", function(d,i){return xleft + i * xstep + xstep / 2})
	.attr("y", ytop + ystep * 2 / 3)
	.text(function(d,i){return d})
}

d3.json(host.concat("/data-set"), function(d){dataSet = d; oneUser(d[0])})

function oneUserRestaurant(restaurantNames) {
    var xleft = 100
    var ytop = 200
    var xstep = 30
    var ystep = 50

    oneUserGraphGroup = oneUserSvg.selectAll('svg')
	.data(restaurantNames)
	.enter()
	.append('g')

    var _ = oneUserGraphGroup
	.append('text')
	.attr("font-family","sans-serif")
	.attr("font-size","20px")
    	.attr("x", function(d,i){return xleft + i * xstep + xstep / 2})
	.attr("y", ytop - 5)
	.attr("transform",function(d,i){return "rotate(-60 " + (xleft + i * xstep + xstep / 2) + " " + (ytop - 5) + ")"})
	.text(function(d,i){return d})
}
d3.json(host.concat("/restaurant-names"), function(d){restaurantNames = d; oneUserRestaurant(d)})
