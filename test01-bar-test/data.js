var dataSet = d3.range(rowNum).map(function(){
    return d3.range(colNum).map(function(){
        return Math.floor(Math.abs(d3.randomNormal(0,3)()));
    })});

var dataSetMax = d3.max(dataSet, function(d){return d3.max(d);})

var barWidth = (svgWidth - padding * 2) / (dataSet[0].length)
