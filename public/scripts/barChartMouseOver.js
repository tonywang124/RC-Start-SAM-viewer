			var sampleData = [ 25, 7, 5, 26, 11, 8, 25, 14, 23, 19,
                14, 11, 22, 29, 11, 13, 12, 17, 18, 10,
                24, 18, 25, 9, 3,10, 9, 7, 11];
			var width = 500;
			var height = 150;
			var barPadding = 1;
			var canvas = d3.select("body")
						.append("svg")
						.attr("width", width)
						.attr("height", height);

			var xScale = d3.scale.ordinal()
						   .domain(d3.range(sampleData.length)) // Gives each value an ID (key) from 0 to lenght of sampleData (same as index of the array)
						   .rangeRoundBands([0, width], 0.05); /* Bands are discrete divisions that are automatically calculated: (delta range) / domain.length 
						   Round rounds to nearest whole pixel for cleaner edges. Second input 
						   is for spacing percentage between bands. */

			var yScale = d3.scale.linear()
						   .domain([0, d3.max(sampleData, function(d) { return d.value;})])
						   .range([0,height]);
            var isAscending = false; 
            var sortBars = function() {
            	isAscending = !isAscending;
            	canvas.selectAll("rect")
            	      .sort(function(a,b) {
            	      	if (isAscending) {
            	      	   return d3.ascending(a,b);
            	      	} else {
            	      		return d3.descending(a,b);
            	      	}
            	      })
            	      .transition()
            	      .delay(function(d,i) {
            	      	return i * 50;
            	      })
            	      .duration(1000)
            	      .attr("x", function(d,i) {
            	      	   return xScale(i);
            	      });
            }

			canvas.selectAll("rect")
				  .data(sampleData)
				  .enter()
				  .append("rect")
				  // Create hover effects using d3. Better to do in CSS due to transition interruptions.
				  // .on("mouseover", function(d) {
				  // 	d3.select(this)
				  // 	  .attr("fill", "orange");
				  // })
				  // .on("mouseout", function(d) {
				  // 	d3.select(this)
				  // 	  .transition()
				  // 	  .duration(250)
				  // 	  .attr("fill", "rgb(0, 0, " + (d * 10) + ")")
				  // })
				  .on("click", function(d) {
				  	sortBars();
				  })
				  .attr({
				  	    x: function(d,i) {
				  			return i * (width / sampleData.length);
				  		},
				  		y: function(d) {
				  			return height - d*4;
				  		},
				  		width: width / sampleData.length - barPadding,
				  		height: function(d) {
				  			return d*4;
				  		},
				  		fill: function(d) {
				  			return "rgb(0,0, " + (d * 10) + ")";
				  		}
				  })
				  // .append("title")
				  // .text(function(d) {
				  // 	return d;
				  // })
				  .on("mouseover", function(d) {
				  	var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
				  	var yPosition = parseFloat(d3.select(this).attr("y"))/2 + height/2;
				  	d3.select("#tooltip")
				  	  .style("left", xPosition + "px")
				  	  .style("top", yPosition + "px")
				  	  .select("#value")
				  	  .text(d);

				  	d3.select("#tooltip").classed("hidden", false);
				  	// canvas.append("text")
				  	//       .attr({
				  	//       	"id": "tooltip",
				  	//       	"x": xPosition,
				  	//       	"y": yPosition,
				  	//       	"text-anchor": "middle",
				  	//       	"font-family": "sans-serif",
				  	//       	"font-size": "11px",
				  	//       	"font-weight": "bold",
				  	//       	"fill": "white"
				  	//       })
				  	//       .text(d)
				  })
				  .on("mouseout", function() {
				  	d3.select("#tooltip").classed("hidden", true);
				  	// d3.select("#tooltip").remove();
				  });

		    // canvas.selectAll("text")
		    // 	  .data(sampleData)
		    // 	  .enter()
		    // 	  .append("text")
		    // 	  .text(function(d) {
		    // 	  	return d;
		    // 	  })
		    // 	  .attr({
		    // 	  	x: function(d,i) {
		    // 	  		return i * (width / sampleData.length) + (width / sampleData.length - barPadding) / 2;
		    // 	  	},
		    // 	  	y: function(d) {
		    // 	  		return height - (d*4) + 12;
		    // 	  	},
		    // 	  	"font-family": "sans-serif",
		    // 	  	"font-size": "11px",
		    // 	  	fill: "white",
		    // 	  	"text-anchor": "middle"
		    // 	  })
		    // 	  .style("pointer-events", "none");