var amoeba = document.getElementById('amoeba');

// Square container by setting its height equal to screenwidth
function square(element) {
    var x = $(element).width();
    $(element).css({ "height": x });
}

// Get random number within specified range
function rand(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + min;
}

// Set animation (this is called automatically by amoeba builder)
function setAnimation(element, animation, time, disableAlternate) {
    alternate = "alternate";
    if (disableAlternate) { alternate = "" }
    $(element).css({
        "animation": animation + " " + time + "s linear "+ alternate +" infinite",
        "-webkit-animation": animation + " " + time + "s linear " + alternate + " infinite",
        "-moz-animation": animation + " " + time + "s linear "+ alternate +" infinite",
        "-o-animation": animation + " " + time + "s linear "+ alternate +" infinite;"
    });
}

// Change colour of currently displayed amoeba
// Usage: [0/cold/b/blue] -> blue, [1/warm/r/red] -> red, [2/g/green] -> green, [-1/*] -> gray)
function setColour(colourWarmth) {
    if (colourWarmth > 1) {
        if ((colourWarmth & 1)){ colourWarmth = 1} // turn odd input into 1
        else { colourWarmth = 2 } // turn even input into 2
    }
    switch (colourWarmth) {
        case "cold":
        case "b":case"blue":
        case 0:
            this.colour = 0;
            colour1 = "cyan";
            colour2 = "skyblue";
            break;
        case "warm":
        case "r":case"red":
        case 1:
            this.colour = 1;
            colour1 = "red";
            colour2 = "orangered";
            break;
        case "g":case"green":
        case 2:
            this.colour = 2;
            colour1 = "green";
            colour2 = "lightgreen";
            break;
        default:
            this.colour = -1;
            colour1 = "darkslategrey";
            colour2 = "rgb(130, 130, 130)"; 
            break;
    }
    $("#amoeba :nth-child(even)").css({ "background": colour1 });
    $("#amoeba :nth-child(odd)").css({ "background": colour2 });
}

// Function to set wave period and amplitude of currently displayed amoeba (DEPRECATED)
// Can be used to set contour edge instead
// Can also be partially restaurated, in case someone wants to play with wave periods in the future 
function setContour(edge/*, period*/){
    //switch (period){
    //    case "long": case 0:
    //        this.period = 0
    //        $("#amoeba :nth-child(-n+90)").css({ "opacity": "0" });
    //        shapes = 10;
    //        break;
    //    case "short": case 1:
    //        this.period = 1
    //        $("#amoeba > *").css({ "opacity": "0.2" });
    //        shapes = 100;
    //        break;
    //    default:
    //        this.period = -1
    //        $("#amoeba > *").css({ "opacity": "0.2" });
    //        $("#amoeba :nth-child(-n+50)").css({ "opacity": "0" });
    //        shapes = 50;
    //        break;
    //}
    switch (edge) {
        case "smooth": case 0:
            this.edge = 0
            br = "50px";
            break;
        case "jagged": case 1:
            this.edge = 1
            br = "1px";
            break;
        default:
            this.edge = -1
            br = "25px";
            break;
    }
    $("#amoeba > *").animate({
        "border-radius": br
    });
}

// Function to change size and/or pulse speed of currently displayed amoeba
function setPulse(size, speed) {
    ds = false;
    switch (size) {
        case "small": case 0:
            this.size = 0
            animation = "smallPulse";
            break;
        case "large": case 1:
            this.size = 1
            animation = "largePulse";
            break;
        default:
            this.size = -1
            animation = "pulsate";
            break;
    }
    switch (speed) {
        case "slow": case 0:
            this.speed = 0
            time = 25;
            break;
        case "fast": case 1:
            ds = true;
            this.speed = 1
            time = 1;
            break;
        default:
            this.speed = -1
            time = 15;
            break;
    }
    setAnimation(amoeba, animation, time, ds);
}

// Function to set up a new amoeba defining all variables at once 
function setAmoeba(colour, edge, pulseSize, pulseSpeed, sound) {
    setColour(colour);
    setContour(edge);
    setPulse(pulseSize, pulseSpeed);
    if (sound == happiness || sound == sadness || sound == fear || sound == neutral) {
        setSound(sound);
    }
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

// Generates new amoeba, initiated with values (-1,-1,-1,-1) and no sound
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
}

// Deprecated functions to set up old design, they are called by swiping on mobile devices
var status = "neutral";

// Get current status
function getStatus() {
    return status
}

// Print current status
function printStatus() {
    console.log("Current status: " + getStatus())
}

function excite() {
    setAmoeba(colour, 1, 1, 1, 1);
    status = "excited";
}

function cooldown() {
    setAmoeba(colour, 0, 0, 0, 0);
    status = "calm";
}

function neutralise() {
    setAmoeba(-1, -1, -1, -1, -1);
    status = "neutral";
}

// This is one of the old deprecated designs. Never actually used it, but I thought I'd keep it as an easter egg. 
// A specific combination of inputs will trigger the app to call this. Can you find it?
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