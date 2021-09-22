var sampleRate = 3000
var frequency = 440;
//var amplitude = 0.01;

var timeArr = [];

for (var i = 0; i < sampleRate; i++) {
  timeArr.push(i + 0.01);
}
  

function makeSine(freq, amp) {
  let sineArr = []
  for (var j = 0; j < sampleRate; j++) {
    sineArr.push(amp * Math.sin(((2 * Math.PI) * (1/freq)) * j));
  }
  return sineArr;
}

var sineWave = makeSine(440, 0.01);
var octaveWave = makeSine(880, 0.015);
var fifthWave = makeSine(660, 0.012);

console.log(sineWave)

// Create our first trace
var trace1 = {
  x: timeArr,
  y: sineWave,
  type: "scatter"
};

var trace2 = {
  x: timeArr,
  y: fifthWave,
  type: "scatter"
};

var trace3 = {
  x: timeArr,
  y: octaveWave,
  type: "scatter"
}
  

  var data = [trace1, trace2, trace3];
  

  Plotly.newPlot("plot", data);