var rectValueScaleY = d3.scaleLinear()
    .domain([0, dataSetMax])
    .range([padding, svgHeight - padding])

var rectValueScaleX = d3.scaleLinear()
    .domain([0, dataSet[0].length - 1])
    .range([padding, svgWidth - padding - barWidth])

var rectValueScaleColor = d3.scaleLinear()
    .domain([0, dataSetMax])
    .range([0, 1])
