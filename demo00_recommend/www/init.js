var host = ("http://localhost:8888")

var userNames
d3.json(host.concat("/user-names"), function(d){userNames = d})

var restaurantNames
d3.json(host.concat("/restaurant-names"), function(d){restaurantNames = d})

var dataSet

var oneUserDiv = d3.select('body').append('div').attr('id', 'oneUserDiv')
var oneUserSvg = oneUserDiv.append('svg')
    .attr("width", 800)
    .attr("height", 600)

var oneUserGraphGroup
