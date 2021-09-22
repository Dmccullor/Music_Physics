var notes = [{"C": 261.626},{"C#/Db": 277.183}, {"D": 293.665}, {"D#/Eb": 311.127},
  {"E": 329.628}, {"F": 349.228}, {"F#/Gb": 369.994}, {"A": 440}, {"A#/Bb": 466.164},
{"B": 493.883}];

var sampleRate = 2000;

var timeArr = [];


for (var i = 0; i <= sampleRate; i++) {
  timeArr.push(i * 0.001);
}

console.log(timeArr);
  

function makeSine(freq, amp) {
  let sineArr = []
  for (var j = 0; j <= sampleRate; j++) {
    sineArr.push(amp * Math.sin(((2 * Math.PI) * (freq/100)) * timeArr[j]));
  }
  return sineArr;
}

var sineWave = makeSine(256, 30);
var octaveWave = makeSine(512, 15);
var fifthWave = makeSine(384, 23);
var thirdWave = makeSine(320, 27)

console.log(sineWave)

// Create our first trace
var trace1 = {
  x: timeArr,
  y: sineWave,
  type: "scatter",
  name: "Root Note"
};

var trace2 = {
  x: timeArr,
  y: octaveWave,
  type: "scatter",
  name: "Octave",
  opacity: 0.25
};

var trace3 = {
  x: timeArr,
  y: fifthWave,
  type: "scatter",
  name: "Fifth",
  opacity: 0.5
}

var trace4 = {
  x: timeArr,
  y: thirdWave,
  type: "scatter",
  name: "Third",
  opacity: 0.75
}
  

var data = [trace1, trace4, trace3, trace2];

var layout = {
  title: "<b>Musical Note Sinewaves</b>",
  xaxis: {title: {text: "Time (ms)"}},
  yaxis: {title: {text: "Decibels"}}
};
  

Plotly.newPlot("plot", data, layout);