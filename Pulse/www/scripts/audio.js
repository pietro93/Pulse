
var happiness = 'sounds/happiness.wav'
var sadness = 'sounds/sadness.wav'
var neutral = 'sounds/neutral.wav'

var current, playing;

function play(sound) {
    stop()
    $("body").append('<div id="player" style="position:absolute; bottom: 100px"></div>')
    $("#player").append('<audio id="audio" src="'+sound+'" autoplay loop/>')
    console.log("Playing: " + sound)
    current = sound;
    playing = true;
}

function stop() {
    $("#player > *").remove()
    $("#player").remove()
    playing = false;
}

play(neutral)

