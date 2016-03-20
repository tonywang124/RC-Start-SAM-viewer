			// Generates random dataset
			var sampleData = [];
			var randomData = function () {
				var population = 50;
				var maxRange = Math.random() * 1000;
				sampleData = [];
				for (i = 0; i < population; i ++) {
					var num1 = Math.floor(Math.random() * maxRange);
					var num2 = Math.floor(Math.random() * maxRange);
					sampleData.push([num1, num2]);
				}
			}
			// Initial random dataset on pageload
			randomData();
			// Initialize SVG element
            var width = 500;
            var height = 300;
            var padding = 30;
            var canvas = d3.select("body")
            			   .append("svg")
            			   .attr("width", width)
            			   .attr("height", height);
            // Create scales for the x and y axes. 
            var xScale = d3.scale.linear()
            					 .domain([0, d3.max(sampleData, function(d) {
            					 	return d[0];
            					 })])
            					 .range([padding, width - padding * 2]);
         	var yScale = d3.scale.linear()
         						 .domain([0, d3.max(sampleData, function(d) {
         						 	return d[1];
         						 })])
         						 .range([height - padding * 2, padding]);
            // Define axes for the SVG
            var xAxis = d3.svg.axis()
            				  .scale(xScale)
            				  .orient("bottom")
            				  .ticks(5);
            var yAxis = d3.svg.axis()
            				  .scale(yScale)
            				  .orient("left")
            				  .ticks(5);

            // Bind data to circles in SVG
            canvas.append("g")
            	  .attr("id", "circles")
            	  .attr("clip-path", "url(#clipArea)")
            	  .selectAll("circle")
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
                  	r: 2
                  })
            // Add axes to the SVG
            canvas.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0, " + (height - padding) + ")")
                  .call(xAxis);
            canvas.append("g")
            	  .attr("class", "y axis")
            	  .attr("transform", "translate(" + (padding) + ",0)")
            	  .call(yAxis);

            canvas.append("clipPath")
            	  .attr("id", "clipArea")
            	  .append("rect")
            	  .attr({
            	  	x: padding,
            	    y: padding,
            	    width: width - padding * 3,
            	    height: height - padding * 2
            	  });
            d3.select("p")
              .on("click", function () {
              	// Generate a new set of random data.
              	randomData();
              	// Update scales to reflect maxes of new dataset.
              	xScale.domain([0, d3.max(sampleData, function(d) { return d[0]})]);
              	yScale.domain([0, d3.max(sampleData, function(d) { return d[1]})]);
              	// Rebind data to canvas elements
              	canvas.selectAll("circle")
              		  .data(sampleData)
              		  .transition()
              		  .duration(1000)
              		  // Changes each data point's style at start of transition
              		  .each("start", function() {
              		  	d3.select(this)
              		  	  .attr("fill", "magenta")
              		  	  .attr("r", 5);
              		  })
              		  .attr("cx", function(d) {
              		  	return xScale(d[0]);
              		  })
              		  .attr("cy", function(d) {
              		  	return yScale(d[1]);
              		  })
              		  // Changes data point style back to original
              		  .each("end", function() {
              		  	d3.select(this)
              		  	    .transition()
              		  	    .duration(250)
              		  		.attr("fill", "black")
              		  		.attr("r", 2);
              		  	});
                // Updates axes to reflect new dataset
                canvas.select(".x.axis")
                	  .transition()
                	  .duration(1000)
                	  .call(xAxis);
                canvas.select(".y.axis")
                	  .transition()
                	  .duration(1000)
                	  .call(yAxis);
              });