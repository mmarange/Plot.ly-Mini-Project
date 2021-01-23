function init() {
  // Grab a reference to the dropdown select element
  var url = "/samples"
  // Use the list of sample names to populate the select options
  d3.json(url).then((data) => {
   
   console.log("This is running from flask endpoint")
                /*
                ge: 24,
            bbtype: "I",
            ethnicity: "Caucasian",
            gender: "F",
            id: 940,
            location: "Beaufort/NC",
            wfreq: 2
            */
    // your-code-here 
    var subject_id = '940';
    var samples_data = data.samples;
    var filtered_samples = samples_data.filter(s => s['id'] == subject_id);

    console.log(filtered_samples);

    sample_values = filtered_samples.map(d =>d.sample_values);

    //console.log("----sample values")
    //console.log(sample_values)
    otu_ids = filtered_samples.map(d =>d.otu_ids);
    [[123]]
    console.log("---ids---")
    console.log(otu_ids)
    otu_labels = filtered_samples.map(d =>d.otu_labels);
    console.log("---labels---")
    console.log(otu_labels)
    var labels = otu_labels[0].slice(0,10).reverse();

    var x = sample_values[0].slice(0,10).reverse();
    var y = otu_ids[0].slice(0,10).map(o => `OTU ${o}`).reverse();
    // Use the first sample from the list to build the initial plots


//  subject_id = '940';
//       console.log(data);
//       var samples = data['samples'];
//       var filtered_samples = samples.filter(s => s['id'] == subject_id);
//       var sample_values = filtered_samples.map(s => s['sample_values']);
//       var otu_ids = filtered_samples.map(s => s['otu_ids']);
//       var otu_labels = ''
//       var x = sample_values[0].slice(0,10).reverse();
//       var y = otu_ids[0].slice(0,10).map(o => `OTU ${o}`).reverse();
//       var data = [{
//         type: 'bar',
//         x: x,
//         y: y,
//         orientation: 'h'
//       }];
//       console.log(sample_values.length);
//       console.log(otu_ids.length);
//       Plotly.newPlot('bar', data);
    //---- Plot.ly HORIZONTAL BAR CHART

    function bargraph() {
      var bar_data = [{
        type: 'bar',
        x: x,
        y: y,
        // x: [20, 14, 23],
        // y: ['giraffes', 'orangutans', 'monkeys'],
        orientation: 'h'
      }];
      
      Plotly.newPlot('bar', bar_data);
    }
    
    bargraph()

  });
}

/*
   Hints: Create additional functions to build the charts,
          build the gauge chart, set up the metadata,
          and handle the event listeners

   Recommended function names:
    optionChanged() 
    buildChart()
    buildGauge()
    buildMetadata()
*/

// Initialize the dashboard
init();