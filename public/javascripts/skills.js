var diameter;

var expand = function(n) {
    var others = d3.selectAll("g").filter(function(d){
        return d.name != n.name;
    });

    var node = d3.selectAll("g").filter(function(d){
        return d.name == n.name;
    });

    others.transition().duration(500)
        .attr("transform", "translate(" + n.x + "," + n.y + ")scale(0.001,0.001)");

    node.transition().duration(500).delay(500)
        .attr("transform", "translate(" + diameter/2 + "," + diameter/2 + ")scale(3,3)");

    node.selectAll("image").transition().duration(500).delay(500)
        .style("opacity", 0);

    node.selectAll("text").transition().duration(500).delay(1000)
        .style("opacity", 1);

};

var collapse = function(n){
    var others = d3.selectAll("g").filter(function(d){
        return d.name != n.name;
    });

    var node = d3.selectAll("g").filter(function(d){
        return d.name == n.name;
    });

    node.selectAll("text").transition().duration(500)
        .style("opacity", 0);

    node.selectAll("image").transition().duration(500).delay(500)
        .style("opacity", 1);

    node.transition().duration(500).delay(500)
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")";});


    others.transition().duration(500).delay(1000)
        .attr("transform", function(d){ return "translate(" + d.x + "," + d.y + ")";});

};

var build = function(){
    diameter = Math.min($(window).width(), $(window).height());

    var format = d3.format(",d"),
        color = d3.scale.category20c();

    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);

    var svg = d3.select("body").append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

    d3.json("assets/data/skills.json", function(error, root) {
        if (error)console.log(error);

        var node = svg.selectAll(".node")
            .data(bubble.nodes(classes(root)).filter(function(d) { return !d.children; }))
            .enter()
            .append("g")
                .attr("class", "node")
                .attr("id", function(d){ return d.name; })
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
                .on("click", function(d){
                    if(d.expanded){
                        collapse(d);
                    } else {
                        expand(d);
                    }

                    d.expanded = !d.expanded;
                });

        node.append("title")
            .text(function(d) { return d.name; });

        node.append("circle")
            .attr("r", function(d) { return d.r; })
            .style("fill", function(d) { return color(d.packageName); });


        node.append("text")
            .text(function(d) { return d.text; })
            .style("opacity", 0);

        node.each(function(d){
            d3plus.textwrap()
                .container("#" + d.name + " text")
                .shape("circle")
                .valign( "middle" )
                .padding(10)
                .draw();
        });

        node.append('image')
            .attr('xlink:href', function(d) { return '/assets/images/' + d.name.toLowerCase() + '.svg'; })
            .attr("width", function(d){ return d.r;})
            .attr("height", function(d){ return d.r;})
            .attr("transform", function(d){return "translate(" + -d.r/2 + "," + -d.r/2 + ")";});
    });

    // Returns a flattened hierarchy containing all leaf nodes under the root.
    function classes(root) {
      var children = [];

      function recurse(name, node) {
        if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
        else children.push({packageName: name, name: node.name, value: node.size, expanded: false, text: node.text});
      }

      recurse(null, root);
      return {children: children};
    }

    d3.select(self.frameElement).style("height", diameter + "px");
};


$(document).ready(build);
