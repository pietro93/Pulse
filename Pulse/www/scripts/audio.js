var happiness = new Audio('sounds/happiness.wav');
var sadness = new Audio('sounds/sadness.wav');
var neutral = new Audio('sounds/neutral.wav');

var current = new Audio();
current.loop = true;

function play(file) {
    stop()
    current.src = file.src;
    current.volume = 0.0;
    current.play();
}

function stop() {
    current.pause()
}

//var context;
//if (typeof AudioContext !== "undefined") {
//    context = new AudioContext();
//} else if (typeof webkitAudioContext !== "undefined") {
//    context = new webkitAudioContext();
//} else {
//    throw new Error('AudioContext is not supported');
//}

//var request = new XMLHttpRequest();
//request.open("GET", "http://localhost:8080/www/sounds/happiness.wav", true);
//request.responseType = "arraybuffer";

//var audioData;
//// Our asynchronous callback
//request.onload = function () {
//    audioData = request.response;
//    createSoundSource(audioData);
//};
//request.send();

//// create a sound source
//soundSource = context.createBufferSource();

//// The Audio Context handles creating source
//// buffers from raw binary data
//context.decodeAudioData(audioData, function (soundBuffer) {
//    // Add the buffered data to our object
//    soundSource.buffer = soundBuffer;
//});

//soundSource.connect(context.destination);

//// Create a volume (gain) node
//volumeNode = context.createGain();

////Set the volume
//volumeNode.gain.value = 0.1;

//soundSource.connect(volumeNode);