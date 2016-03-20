			var sampleData = []
			var population = 50;
			var xRange = Math.random() * 1000;
			var yRange = Math.random() * 1000;
			for (i = 0; i < population; i++) {
				x = Math.floor(Math.random() * xRange)
				y = Math.floor(Math.random() * yRange)
				sampleData.push([x,y]);
			}
			var height = 200;
			var width = 600;
			var padding = 30;
			var xScale = d3.scale.linear()
						  .domain([0, d3.max(sampleData, function(d) { return d[0]; })])
						  .range([padding, width - padding * 2]);
			var yScale = d3.scale.linear()
						   .domain([0, d3.max(sampleData, function(d) { return d[1];})])
						   .range([height - padding, padding]);
		    var rScale = d3.scale.linear()
		    			   .domain([0, d3.max(sampleData, function(d) { return d[1]; })])
		    			   .range([2,5]);
		    var canvas = d3.select("body")
            			   .append("svg")
            			   .attr("width", width)
            			   .attr("height", height);
            var xAxis = d3.svg.axis()
            			  .scale(xScale)
            			  .orient("bottom")
            			  .ticks(5);
            var yAxis = d3.svg.axis()
            			  .scale(yScale)
            			  .orient("left")
            			  .ticks(5);
            canvas.selectAll("circle")
                  .data(sampleData)
                  .enter()
                  .append("circle")
                  .attr({
                  	cx: function(d) {
                  		return xScale(d[0]);
                  	},
                  	cy: function(d) {
                  		return yScale(d[1]);
                  	},
                  	r: function(d) {
                  		return rScale(d[1]);
                  	}
                  })
            // canvas.selectAll("text")
            // 	  .data(sampleData)
            // 	  .enter()
            // 	  .append("text")
            // 	  .text(function (d) {
            // 	  	return d[0] + "," + d[1];
            // 	  })
            // 	  .attr({
            // 	  	x: function(d) {
            // 	  		return xScale(d[0]);
            // 	  	},
            // 	  	y: function(d) {
            // 	  		return yScale(d[1])
            // 	  	},
            // 	  	"font-family": "sans-serif",
            // 	  	"font-size": "11px",
            // 	  	fill: "red"
            // 	  });
            canvas.append("g")
            	  .attr("class", "axis")
            	  .attr("transform", "translate(0, " + (height - padding) + ")") // Translate x-coordinates
            	  .call(xAxis); //Required since elements are being added to the SVG.
            canvas.append("g")
            	  .attr("class", "axis")
            	  .attr("transform", "translate(" + padding + ",0)") // Translating y-coordinates
            	  .call(yAxis);