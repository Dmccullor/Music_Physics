function init() {
  optionChanged(notes.C)
};

var notes = {"C": 261.626, "C#/Db": 277.183, "D": 293.665, "D#/Eb": 311.127,
"E": 329.628, "F": 349.228, "F#/Gb": 369.994, "A": 440, "A#/Bb": 466.164,
"B": 493.883};

var sampleRate = 2000;

var timeArr = [];

for (var i = 0; i <= sampleRate; i++) {
  timeArr.push(i * 0.001);
}
  

function makeSine(freq, amp) {
  let sineArr = []
  for (var j = 0; j <= sampleRate; j++) {
    sineArr.push(amp * Math.sin(((2 * Math.PI) * (freq/100)) * timeArr[j]));
  }
  return sineArr;
}

var selector = d3.select("#selNote");

Object.entries(notes).forEach(([key, value]) => {
  selector
    .append("option")
    .text(key)
    .property("value", value);
});

function optionChanged(newNote) {
  var dropDownMenu = d3.selectAll("#selNote").node();
  var dropDownMenuId = dropDownMenu.id;
  var selectedFreq = dropDownMenu.value;
  
  var rootWave = makeSine(selectedFreq, 30);
  var octaveWave = makeSine((selectedFreq *2), 15);
  var fifthWave = makeSine(((selectedFreq * 3)/2), 23);
  var thirdWave = makeSine(((selectedFreq * 5)/4), 26)


// Create root note trace
var trace1 = {
  x: timeArr,
  y: rootWave,
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
  opacity: 0.5
}
  

var data = [trace1, trace2, trace3, trace4];

var layout = {
  title: "<b>Musical Note Sinewaves</b>",
  xaxis: {title: {text: "Time (ms)"}},
  yaxis: {title: {text: "Amplitude"}}
};
  

Plotly.newPlot("plot", data, layout);
}

init();