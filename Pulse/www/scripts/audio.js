// Get random number within specified range
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var r = rand(1, 10)
var happiness = 'happiness'
var sadness = 'sadness'
var neutral = 'neutral'
var fear = 'fear'

var sound = neutral, playing = false;

function play() {
    if (playing) {
        setTimeout(function () {
            r = rand(1, 10)
            current = 'sounds/' + sound + '/' + r + '.wav'
            $("body").append('<div id="player" class="player" style="position:absolute; bottom: 100px"></div>')
            $("#player").append('<audio id="audio" src="' + current + '" autoplay/>')
            console.log("Playing: " + current)
            setTimeout(function () {play()}, 1500)
        }, 500)
    }
}

function stop() {
    $("#player > *").remove()
    $(".player").remove()
    playing = false;
}

function setSound(sound) {
    this.sound = sound
    stop()
    setTimeout(function () { playing = true; play(sound) }, 2500);
}