			var sampleData = [
                  [ 5,     20 ],
                  [ 480,   90 ],
                  [ 250,   50 ],
                  [ 100,   33 ],
                  [ 330,   95 ],
                  [ 410,   12 ],
                  [ 475,   44 ],
                  [ 25,    67 ],
                  [ 85,    21 ],
                  [ 220,   88 ]
              ];
            var width = 500;
            var height = 100;
            var canvas = d3.select("body")
            			   .append("svg")
            			   .attr("width", width)
            			   .attr("height", height);

            canvas.selectAll("circle")
                  .data(sampleData)
                  .enter()
                  .append("circle")
                  .attr({
                  	cx: function(d) {
                  		return d[0];
                  	},
                  	cy: function(d) {
                  		return d[1];
                  	},
                  	r: function(d) {
                  		return Math.sqrt(height - d[1]);
                  	}
                  })
            canvas.selectAll("text")
            	  .data(sampleData)
            	  .enter()
            	  .append("text")
            	  .text(function (d) {
            	  	return d[0] + "," + d[1];
            	  })
            	  .attr({
            	  	x: function(d) {
            	  		return d[0];
            	  	},
            	  	y: function(d) {
            	  		return d[1]
            	  	},
            	  	"font-family": "sans-serif",
            	  	"font-size": "11px",
            	  	fill: "red"
            	  });