var sampleRate = 2000;
var frequency = 440;
//var amplitude = 0.01;

var timeArr = [];


for (var i = 0; i <= sampleRate; i++) {
  timeArr.push(i * 0.001);
}

console.log(timeArr);
  

function makeSine(freq, amp) {
  let sineArr = []
  for (var j = 0; j <= sampleRate; j++) {
    sineArr.push(amp * Math.sin(((2 * Math.PI) * freq) * timeArr[j]));
  }
  return sineArr;
}

var sineWave = makeSine(2, 30);
var octaveWave = makeSine(4, 15);
var fifthWave = makeSine(3, 23);

console.log(sineWave)

// Create our first trace
var trace1 = {
  x: timeArr,
  y: sineWave,
  type: "scatter"
};

var trace2 = {
  x: timeArr,
  y: octaveWave,
  type: "scatter",
  opacity: 0.25
};

var trace3 = {
  x: timeArr,
  y: fifthWave,
  type: "scatter",
  opacity: 0.5
}
  

  var data = [trace1, trace2, trace3];
  

  Plotly.newPlot("plot", data);