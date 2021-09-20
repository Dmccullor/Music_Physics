// Create our first trace
var trace1 = {
    x: [1, 2, 3, 4, 5],
    y: randomNumbersBetween0and9(5),
    type: "scatter"
  };
  
  // The data array consists of both traces
  var data = [trace1, trace2];
  
  // Note that we omitted the layout object this time
  // This will use default parameters for the layout
  Plotly.newPlot("plot", data);