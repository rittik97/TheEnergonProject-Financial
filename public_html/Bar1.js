/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

bar1();
function bar1(){
    var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 280 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
    
// Parse the date / time

var x = d3.scale.ordinal().rangeRoundBands([0, width],0.005);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    ;

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg = d3.select("#Bar1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("Bar1.csv", function(error, data) {

    data.forEach(function(d) {
        d.date = d.Type;
        d.value = +d.Value;
    });
	
  x.domain(data.map(function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })+30]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "+5em")
      .attr("dy", ".55em")
      ;

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-3.5em")
      .style("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      
      .text("Production (MW)");

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .style("fill-opacity","80%")
      .attr("x", function(d) { return x(d.date); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      /*.on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html(d.Value  
	        )
               .style("left", (d3.event.pageX+5) + "px")
               .style("top", (d3.event.pageY - 28) + "px")
               ;
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      }
              */
                ;
      
              
      
      svg.selectAll("bars")
			   .data(data)
			   .enter()
			   .append("text")
			   .text(function(d){return (Math.round(d.Value,3)+" MW");})
                           .attr("x", function(d) {
                                    
                                    return x(d.date)+x.rangeBand()/2;
                                
			   })
			   .attr("y", function(d) {
                                        
                                                                       
			   		return (y(d.Value)+12);                                
			   })
                                   
                                   .attr("dx", "-1.2em")
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "14px")
			   .attr("fill", "white");

});
    
}