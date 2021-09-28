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

var fifthBox = d3.select("#myCheckBox");
var thirdBox = d3.select("#myCheckBox2");


function optionChanged(newNote) {
  fifthBox.property('checked', false);
  thirdBox.property('checked', false);

  var dropDownMenu = d3.selectAll("#selNote").node();
  var dropDownMenuId = dropDownMenu.id;
  var selectedFreq = dropDownMenu.value;

  var octaveFreq = selectedFreq * 2;
  var fifthFreq = (selectedFreq *3) /2;
  var thirdFreq = (selectedFreq *5) /4;
  
  var rootWave = makeSine(selectedFreq, 30);
  var octaveWave = makeSine(octaveFreq, 20);
  var fifthWave = makeSine(fifthFreq, 25);
  var thirdWave = makeSine(thirdFreq, 27)

  var PANEL = d3.select("#frequency-panel");

  PANEL.html("");
  PANEL.append("h6").text("Root Note: " + Math.round(selectedFreq * 1000)/1000 + " Hz");
  PANEL.append("h6").text("Third: " + Math.round(thirdFreq * 1000)/1000 + " Hz");
  PANEL.append("h6").text("Fifth: " + Math.round(fifthFreq * 1000)/1000 + " Hz");
  PANEL.append("h6").text("Octave: " + Math.round(octaveFreq * 1000)/1000 + " Hz");


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
  name: "",
  opacity: 0
}

var trace4 = {
  x: timeArr,
  y: thirdWave,
  type: "scatter",
  name: "",
  opacity: 0
}


var data = [trace1, trace2, trace3, trace4];

var layout = {
  title: "<b>Musical Note Sinewaves</b>",
  xaxis: {title: {text: "Time (ms)"}},
  yaxis: {title: {text: "Amplitude"}},
  hovermode: "closest"
};
  

Plotly.newPlot("plot", data, layout);
}


var updateFifth = {opacity: 0.25, name: "Fifth"};
var updateHide = {opacity: 0, name: ""};
var updateThird = {opacity: 0.25, name: "Third"}

function replotFifth() {

  if (fifthBox.property("checked")) {
    Plotly.restyle("plot", updateFifth, 2);
  }
  else {
    Plotly.restyle("plot", updateHide, 2);
  }
};

function replotThird() {
  if (thirdBox.property("checked")) {
    Plotly.restyle("plot", updateThird, 3);
  }
  else {
    Plotly.restyle("plot", updateHide, 3);
  }
}

fifthBox.on("change", replotFifth);
thirdBox.on("change", replotThird);

init();