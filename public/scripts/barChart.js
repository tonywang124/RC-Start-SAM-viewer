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
			canvas.selectAll("rect")
				  .data(sampleData)
				  .enter()
				  .append("rect")
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
		    	  		return i * (width / sampleData.length) + (width / sampleData.length - barPadding) / 2;
		    	  	},
		    	  	y: function(d) {
		    	  		return height - (d*4) + 12;
		    	  	},
		    	  	"font-family": "sans-serif",
		    	  	"font-size": "11px",
		    	  	fill: "white",
		    	  	"text-anchor": "middle"
		    	  });