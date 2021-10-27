// Function to display defaults on the page when it loads
function init() {
  optionChanged(notes.C),
  optionChanged2(notes.C),
  instChanged(instruments[0].name)
};

// Dict of notes and their frequencies
const notes = {"C": 261.626, "C#/Db": 277.183, "D": 293.665, "D#/Eb": 311.127,
"E": 329.628, "F": 349.228, "F#/Gb": 369.994, "G": 391.995, "A": 440, "A#/Bb": 466.164,
"B": 493.883};

// number of values to generate
var sampleRate = 2000;

// creates the x values array
var timeArr = [];
for (var i = 0; i <= sampleRate; i++) {
  timeArr.push(i * 0.001);
}
  
// Feeds the x values into the sine wave formula to generate y values
function makeSine(freq, amp) {
  let sineArr = []
  for (var j = 0; j <= sampleRate; j++) {
    sineArr.push(amp * Math.sin(((2 * Math.PI) * (freq/100)) * timeArr[j]));
  }
  return sineArr;
}

// populates the dropdown menu from objects in notes dict
var selector = d3.select("#selNote");
Object.entries(notes).forEach(([key, value]) => {
  selector
    .append("option")
    .text(key)
    .property("value", value);
});

// defines checkboxes below plot
var fifthBox = d3.select("#myCheckBox");
var thirdBox = d3.select("#myCheckBox2");

// builds the plot from the selected notes' frequency
function optionChanged(selectedFreq) {
  // resets the check boxes when note is changed
  fifthBox.property('checked', false);
  thirdBox.property('checked', false);

  //defines the frequency relationship
  let octaveFreq = selectedFreq * 2;
  let fifthFreq = (selectedFreq *3) /2;
  let thirdFreq = (selectedFreq *5) /4;
  
  // builds y values from the makeSine function
  let rootWave = makeSine(selectedFreq, 30);
  let octaveWave = makeSine(octaveFreq, 20);
  let fifthWave = makeSine(fifthFreq, 25);
  let thirdWave = makeSine(thirdFreq, 27);

  // displays the frequency of each wave and rounds to 3 decimals
  let PANEL = d3.select("#frequency-panel");
  PANEL.html("");
  PANEL.append("h6").text("Tonic: " + Math.round(selectedFreq * 100)/100 + " Hz");
  PANEL.append("h6").text("Third: " + Math.round(thirdFreq * 100)/100 + " Hz");
  PANEL.append("h6").text("Fifth: " + Math.round(fifthFreq * 100)/100 + " Hz");
  PANEL.append("h6").text("Octave: " + Math.round(octaveFreq * 100)/100 + " Hz");


// creates root note trace
var trace1 = {
  x: timeArr,
  y: rootWave,
  type: "line",
  name: "Tonic",
  hoverinfo: 'name'
}

// creates octave trace
var trace2 = {
  x: timeArr,
  y: octaveWave,
  type: "line",
  name: "Octave",
  opacity: 0.25,
  hoverinfo: 'name'
}

// creates fifth trace
var trace3 = {
  x: timeArr,
  y: fifthWave,
  type: "line",
  name: "",
  opacity: 0,
  hoverinfo: 'skip'
}

// creates third trace
var trace4 = {
  x: timeArr,
  y: thirdWave,
  type: "line",
  line: {color: "cyan"},
  name: "",
  opacity: 0,
  hoverinfo: 'skip'
}


var data = [trace1, trace2, trace3, trace4];

var layout = {
  title: "<b>Musical Note Sinewaves</b>",
  xaxis: {title: {text: "Time (ms)"}},
  yaxis: {title: {text: "Amplitude"}}
};
  
// Assigns plot to the html element
Plotly.newPlot("plot", data, layout);
}

// what is added to the fifth and third traces when box is checked
var updateFifth = {opacity: 0.25, name: "Fifth", hoverinfo: 'name'};
var updateHide = {opacity: 0, name: "", hoverinfo: 'skip'};
var updateThird = {opacity: 0.25, name: "Third", hoverinfo: 'name'}

// makes the fifth wave appear and disappear when box is clicked
function replotFifth() {
  if (fifthBox.property("checked")) {
    Plotly.restyle("plot", updateFifth, 2);
  }
  else {
    Plotly.restyle("plot", updateHide, 2);
  }
};

// makes the third wave appear and disappear when box is clicked
function replotThird() {
  if (thirdBox.property("checked")) {
    Plotly.restyle("plot", updateThird, 3);
  }
  else {
    Plotly.restyle("plot", updateHide, 3);
  }
}

// event listener for checkboxes
fifthBox.on("change", replotFifth);
thirdBox.on("change", replotThird);

// populates the dropdown menu from objects in notes dict
var selector2 = d3.select("#selNote2");
Object.entries(notes).forEach(([key, value]) => {
  selector2
    .append("option")
    .text(key)
    .property("value", value);
});

