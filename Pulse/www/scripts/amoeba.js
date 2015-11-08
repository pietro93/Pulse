var amoeba = document.getElementById('amoeba');
var status = "neutral";

// Get current status
function getStatus() {
    return status
}

// Print current status
function printStatus() {
    console.log("Current status: " + getStatus())
}

// Square container by setting its height equal to screenwidth
function square(element) {
    var x = $(element).width();
    $(element).css({ "height": x });
}

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
    neutralise()
}

function excite() {
    $("#amoeba  :nth-child(even)").css({ "background": "red" });
    $("#amoeba :nth-child(odd)").css({ "background": "orangered" });
    $("#amoeba > *").animate({
        "opacity":"0.2",
        "border-radius": "1px",
        height: "70%", width: "70%"}, 1000);
    status = "excited";
    setAnimation(amoeba, "pulsate", 3);
    play(happiness);
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
    play(sadness);
}

function neutralise() {
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
    play(neutral);
}

function normalise() {
    $("#amoeba :nth-child(even)").css({ "background": "DarkGray" }); 
    $("#amoeba :nth-child(odd)").css({ "background": "DarkKhaki" });
    $("#amoeba :nth-child(-n+80)").css({ "opacity": "0.2" });
    $("#amoeba :nth-child(-n+50)").css({ "opacity": "0" });
    $("#amoeba > *").animate({
        "border-radius": "15px",
        height: "70%", width: "70%"
    }, 1000);
    status = "normal";
    setAnimation(amoeba, "pulsate", 20);
    play(neutral);
}

function ignite() {
    $("#amoeba :nth-child(even)").css({ "background": "red", "opacity":"0.1" });
    $("#amoeba :nth-child(odd)").css({ "background": "#E52B50" });
    $("#amoeba :nth-child(-n+90)").css({ "opacity": "0" });
    $("#amoeba > *").animate({
        "border-radius": "50px",
        height: "65%", width: "65%"
    }, 1000);
    status = "ignited";
    setAnimation(amoeba, "largePulse", 20)
    play(sadness);
}

function lightUp() {
    $("#amoeba  :nth-child(even)").css({ "background": "Green" });
    $("#amoeba :nth-child(odd)").css({ "background": "LightCyan" });
    $("#amoeba > *").animate({
        "opacity": "0.1",
        "border-radius": "50px",
        height: "75%", width: "75%"
    }, 1000);
    status = "lit";
    setAnimation($("#amoeba > *"), "pulserotate", 20)
    setAnimation(amoeba, "pulsate", 20);
    play(happiness);
}

function petrify() {
    $("#amoeba :nth-child(even)").css({ "background": "DarkGray" });
    $("#amoeba :nth-child(odd)").css({ "background": "DarkKhaki" });
    $("#amoeba :nth-child(-n+80)").css({ "opacity": "0.2" });
    $("#amoeba :nth-child(-n+50)").css({ "opacity": "0" });
    $("#amoeba > *").animate({
        "border-radius": "15px",
        height: "67%", width: "67%"
    }, 1000);
    status = "petrified";
    setAnimation(amoeba, "pulsate", 20);
    play(neutral);
}