var amoeba = document.getElementById('amoeba');
var container = document.getElementById('container');

square(container);

var status = "neutral";

// Get random number
function rand(min, max) {
    return Math.floor(Math.random() * max) + min;
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
    s.style.cssText = ("transform: rotate(" + deg + "deg); opacity: " + opacity +
        "; animation: " + animation + " " + time + "s linear alternate infinite ");
    square(s);
    amoeba.appendChild(s);
}

function createAmoeba() {
    square(amoeba);

    for (var i = 0; i < 50; i++) {
        addShape('excited');
    }
    for (var i = 0; i < 40; i++) {
        addShape('neutral');
    }
    for (var i = 0; i < 10;i++) {
        addShape('calm');
    }
    amoeba.style.cssText = ("animation: pulsate " + 15 + "s linear alternate infinite;");
    normalise();
}

function excite() {
    $("#amoeba  :nth-child(even)").css({ "background": "red" });
    $("#amoeba :nth-child(odd)").css({ "background": "orangered" });
    $("#amoeba > *").animate({
        "opacity":"0.2",
        "border-radius": "1px",
        width: "70%", height: "70%"
    }, 1000);
    status = "excited";
    $("#amoeba").css({ "animation": "pulsate " + 5 + "s linear alternate infinite" });
}

function cooldown() {
    $("#amoeba :nth-child(even)").css({ "background": "blue" });
    $("#amoeba :nth-child(odd)").css({ "background": "cyan"});
    $("#amoeba :nth-child(-n+90)").css({ "opacity": "0"});
    $("#amoeba > *").animate({
        "border-radius": "50px",
        width: "60%", height: "60%"
    }, 1000);
    status = "calm";
    $("#amoeba").css({ "animation": "pulsate " + 25 + "s linear alternate infinite" });
}

function normalise() {
    $("#amoeba :nth-child(even)").css({ "background": "grey" });
    $("#amoeba :nth-child(odd)").css({ "background": "mediumpurple" });
    $("#amoeba :nth-child(-n+80)").css({ "opacity": "0.2" });
    $("#amoeba :nth-child(-n+50)").css({ "opacity": "0" });
    $("#amoeba > *").animate({
        "border-radius": "20px",
        width: "65%", height: "65%"
    }, 1000);
    status = "neutral";
    $("#amoeba").css({ "animation": "pulsate " + 15 + "s linear alternate infinite" });
}

function square(element) {
    var x = $(element).width();
    $(element).css(
        { 'height': x + 'px' }
    );
    var y = $(element).height();
    console.log(element.id + " width: " + x, "height: " + y)
}