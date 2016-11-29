var xleft = 150
var ytop = 200
var xstep = 30
var ystep = 50

function oneUser(dataSet, ii) {
    oneUserGraphGroup = oneUserSvg.append('g')
	.attr("id",function(d){return 'data' + ii})
	.selectAll('g')
	.data(dataSet)
	.enter()
	.append('g')

    var _ = oneUserGraphGroup
	.append('rect')
	.attr("x", function(d,i){return xleft + i * xstep})
	.attr("y", ytop + ystep * ii)
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
	.attr("y", ytop + ystep * 2 / 3 + ystep * ii)
	.text(function(d,i){return d})
}

d3.json(host.concat("/data-set"), function(d){dataSet = d;
					      oneUser(d[0],0);
					      oneUser(d[12],1);
					      oneUser(d[35],2);
					     })

function oneUserRestaurant(restaurantNames) {
    oneUserGraphGroup = oneUserSvg
	.append('g')
	.attr("id","rname")
	.selectAll('g')
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


function oneUserName(userName, ii) {
    var _ = oneUserSvg
	.append('text')
	.attr("id",function(d){return 'text' + ii})
	.attr("font-family","sans-serif")
	.attr("font-size","20px")
	.attr("x", xleft - xstep * 4)
	.attr("y", ytop + ystep * 2 / 3 + ystep * ii)
	.text(userName)
}
d3.json(host.concat("/user-names"), function(d){userNames = d;
						oneUserName(d[0],0);
						oneUserName(d[12],1);
						oneUserName(d[35],2);})
