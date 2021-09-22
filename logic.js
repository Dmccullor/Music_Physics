var sampleRate = 1000
var frequency = 440;
var amplitude = 0.01;
var theta = 0;

var timeArr = [];

for (var i = 0; i < sampleRate; i++) {
  timeArr.push(i + 0.01);
}
  

//function makeSine(inputTime) {
  var sineArr = []
  for (var j = 0; j < sampleRate; j++) {
    sineArr.push(amplitude * Math.sin(((2 * Math.PI) * (1/frequency)) * j + theta));
  }
  //return sineArr;
//}

console.log(sineArr);
console.log(timeArr);

// Create our first trace
var trace1 = {
    x: timeArr,
    y: sineArr,
    type: "scatter"
  };
  
  // The data array consists of both traces
  var data = [trace1];
  
  // Note that we omitted the layout object this time
  // This will use default parameters for the layout
  Plotly.newPlot("plot", data);