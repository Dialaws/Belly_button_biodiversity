function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
	 var url =  "/metadata/"+ sample;
    d3.json(url).then(function(sample){
        
    var sample_metadata= d3.select("#sample-metadata");
     sample_metadata.html(" ");
	  Object.entries(sample).forEach(([key,value]) => {
        var row = sample_metadata.append("p");
        row.text(`${key}: ${value}`);
    });
});


    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}
console.log("1");
function buildCharts(sample) {
	
	 var url = `/samples/${sample}`;
    d3.json(url).then(function(data)
    {
                      var xvalue=data.otu_ids;
                      var yvalue=data.sample_values;
                      var tvalue=data.otu_labels;
                      var msize=data.sample_values;
                      var mcolors=data.otu_ids;
                      
                      
                     var trace_bubble={
                      x: xvalue,
                      y: yvalue,
                      text: tvalue,
                      mode: 'markers',
                      marker:{
                      size: msize,
                      color: mcolors
                      }
                      };
                      
                      var data= [trace_bubble];
                      
                      var layout={
                      xaxis:{title:"OTU ID"}
                      };
                   
                      Plotly.newPlot('bubble',data,layout);
        
        //Build a pie chart
        d3.json(url).then(function(data){
            var pievalue=data.sample_values.slice(0,10);
            var pielabel=data.otu_ids.slice(0,10);
            var piehover=data.otu_labels.slice(0,10);
        

            var data= [{
                        values:pievalue,
                        labels:pielabel,
                        hovertext:piehover,
                        type: 'pie'
                        }];
                      
                   
            Plotly.newPlot('pie',data);
        
            //Plotly.newPlot('bubble',data,layout);
                          });

});
}
// BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
/*function buildGauge(sample) {
	    Plotly.d3.json(`/wfreq/${sample}`, function(error, wfreq) {
	        if (error) return console.warn(error);
	        // Enter the washing frequency between 0 and 180
	        var level = 175;

// Enter a speed between 0 and 180
   // var level = data.WFREQ;

    // Trig to calc meter point
    var degrees = 180 - level,
         radius = .7;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    
    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
         pathX = String(x),
         space = ' ',
         pathY = String(y),
         pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);
    
    var data = [{ type: 'scatter',
       x: [0], y:[0],
        marker: {size: 28, color:'850000'},
        showlegend: false,
        name: 'speed',
        text: level,
        hoverinfo: 'text+name'},
      { values: [45/8, 45/8, 45/8, 45/8, 45/8, 45/8, 45/8, 45/8, 45/8, 50],
      rotation: 90,
      text: ['8-9','7-8','6-7','5-6', '4-5', '3-4', '2-3',
                '1-2', '0-1', ''],
      textinfo: 'text',
      textposition:'inside',
      marker: {colors:['#84B589','rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                             'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                             'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                             '#F4F1E4','#F8F3EC', 'rgba(255, 255, 255, 0)',]},
      labels: ['8-9','7-8','6-7','5-6', '4-5', '3-4', '2-3',
      '1-2', '0-1', ''],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];
    
    var layout = {
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],

     title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
        height: 500,
        width: 500,
      xaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
                 showgrid: false, range: [-1, 1]}
    };
    Plotly.newPlot('gauge', data, layout);
  });
}

//Collapse




*/
  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
	//buildGauge(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
  //buildGauge(newSample);
}

// Initialize the dashboard
//console.log("1");
init();

