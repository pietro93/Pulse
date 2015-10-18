var amoeba = document.getElementById('amoeba');
var container = document.getElementById('container');
var status = "neutral";

function setStyle(style) {
    document.getElementById('stylesheet').setAttribute('href', 'css/'+style+'.css');
}

function rand(min, max) {
    return Math.floor(Math.random() * max) + min;
}

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
    s.style.cssText = ("transform: rotate("+deg+"deg); opacity: " + opacity +
        "; animation: " + animation + " " + time + "s linear alternate infinite ")
    amoeba.appendChild(s);
}

function addNeutral() {
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
}

function excite() {
    $("#amoeba  :nth-child(even)").css({ "background": "red" });
    $("#amoeba :nth-child(odd)").css({ "background": "orange" });
    $("#amoeba > *").animate({
        "opacity":"0.2",
        "border-radius": "1px",
        height: "70%", width: "70%"}, 1000);
    status = "excited";
}

function cooldown() {
    $("#amoeba :nth-child(even)").css({ "background": "blue" });
    $("#amoeba :nth-child(odd)").css({ "background": "cyan"});
    $("#amoeba :nth-child(-n+90)").css({ "opacity": "0"});
    $("#amoeba > *").animate({
        "border-radius": "50px",
        height: "55%", width: "55%"}, 1000);
    status = "calm";
}

function normalise() {
    $("#amoeba :nth-child(even)").css({ "background": "purple" });
    $("#amoeba :nth-child(odd)").css({ "background": "grey" });
    $("#amoeba :nth-child(-n+80)").css({ "opacity": "0.2" });
    $("#amoeba :nth-child(-n+50)").css({ "opacity": "0" });
    $("#amoeba > *").animate({
        "border-radius": "25px",
        height: "60%", width: "60%"
    }, 1000);
    status = "neutral";
}

function addCalm() {
    for (var i = 0; i <= 15; i++) {
        addShape('calm');
    }
    container.appendChild(amoeba);
    amoeba.style.cssText = ("animation: pulse " + 15 + "s ease-in-out alternate infinite;")
}

function addExcited() {
    for (var i = 0; i <= 50; i++) {
        addShape('excited');
    }
    amoeba.style.cssText = ("animation: pulse " + 5 + "s  linear alternate infinite;")
}


//$("container").click(function () {
//    if (status == "neutral")
//        cooldown();
//    if (status == "calm") {
//        normalise();
//        excite();
//    }
//    if (status == "excited") {
//        normalise();
//        cooldown();
//    }
//})

