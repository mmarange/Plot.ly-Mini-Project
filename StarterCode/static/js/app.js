function init() {
  // Grab a reference to the dropdown select element
  var url = "/samples"
  // Use the list of sample names to populate the select options
  d3.json(url).then((data) => {
   
   console.log("This is running from flask endpoint")
                /*
                age: 24,
            bbtype: "I",
            ethnicity: "Caucasian",
            gender: "F",
            id: 940,
            location: "Beaufort/NC",
            wfreq: 2
            */
    // your-code-here 
    var subject_id = '940';
    //----extract from metadata key-----
    var metadata =  data.metadata;
    var filtered_meta = metadata.filter(m => m.id == subject_id)[0]
    var age = filtered_meta.age
    var bbtype = filtered_meta.bbtype
    var ethnicity = filtered_meta.ethhnicity
    var gender = filtered_meta.gender
    var id = filtered_meta.id
    var location = filtered_meta.location
    var wfreq = filtered_meta.wfreq
    console.log('-----wfreq-----') 
    console.log(wfreq) 

    //-----extract from data key-----
    var samples_data = data.samples;
    var filtered_samples = samples_data.filter(s => s['id'] == subject_id);

    console.log(filtered_samples);

    sample_values = filtered_samples.map(d =>d.sample_values);
    //console.log("----sample values")
    //console.log(sample_values)

    otu_ids = filtered_samples.map(d =>d.otu_ids);
    // console.log("---ids---")
    // console.log(otu_ids)

    otu_labels = filtered_samples.map(d =>d.otu_labels);
    
    var otu_labels_plt = otu_labels[0].slice(0,10).reverse();
    // console.log("---labels---")
    console.log(otu_labels_plt)

    var sample_values_plt = sample_values[0].slice(0,10).reverse();
    var otu_ids_plt = otu_ids[0].slice(0,10).map(o => `OTU ${o}`).reverse();
    var otu_ids_plt2 = otu_ids[0].slice(0,10).reverse();
    // Use the first sample from the list to build the initial plots
    //--------HORIZONTAL BAR GRAPH--------
    function bargraph() {
      var bar_data = [{
        type: 'bar',
        x: sample_values_plt,
        y: otu_ids_plt,
        orientation: 'h',
        text: otu_labels_plt
      }];

      var layout = {
        title: `Plot showing top 10 OTUs of subject ID: ${subject_id}`,
        font:{
          family: 'Raleway, sans-serif'
        },
        
        xaxis: {text: 'Sample Values'},
        yaxis: {text: 'OTU IDS'}
      };
      
      Plotly.newPlot('bar', bar_data, layout);
    };
    
    bargraph();

    //--------BUBBLE CHART--------
    function bubbleChart(){
      var trace1 = {
        x: otu_ids_plt2,
        y: sample_values_plt,
        text: otu_labels_plt,
        mode: 'markers',
        marker: {
          color: otu_ids_plt2,
          size: sample_values_plt
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title:  `Plot showing top 10 OTUs of subject ID: ${subject_id}`,
        showlegend: false,
        height: 600,
        width: 600
      };
      
      Plotly.newPlot('bubble', data, layout);

    };
    
    bubbleChart();
    //--------GAUGE--------
    function buildGauge() {
      var data = [
      {
        type: "indicator",
        mode: "gauge+number+delta",
        value: wfreq,
        title: { text: "Speed", font: { size: 24 } },
        delta: { reference: 6, increasing: { color: "RebeccaPurple" } },
        gauge: {
          axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
          bar: { color: "darkblue" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 10], color: "cyan" },
            { range: [5, 8], color: "royalblue" }
          ],
          threshold: {
            line: { color: "red", width: 8 },
            thickness: 16,
            value: wfreq
          }
        }
      }
    ];
    
    var layout = {
      width: 500,
      height: 400,
      margin: { t: 25, r: 25, l: 25, b: 25 },
      paper_bgcolor: "lavender",
      font: { color: "darkblue", family: "Arial" }
    };
    
    Plotly.newPlot('gauge', data, layout);
  };
  buildGauge()
    
    //--------METADATA--------


    //--------EVENT LISTENERS--------

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