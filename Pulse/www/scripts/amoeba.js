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

// Set animation
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

// Set colour (0/cold/b/blue: blue, 1/warm/r/red: red, 2/g/green: green, -1/*: gray)
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

// Set wave period and amplitude
function setContour(edge){
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



