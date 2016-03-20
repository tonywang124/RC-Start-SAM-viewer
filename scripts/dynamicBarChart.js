
			var sampleData = [ 25, 7, 5, 26, 11, 8, 25, 14, 23, 19,
                14, 11, 22, 29, 11, 13, 12, 17, 18, 10,
                24, 18, 25, 9, 3,10, 9, 7, 11];
			var width = 600;
			var height = 250;
			var barPadding = 1;
			var xScale = d3.scale.ordinal()
						   .domain(d3.range(sampleData.length)) // Gives each value an ID (key) from 0 to lenght of sampleData (same as index of the array)
						   .rangeRoundBands([0, width], 0.05); /* Bands are discrete divisions that are automatically calculated: (delta range) / domain.length 
						   Round rounds to nearest whole pixel for cleaner edges. Second input 
						   is for spacing percentage between bands. */

			var yScale = d3.scale.linear()
						   .domain([0, d3.max(sampleData)])
						   .range([0,height]);

			var canvas = d3.select("body")
						.append("svg")
						.attr("width", width)
						.attr("height", height);
			
			canvas.selectAll("rect")
				  .data(sampleData)
				  .enter()
				  .append("rect")
				  .attr({
				  	    x: function(d,i) {
				  			return xScale(i); // i is same as the domain index in xScale.
				  		},
				  		y: function(d) {
				  			return height - yScale(d);
				  		},
				  		width: xScale.rangeBand(),
				  		height: function(d) {
				  			return yScale(d);
				  		},
				  		fill: function(d) {
				  			return "rgb(0,0, " + (d * 10) + ")";
				  		}
				  });
		    canvas.selectAll("text")
		    	  .data(sampleData)
		    	  .enter()
		    	  .append("text")
		    	  .text(function(d) {
		    	  	return d;
		    	  })
		    	  .attr({
		    	  	x: function(d,i) {
		    	  		return xScale(i) + xScale.rangeBand() / 2;
		    	  	},
		    	  	y: function(d) {
		    	  		return height - yScale(d) + 14;
		    	  	},
		    	  	"font-family": "sans-serif",
		    	  	"font-size": "11px",
		    	  	fill: "white",
		    	  	"text-anchor": "middle"
		    	  });
		  	d3.select("p")
		  		.on("click", function() {
		  			// Update sampleData with random values
		  			var population = sampleData.length;
		  			var maxValue = 25;
		  			sampleData = [];
		  			for (var i = 0; i < population; i ++) {
		  				var newEntry = Math.floor(Math.random() * maxValue);
		  				sampleData.push(newEntry);
		  			}
		  			// Re-evaluate the y-axis domain
		  			yScale.domain([0, d3.max(sampleData)]);
		  			
            		//Rebind data to rectangles in SVG
            		canvas.selectAll("rect")
            		      .data(sampleData)
            		      .transition()
            		      // .delay(function(d,i) {
            		      // 	return i * 50;
            		      // })
            		      .duration(500)
            		      .attr("y", function(d) {
            		      	return height - yScale(d);
            		      })
            		      .attr("height", function(d) {
            		      	return yScale(d);
            		      })
            		      .attr("fill", function(d) {
            		      	return "rgb(0,0, " + (d*10) + ")";
            		      });
            		canvas.selectAll("text")
            		      .data(sampleData)
            		      .transition()
            		      .duration(1000)
            		      .text(function(d) {
            		      	return d;
            		      })
            		      .attr("x", function(d,i) {
            		      	return xScale(i) + xScale.rangeBand() / 2;
            		      })
            		      .attr("y", function(d) {
            		      	return height - yScale(d) + 14;
            		      });
		  		})