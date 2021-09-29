// Function to display defaults on the page when it loads
function init() {
  optionChanged(notes.C)
  optionChanged2(notes.C)
};

// Dict of notes and their frequencies
var notes = {"C": 261.626, "C#/Db": 277.183, "D": 293.665, "D#/Eb": 311.127,
"E": 329.628, "F": 349.228, "F#/Gb": 369.994, "A": 440, "A#/Bb": 466.164,
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
function optionChanged(newNote) {
  // resets the check boxes when note is changed
  fifthBox.property('checked', false);
  thirdBox.property('checked', false);

  // reads the selected option and defines the note and frequency as variables
  let dropDownMenu = d3.selectAll("#selNote").node();
  let selectedFreq = dropDownMenu.value;

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
  PANEL.append("h6").text("Root Note: " + Math.round(selectedFreq * 1000)/1000 + " Hz");
  PANEL.append("h6").text("Third: " + Math.round(thirdFreq * 1000)/1000 + " Hz");
  PANEL.append("h6").text("Fifth: " + Math.round(fifthFreq * 1000)/1000 + " Hz");
  PANEL.append("h6").text("Octave: " + Math.round(octaveFreq * 1000)/1000 + " Hz");


// creates root note trace
var trace1 = {
  x: timeArr,
  y: rootWave,
  type: "scatter",
  name: "Root Note"
}

// creates octave trace
var trace2 = {
  x: timeArr,
  y: octaveWave,
  type: "scatter",
  name: "Octave",
  opacity: 0.25
}

// creates fifth trace
var trace3 = {
  x: timeArr,
  y: fifthWave,
  type: "scatter",
  name: "",
  opacity: 0
}

// creates third trace
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
  
// Assigns plot to the html element
Plotly.newPlot("plot", data, layout);
}

// what is added to the fifth and third traces when box is checked
var updateFifth = {opacity: 0.25, name: "Fifth"};
var updateHide = {opacity: 0, name: ""};
var updateThird = {opacity: 0.25, name: "Third"}

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

function optionChanged2(newNote) {
  // reads the selected option and defines the note and frequency as variables
  let dropDownMenu = d3.selectAll("#selNote2").node();
  let selectedFreq = dropDownMenu.value;
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
    name: "Root Note",
    opacity: 0.25
    }

    // creates octave trace
    var trace2 = {
    x: timeArr,
    y: octaveWave,
    type: "scatter",
    name: "Octave",
    opacity: 0.25
    }
      
    // creates fifth trace
    var trace3 = {
    x: timeArr,
    y: fifthWave,
    type: "scatter",
    name: "Inv. Fifth"
    }
      
    // creates third trace
    var trace4 = {
    x: timeArr,
    y: thirdWave,
    type: "scatter",
    name: "Third",
    opacity: 0.25
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
    name: "Root Note",
    opacity: 0.25
    }

    // creates octave trace
    var trace2 = {
    x: timeArr,
    y: octaveWave,
    type: "scatter",
    name: "Octave",
    opacity: 0.25
    }
      
    // creates fifth trace
    var trace3 = {
    x: timeArr,
    y: fifthWave,
    type: "scatter",
    name: "Fifth",
    opacity: 0.25
    }
      
    // creates third trace
    var trace4 = {
    x: timeArr,
    y: thirdWave,
    type: "scatter",
    name: "Inv. Third",
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
    name: "Root Note"
    }

    // creates octave trace
    var trace2 = {
    x: timeArr,
    y: octaveWave,
    type: "scatter",
    name: "Octave",
    opacity: 0.25
    }
  
    // creates fifth trace
    var trace3 = {
    x: timeArr,
    y: fifthWave,
    type: "scatter",
    name: "Fifth",
    opacity: 0.25
    }
  
    // creates third trace
    var trace4 = {
    x: timeArr,
    y: thirdWave,
    type: "scatter",
    name: "Third",
    opacity: 0.25
    }
  }

  // displays the frequency of each wave and rounds to 3 decimals
  let PANEL = d3.select("#frequency-panel2");
  PANEL.html("");
  PANEL.append("h6").text("Root Note: " + Math.round(selectedFreq * 1000)/1000 + " Hz");
  PANEL.append("h6").text("Third: " + Math.round(thirdFreq * 1000)/1000 + " Hz");
  PANEL.append("h6").text("Fifth: " + Math.round(fifthFreq * 1000)/1000 + " Hz");
  PANEL.append("h6").text("Octave: " + Math.round(octaveFreq * 1000)/1000 + " Hz");

  var data = [trace1, trace2, trace3, trace4];

  var layout = {
    title: "<b>Musical Note Sinewaves (Chord Inversions)</b>",
    xaxis: {title: {text: "Time (ms)"}},
    yaxis: {title: {text: "Amplitude"}},
  };
  
  // Assigns plot to the html element
  Plotly.newPlot("plot2", data, layout);  
}

// event listener for checkboxes
fifthInvBox.on("change", optionChanged2);
thirdInvBox.on("change", optionChanged2);
standardBox.on("change", optionChanged2);

init();