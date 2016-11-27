function showTableDiv(dataSet){
    var table = tableDiv.append('table')
	.style('font-size',10)
	.style('padding',0)
	.style('border',0)
	.style('margin',0)
	.style('height',svgHeight * rowNum)
	.style('width','100%')
	.style('text-align','center')
	.style('border-collapse','collapse')

    var trGroup = table.selectAll('tr')
	.data(dataSet)
	.enter()
	.append('tr')
	.style('padding',0)
	.style('margin',0)

    var _ = trGroup.selectAll('tr')
	.data(function(d){return d;})
	.enter()
	.append('td')
	.style('width',svgWidth / colNum - 2)
	.style('padding',0)
	.style('border','1px solid grey')
	.style('margin',0)
	.text(function(d){return d;})
}

function hideTableDiv(dataSet){
    tableDiv.select('table').remove()
}
