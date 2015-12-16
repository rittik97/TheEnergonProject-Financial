var margin = {top: 5, right: 40, bottom: 20, left: 270},
    width = 960 - margin.left - margin.right,
    height = 50 - margin.top - margin.bottom;
        
var chart = d3.bullet()
    .width(width)
    .height(height);
    
    

//d3.json("getinstantdata.php")
  //  .header("Content-Type", "application/x-www-form-urlencoded")
    //.post("a=2&b=3", function(error, data)
d3.json("bullets.json", function(error, data) {
  if (error) throw error;
  

  var svg = d3.select("#gridbullet")
          .selectAll("svg")
      .data(data)
    .enter().append("svg")
      .attr("class", "bullet")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(chart)
      .attr("align","center");

  var title = svg.append("g")
      .style("text-anchor", "end")
      .attr("transform", "translate(-6," + height / 2 + ")");

  title.append("text")
      .attr("class", "title")
      .text(function(d) { return d.title; });

  title.append("text")
      .attr("class", "subtitle")
      .attr("dy", "1em")
      .text(function(d) { return d.subtitle; });
  /*
    title.append("text")
      .attr("class", "subtitle")
      .attr("y", 15)
      .attr("x", 122)
    //.text(function(d) { return d.subtitle; });    
              .text("hi");
    */  
  
});

function randomize(d) {
  if (!d.randomizer) d.randomizer = randomizer(d);
  d.ranges = d.ranges.map(d.randomizer);
  d.markers = d.markers.map(d.randomizer);
  d.measures = d.measures.map(d.randomizer);
  return d;
}

function randomizer(d) {
  var k = d3.max(d.ranges) * .2;
  return function(d) {
    return Math.max(0, d + k * (Math.random() - .5));
  };
}