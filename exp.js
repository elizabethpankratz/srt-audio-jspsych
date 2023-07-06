// Illustration of `plugin-audio-button-response-grid`
// Elizabeth Pankratz, July 2023


var jsPsych = initJsPsych({
  message_progress_bar: 'Progress',
  on_finish: function() {
    jsPsych.data.displayData('csv');
  },
  show_progress_bar: true,
  auto_update_progress_bar: true
});

var timeline = [];

var preload = {
  type: jsPsychPreload,
  auto_preload: true 
};
timeline.push(preload);



function build_srt_trial(grid_labels, n_rows, n_cols, audio_paths){
  // Creates grid of specified dimensions that accepts one response per audio file.
  // The result is a series of trials; pushes each of these to timeline.

  // grid_labels: Flat array containing labels to display, 
  //              listed from top left -> top right, bottom left -> bottom right
  // n_rows: How many rows the grid should have.
  // n_cols: How many columns the grid should have.
  // audio_paths: Flat array of strings, the paths to the audio files to play.

  if(grid_labels.length != n_rows*n_cols){
    console.log('ERROR IS IMMINENT: Labels will not fit in grid of specified size');
  };

  for (let i = 0; i < audio_paths.length; i++){
    var srt_subtrial = {
      type: jsPsychAudioButtonResponseGrid,
      stimulus: audio_paths[i],
      rows: n_rows,
      columns: n_cols,
      choices: grid_labels,
    };
    timeline.push(srt_subtrial)
  };

};


// Build the timeline:

var intro = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<p>On the next screen, you'll see an SRT trial. Click on the words you hear.</p>`,
  choices: ["Continue"],
};
timeline.push(intro);


// Mapping of labels to grid: [top left, top centre, top right, bottom left, bottom centre, bottom right]
var labels = ['DUT', 'BAF', 'ZUG', 'RAL', 'VAD', 'TUS'];
var audio = ['audio/ral.wav', 'audio/baf.wav', 'audio/tus.wav'];
build_srt_trial(labels, 2, 3, audio)


var inbetween = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<p>That was a 2x3 grid. We can make other sizes too. The next one will be a 2x2 grid.</p>`,
  choices: ["Let's see it"],
};
timeline.push(inbetween)


// Mapping of labels to grid: [top left, top right, bottom left, bottom right]
var labels = ['DUT', 'BAF', 'RAL', 'VAD']
var audio = ['audio/dut.wav', 'audio/vad.wav']
build_srt_trial(labels, 2, 2, audio)


jsPsych.run(timeline);
