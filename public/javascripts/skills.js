var data = [
      {name: "HTMLCSS", value: 8 },
      {name: "Javascript", value: 9 },
      {name: "Scala", value: 7 },
      {name: "Java", value: 5 },
      {name: "C++", value: 6 },
      {name: "C", value: 6 },
      {name: "Git", value: 7 },
      {name: "Python", value: 4 }
];
var width = 600,
    barHeight = 40;

var x = d3.scale.linear()
    .domain([0, 10])
    .range([0, 8]);

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", barHeight * data.length);

var bar = chart.selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

bar.append("rect")
    .attr("width", function(d) { return x(d.value) * width/10;})
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function(d) { return x(d.value) * width/10 - 5; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .attr
    .text(function(d) { return d.name; });

