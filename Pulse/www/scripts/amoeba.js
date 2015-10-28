var amoeba = document.getElementById('amoeba');
var container = document.getElementById('container');

var x = $(container).width();
$(container).css({ "height": x });

var status = "neutral";

// Get random number
function rand(min, max) {
    return Math.floor(Math.random() * max) + min;
}

// Set animation
function setAnimation(element, animation, time) {
    $(element).css({
        "-webkit-animation": animation + " " + time + "s linear alternate infinite",
        "-moz-animation": animation + " " + time + "s linear alternate infinite",
        "-o-animation": animation + " " + time + "s linear alternate infinite;"
    });
}

// Add 'shape' that will make up the amoeba.
function addShape(type) {
    var time;
    var border_radius;
    var opacity = "0.2";
    var animation;
    var deg = rand(-360, 360);

    if (type == 'neutral'){
        time = rand(20,30);
        animation = "pulserotate";
    }

    else if (type == 'calm') {
        time = rand(30,40);
        animation = "shrink";
    }

    else if (type == 'excited') {
        time = rand(10, 20);
        opacity = "0";
        animation = "expand";
    }
    
    s = document.createElement('shape');
    s.style.cssText = ("-webkit-transform: rotate(" + deg + "deg); -moz-transform: rotate(" + deg + "deg); " +
        "o-transform: rotate(" + deg + "deg); ms-transform: rotate(" + deg + "deg); opacity: " + opacity +
        ";");
    setAnimation(s, animation, time);
    amoeba.appendChild(s);
}

function createAmoeba() {
    for (var i = 0; i < 50; i++) {
        addShape('excited');
    }
    for (var i = 0; i < 40; i++) {
        addShape('neutral');
    }
    for (var i = 0; i < 10;i++) {
        addShape('calm');
    }
    setAnimation(amoeba, "pulsate", 15)
    normalise()
}

function excite() {
    $("#amoeba  :nth-child(even)").css({ "background": "red" });
    $("#amoeba :nth-child(odd)").css({ "background": "orangered" });
    $("#amoeba > *").animate({
        "opacity":"0.2",
        "border-radius": "1px",
        height: "70%", width: "70%"}, 1000);
    status = "excited";
    setAnimation(amoeba, "pulsate", 3)
}

function cooldown() {
    $("#amoeba :nth-child(even)").css({ "background": "blue" });
    $("#amoeba :nth-child(odd)").css({ "background": "cyan"});
    $("#amoeba :nth-child(-n+90)").css({ "opacity": "0"});
    $("#amoeba > *").animate({
        "border-radius": "50px",
        height: "65%", width: "65%"
    }, 1000);
    status = "calm";
    setAnimation(amoeba, "pulsate", 25)
}

function normalise() {
    $("#amoeba :nth-child(even)").css({ "background": "grey" });
    $("#amoeba :nth-child(odd)").css({ "background": "mediumpurple" });
    $("#amoeba :nth-child(-n+80)").css({ "opacity": "0.2" });
    $("#amoeba :nth-child(-n+50)").css({ "opacity": "0" });
    $("#amoeba > *").animate({
        "border-radius": "20px",
        height: "67%", width: "67%"
    }, 1000);
    status = "neutral";
    setAnimation(amoeba, "pulsate", 15);
}