// defines variables for radio buttons
var standardBox = d3.select("#standardChord");
var fifthInvBox = d3.select("#fifthInversion");
var thirdInvBox = d3.select("#thirdInversion");

// builds the plot from the selected notes' frequency
function optionChanged2() {
  var dropDownMenu = d3.select("#selNote2").node();
  var selectedFreq = dropDownMenu.value;
  
  let octaveFreq = selectedFreq * 2;
  
  // builds y values based on the inversion selection
  if(fifthInvBox.property("checked")) {
    // halves the fifth frequency from standard chord
    var fifthFreq = (selectedFreq *3) /4;
    var thirdFreq = (selectedFreq *5) /4;

    let rootWave = makeSine(selectedFreq, 27);
    let octaveWave = makeSine(octaveFreq, 20);
    let fifthWave = makeSine(fifthFreq, 30);
    let thirdWave = makeSine(thirdFreq, 25);

    // creates root note trace
    var trace1 = {
    x: timeArr,
    y: rootWave,
    type: "scatter",
    name: "Tonic",
    opacity: 0.25,
    hoverinfo: 'name'
    }

    // creates octave trace
    var trace2 = {
    x: timeArr,
    y: octaveWave,
    type: "scatter",
    name: "Octave",
    opacity: 0.25,
    hoverinfo: 'name'
    }
      
    // creates fifth trace
    var trace3 = {
    x: timeArr,
    y: fifthWave,
    type: "scatter",
    name: "Inv. Fifth",
    hoverinfo: 'name'
    }
      
    // creates third trace
    var trace4 = {
    x: timeArr,
    y: thirdWave,
    type: "scatter",
    name: "Third",
    opacity: 0.25,
    hoverinfo: 'name'
    }
  }
  else if(thirdInvBox.property("checked")) {
    //halves the third frequency from standard
    var fifthFreq = (selectedFreq *3) /2;
    var thirdFreq = (selectedFreq *5) /8;

    // builds y values array
    let rootWave = makeSine(selectedFreq, 27);
    let octaveWave = makeSine(octaveFreq, 20);
    let fifthWave = makeSine(fifthFreq, 25);
    let thirdWave = makeSine(thirdFreq, 30);

    // creates root note trace
    var trace1 = {
    x: timeArr,
    y: rootWave,
    type: "scatter",
    name: "Tonic",
    opacity: 0.25,
    hoverinfo: 'name'
    }

    // creates octave trace
    var trace2 = {
    x: timeArr,
    y: octaveWave,
    type: "scatter",
    name: "Octave",
    opacity: 0.25,
    hoverinfo: 'name'
    }
      
    // creates fifth trace
    var trace3 = {
    x: timeArr,
    y: fifthWave,
    type: "scatter",
    name: "Fifth",
    opacity: 0.25,
    hoverinfo: 'name'
    }
      
    // creates third trace
    var trace4 = {
    x: timeArr,
    y: thirdWave,
    type: "scatter",
    name: "Inv. Third",
    hoverinfo: 'name'
    }
  }
  else {
    //defines the frequency relationship
    var fifthFreq = (selectedFreq *3) /2;
    var thirdFreq = (selectedFreq *5) /4;
  
    let rootWave = makeSine(selectedFreq, 30);
    let octaveWave = makeSine(octaveFreq, 20);
    let fifthWave = makeSine(fifthFreq, 25);
    let thirdWave = makeSine(thirdFreq, 27);
  
    // creates root note trace
    var trace1 = {
    x: timeArr,
    y: rootWave,
    type: "scatter",
    name: "Tonic",
    hoverinfo: 'name'
    }

    // creates octave trace
    var trace2 = {
    x: timeArr,
    y: octaveWave,
    type: "scatter",
    name: "Octave",
    opacity: 0.25,
    hoverinfo: 'name'
    }
  
    // creates fifth trace
    var trace3 = {
    x: timeArr,
    y: fifthWave,
    type: "scatter",
    name: "Fifth",
    opacity: 0.25,
    hoverinfo: 'name'
    }
  
    // creates third trace
    var trace4 = {
    x: timeArr,
    y: thirdWave,
    type: "scatter",
    name: "Third",
    opacity: 0.25,
    hoverinfo: 'name'
    }
  }

  // displays the frequency of each wave and rounds to 3 decimals
  let PANEL = d3.select("#frequency-panel2");
  PANEL.html("");
  PANEL.append("h6").text("Tonic: " + Math.round(selectedFreq * 100)/100 + " Hz");
  PANEL.append("h6").text("Third: " + Math.round(thirdFreq * 100)/100 + " Hz");
  PANEL.append("h6").text("Fifth: " + Math.round(fifthFreq * 100)/100 + " Hz");
  PANEL.append("h6").text("Octave: " + Math.round(octaveFreq * 100)/100 + " Hz");

  var data = [trace1, trace2, trace3, trace4];

  var layout = {
    title: "<b>Musical Note Sinewaves (Chord Inversions)</b>",
    xaxis: {title: {text: "Time (ms)"}},
    yaxis: {title: {text: "Amplitude"}},
  };
  
  // Assigns plot to the html element
  Plotly.newPlot("plot2", data, layout);
  // call function to check for colorblind switch
  replotColorblind(); 
}

