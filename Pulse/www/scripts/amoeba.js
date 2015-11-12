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

// Get random number within specified range
function rand(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + min;
}

// Stop all executions for a certain amount of time
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

// Set animation
function setAnimation(element, animation, time) {
    $(element).css({
        "-webkit-animation": animation + " " + time + "s linear alternate infinite",
        "-moz-animation": animation + " " + time + "s linear alternate infinite",
        "-o-animation": animation + " " + time + "s linear alternate infinite;"
    });
}

// Set colour
function setColour(colourWarmth) {
    switch (colourWarmth) {
        case "cold":
        case 0:
            colour = 0;
            colour1 = "cyan";
            colour2 = "lightgreen";
            break;
        case "warm":
        case 1:
            colour = 1;
            colour1 = "red";
            colour2 = "orangered";
            break;
        default:
            colour = -1;
            colour1 = "darkslategrey";
            colour2 = "#8C658C"; //grey-purple
            break;
    }
    $("#amoeba :nth-child(even)").css({ "background": colour1 });
    $("#amoeba :nth-child(odd)").css({ "background": colour2 });
}

// Set wave period and amplitude
function setContour(period, amplitude, edge){
    switch (period){
        case "long": case 0:
            $("#amoeba :nth-child(-n+90)").css({ "opacity": "0" });
            shapes = 10;
            break;
        case "short": case 1:
            $("#amoeba > *").css({ "opacity": "0.2" });
            shapes = 100;
            break;
        default:
            $("#amoeba > *").css({ "opacity": "0.2" });
            $("#amoeba :nth-child(-n+50)").css({ "opacity": "0" });
            shapes = 50;
            break;
    }
    switch (amplitude){
        case "regular": case 0:
            for (i = 1; i <= shapes; i++) {
                setAnimation($("#amoeba :nth-child(-n +" + (100-i) + ")"), "shrink", rand(30, 40));
            };
            break;
        case "irregular": case 1:
            for (i = 1; i <= shapes; i++) {
                switch (i % 10) {
                    case 0: case 4: case 9:
                        setAnimation($("#amoeba :nth-child(-n" + (100 - i) + ")"), "shrink", rand(30, 40));
                        break;
                    case 2: case 5: case 8:
                        setAnimation($("#amoeba :nth-child(-n +" + (100 - i) + ")"), "expand", rand(10, 20));
                        break;
                    default:
                        setAnimation($("#amoeba :nth-child(-n +" + (100 - i) + ")"), "pulserotate", rand(20, 30));
                        break;
                }
            };
            break;
        default:
            for (i = 1; i <= shapes; i++) {
                if (i > (shapes / 2)) {
                    setAnimation($("#amoeba :nth-child(-n +" + (100-i) + ")"), "shrink", rand(30, 40));
                }
                else {
                    setAnimation($("#amoeba :nth-child(-n +" + (100-i) + ")"), "pulserotate", rand(20, 30));
                }
            };
            break;
    }
    switch (edge) {
        case "smooth": case 0:
            br = "50px";
            break;
        case "jagged": case 1:
            br = "1px";
            break;
        default:
            br = "25px";
            break;
    }
    $("#amoeba > *").animate({
        "border-radius": br
    });
}

function setPulse(size, speed) {
    switch (size) {
        case "small": case 0:
            animation = "smallPulse";
            break;
        case "large": case 1:
            animation = "largePulse";
            break;
        default:
            animation = "pulsate";
            break;
    }
    switch (speed){
        case "slow": case 0:
            time = 25;
            break;
        case "fast": case 1:
            time = 3;
            break;
        default:
            time = 15;
            break;
    }
    setAnimation(amoeba, animation, time);
}

function setAmoeba(colour, period, amplitude, edge, pulseSize, pulseSpeed) {
    setColour(colour);
    setContour(period, amplitude, edge);
    setPulse(pulseSize, pulseSpeed);
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
    setAnimation(amoeba, "pulsate", 15);
    neutralise();
}

function excite() {
    setAmoeba(1, 1, 1, 1, 1, 1);
    status = "excited";
}

function cooldown() {
    setAmoeba(0, 0, 0, 0, 0, 0);
    status = "calm";
}

function neutralise() {
    $("#amoeba > *").css({
        "-webkit-transition": "all 10s",
        "-moz-transition": "all 10s",
        "-o-transition": "all 10s"
    });
    setAmoeba(-1, -1, -1, -1, -1, -1);
    status = "neutral";
}

function normalise() {
    $("#amoeba > *").css({
        "-webkit-transition": "all 10s",
        "-moz-transition": "all 10s",
        "-o-transition": "all 10s"
    });
    neutralise();
    $("#amoeba :nth-child(even)").css({ "background": "DarkGray" });
    $("#amoeba :nth-child(odd)").css({ "background": "DarkKhaki" });
    status = "normal";
    setAnimation(amoeba, "pulsate", 30);
}


function alert() {
    setColour("warm");
    setShape("small", "smooth")
    status = "alert";
    setAnimation(amoeba, "shrinkPulse", 10);
    }

function lightUp() {
    setColour
        setAnimation(amoeba, "pulsate", 10);
        play(happiness);
    }

    function petrify() {
        $("#amoeba > *").css({
            "-webkit-transition": "all 1s",
            "-moz-transition": "all 1s",
            "-o-transition": "all 1s"
        });
        $("#amoeba :nth-child(even)").css({ "background": "#733C3C", "opacity": "0.2" }); //reddish gray
        $("#amoeba :nth-child(odd)").css({ "background": "darkslategrey", "opacity": "0.2" });
        $("#amoeba :nth-child(-n+90)").css({ "opacity": "0" });
        $("#amoeba > *").animate({
            "border-radius": "15px",
            height: "55%", width: "55%",
            "left": "7%", "top": "7%"
        }, 1000);
        setAnimation($("#amoeba > *"), null, 0);
        status = "petrified";

        setAnimation(amoeba, "pulsate", 20);
        play(neutral);
    }


function responsive() {
        $("#amoeba :nth-child(-n+100)").css({
            "background": "black", "opacity": "0.8", "-webkit-transition": "all 1s",
            "-moz-transition": "all 1s",
            "-o-transition": "all 1s"
        });
        $("#amoeba :nth-child(-n+50)").css({ "background": "red", "opacity": "0.2" });
        $("#amoeba :nth-child(-n+25)").css({ "background": "brown", "opacity": "0.1" });
        $("#amoeba > *").animate({
            "border-radius": "1px",
            height: "75%", width: "75%",
            "left": "-5%", "top": "-5%"
        }, 1000);
        $("#amoeba :nth-child(-n+50)").animate({
            "border-radius": "1px",
            height: "80%", width: "80%",
            "left": "-5%", "top": "-5%"
        }, 1000);
        for (i = 1; i <= 50; i++) {
            x = rand(5, 15);
            setAnimation($("#amoeba :nth-child(" + i + ")"), "pulserotate", x);
            setAnimation($("#amoeba :nth-child(" + (50 + i) + ")"), "pulserotate", x);
        }
        setAnimation(amoeba, "pulsate", 3);
        status = "responsive"
    }
