var host = ("http://localhost:8888")

var userNames
var restaurantNames
var dataSet

var oneUserDiv = d3.select('body').append('div').attr('id', 'oneUserDiv')
var oneUserSvg = oneUserDiv.append('svg')
    .attr("width", 800)
    .attr("height", 600)

var oneUserGraphGroup
