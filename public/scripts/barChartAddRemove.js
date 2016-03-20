/* Requires buttons with ids "add" and "remove" in the HTML */

			var sampleData = [ { key: 0, value: 5 },
                { key: 1, value: 10 },
                { key: 2, value: 13 },
                { key: 3, value: 19 },
                { key: 4, value: 21 },
                { key: 5, value: 25 },
                { key: 6, value: 22 },
                { key: 7, value: 18 },
                { key: 8, value: 15 },
                { key: 9, value: 13 },
                { key: 10, value: 11 },
                { key: 11, value: 12 },
                { key: 12, value: 15 },
                { key: 13, value: 20 },
                { key: 14, value: 18 },
                { key: 15, value: 17 },
                { key: 16, value: 16 },
                { key: 17, value: 18 },
                { key: 18, value: 23 },
                { key: 19, value: 25 } ];
			//Retrieve key of Array entry
			var key = function(d) {
				return d.key;
			};
			var width = 600;
			var height = 250;
			var barPadding = 1;
			var xScale = d3.scale.ordinal()
						   .domain(d3.range(sampleData.length)) // Gives each value an ID (key) from 0 to lenght of sampleData (same as index of the array)
						   .rangeRoundBands([0, width], 0.05); /* Bands are discrete divisions that are automatically calculated: (delta range) / domain.length 
						   Round rounds to nearest whole pixel for cleaner edges. Second input 
						   is for spacing percentage between bands. */

			var yScale = d3.scale.linear()
						   .domain([0, d3.max(sampleData, function(d) { return d.value;})])
						   .range([0,height]);

			var canvas = d3.select("body")
						.append("svg")
						.attr("width", width)
						.attr("height", height);
			
			canvas.selectAll("rect")
				  .data(sampleData, key)
				  .enter()
				  .append("rect")
				  .attr({
				  	    x: function(d,i) {
				  			return xScale(i); // i is same as the domain index in xScale.
				  		},
				  		y: function(d) {
				  			return height - yScale(d.value);
				  		},
				  		width: xScale.rangeBand(),
				  		height: function(d) {
				  			return yScale(d.value);
				  		},
				  		fill: function(d) {
				  			return "rgb(0,0, " + (d.value * 10) + ")";
				  		}
				  });
		    canvas.selectAll("text")
		    	  .data(sampleData, key)
		    	  .enter()
		    	  .append("text")
		    	  .text(function(d) {
		    	  	return d.value;
		    	  })
		    	  .attr({
		    	  	x: function(d,i) {
		    	  		return xScale(i) + xScale.rangeBand() / 2;
		    	  	},
		    	  	y: function(d) {
		    	  		return height - yScale(d.value) + 14;
		    	  	},
		    	  	"font-family": "sans-serif",
		    	  	"font-size": "11px",
		    	  	fill: "white",
		    	  	"text-anchor": "middle"
		    	  });

		  	d3.selectAll("button")
		  		.on("click", function() {
		  			var buttonID = d3.select(this).attr("id");
		  			if (buttonID === "add") {
				  		//Add one additional value to data set
				  		var maxValue = 25;
				  		var newEntry = Math.floor(Math.random() * maxValue);
				  		var lastKeyValue = sampleData[sampleData.length - 1].key;
				  		sampleData.push({key: lastKeyValue + 1, value: newEntry})
			  		} else {
			  			sampleData.shift();
			  		}

			  		xScale.domain(d3.range(sampleData.length));
			  		yScale.domain([0, d3.max(sampleData, function(d) { return d.value;})]);
			  		// Select the 1 updated value.
		  			var bars = canvas.selectAll("rect")
		                             .data(sampleData, key);
		            // Draw updated value on SVG (enter)
		            bars.enter()
		                .append("rect")
		                .attr({
		                	x: width,
		                	y: function(d) {
		                		return height - yScale(d.value);
		                	},
		                	width: xScale.rangeBand(),
		                	height: function(d) {
		                		return yScale(d.value);
		                	},
		                	fill: function(d) {
		                		return "rgb(0, 0, " + (d.value*10) + ")";
		                	}
		                });
		            // Transition the bars into SVG (update)     
		            bars.transition()
		                .duration(500)
		                .attr({
		                	x: function(d,i) {
		                	return xScale(i);
		                    },
		                    y: function(d) {
		                    	return height - yScale(d.value);
		                    },
		                    width: xScale.rangeBand(),
		                    height: function(d) {
		                    	return yScale(d.value);
		                    }
		               });
		            // Remove any bars in SVG that are no longer in dataset. 
		            bars.exit()
		            	.transition()
		            	.duration(500)
		            	.attr("x", -xScale.rangeBand())
		            	.remove();

		            var bar_label = canvas.selectAll("text")
		            					  .data(sampleData, key);
		            bar_label.enter()
		            	.append("text")
		            	.text(function(d) {
		            		return d.value;
		            	})
		            	.attr({
		            		x: width,
		            		y: function(d) {
		            			return height - yScale(d.value) + 14;
		            		},
		            		"font-family": "sans-serif",
		    	  			"font-size": "11px",
		    	  			fill: "white",
		    	  			"text-anchor": "middle"
		            	});
		            bar_label.transition()
		            		 .duration(500)
		            		 .attr({
		            		 	x: function(d,i) {
		            		 		return xScale(i) + xScale.rangeBand() / 2;
		            		 	},
		            		 	y: function(d) {
		            		 		return height - yScale(d.value) + 14;
		            		 	},
		            		 	"font-family": "sans-serif",
		    	  				"font-size": "11px",
		    	  				fill: "white",
		    	  				"text-anchor": "middle"
		            		 });
		            bar_label.exit()
		                     .transition()
		                     .duration(500)
		                     .attr("x", -xScale.rangeBand())
		                     .remove();
		  		});