// event listener for checkboxes
fifthInvBox.on("change", optionChanged2);
thirdInvBox.on("change", optionChanged2);
standardBox.on("change", optionChanged2);

// defines variable for colorblind switch
var colorblindBox = d3.select("#switch");

// what is changed when colorblind switch is toggled
var updateColorblind = {line: {color: "cyan"}};
var updateNormalcolors = {line: {color: ""}};

// changes the color of the third to be colorblind friendly
function replotColorblind() {
  if (colorblindBox.property("checked")) {
    Plotly.restyle("plot", updateColorblind, 3);
    Plotly.restyle("plot2", updateColorblind, 3);
  }
  else {
    Plotly.restyle("plot", updateNormalcolors, 3);
    Plotly.restyle("plot2", updateNormalcolors, 3);
  }
}

// event listener for colorblind switch
colorblindBox.on("change", replotColorblind);



// instrument data object
var instruments = [{"name": "Sine", "fourierArr": [1,0,0,0,0,0]},
  {"name": "French Horn", "fourierArr": [1,0.395,0.235,0.222,0.065,0.055]},
  {"name": "Flute", "fourierArr": [1,9.75,3.75,1.82,0.45,0.11]},
  {"name": "Oboe", "fourierArr": [1,0.95,2.1,0.195,0.2,0.25]},
  {"name": "Clarinet", "fourierArr": [1,0.36,0.26,0.01,0.75,0.2]},
  {"name": "Guitar", "fourierArr": [1,0.68,1.26,0.13,0.13,0.11]},
  {"name": "Piano", "fourierArr": [1,0.11,0.33,0.06,0.05,0.04]},
  {"name": "Violin", "fourierArr": [14, 8.43, 9.29, 0.9, 0.75, 0]}
];

//defines the frequency relationship for instrument chart
var rootFreq = notes.A;
var secondHarm = rootFreq * 2;
var thirdHarm = rootFreq * 3;
var fourthHarm = rootFreq * 4;
var fifthHarm = rootFreq * 5;
var sixthHarm = rootFreq * 6;

//populates the instrument dropdown menu
var instSelector = d3.select("#selInst");
for (u = 0; u < instruments.length; u++) {
  instSelector
    .append("option")
    .text(instruments[u].name)
    .property("value", instruments[u].name)
};

// builds soundwave chart
var soundChart = Highcharts.chart('plot3', {
  chart: {type: 'line'},
  title: {text: '<b>Instrument Sound Waves</b>'},
  subtitle: {text: 'See the combined harmonics of each instrument'},
  xAxis: {
      title: {text: "Time"}
  },
  plotOptions: {
    series: {
        marker: {radius: 1},
        turboThreshold: 2500}
  },
  yAxis: {
      title: {text: 'Amplitude'}
  },
  series: [{
    name: "Sine",
    data: makeSine(notes.A),
    linewidth: 2
  }],
  animation: true 
});
  
// build bar chart
var fourierChart = Highcharts.chart('plot4', {
  chart: {type: 'column',
    animation: true},
  title: {text: '<b>Instrument Fourier Analysis</b>'},
  subtitle: {text: 'The Strength of Overtones'},
  xAxis: {
      categories: ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'],
      title: {text: "Harmonic Number"}
  },
  plotOptions: {
    series: {
        marker: {radius: 1},
        turboThreshold: 2500}
  },
  yAxis: {
      title: {text: 'Amplitude'}
  },
  series: [{
    name: "Sine",
    data: [1,0,0,0,0,0]
  }],
});

// performs actions from instrument dropdown menu
function instChanged(instrument) {
  //matches the fourier array to the selected instrument
  var result = instruments.filter(selection => selection.name == instrument);
  var resultArr = result[0].fourierArr;

  // builds y values of each harmonic from the makeSine function
  var rootHarmWave = makeSine(rootFreq, resultArr[0]);
  var secondHarmWave = makeSine(secondHarm, resultArr[1]);
  var thirdHarmWave = makeSine(thirdHarm, resultArr[2]);
  var fourthHarmWave = makeSine(fourthHarm, resultArr[3]);
  var fifthHarmWave = makeSine(fifthHarm, resultArr[4]);
  var sixthHarmWave = makeSine(sixthHarm, resultArr[5]);

  //Sums the values of each overtones' value
  var sum = [];
  for(var t = 0; t < sampleRate; t++) {
    sum.push(rootHarmWave[t] + secondHarmWave[t] + thirdHarmWave[t] + fourthHarmWave[t] + fifthHarmWave[t] + sixthHarmWave[t]);
  }
  
  soundChart.update({
    series: [{
      name: result[0].name,
      data: sum
    }]
  });

  fourierChart.update({
    series: [{
      name: result[0].name,
      data: resultArr
    }]
  });
}

init();