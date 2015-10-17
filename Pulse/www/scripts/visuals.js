var amoeba = document.getElementById('amoeba');
amoeba.setAttribute("onclick", "transition()");
var container = document.getElementById('container');
var status = "neutral";

function setStyle(style) {
    document.getElementById('stylesheet').setAttribute('href', 'css/'+style+'.css');
}

function addShape(type) {
    var time;
    var border_radius;
    var deg = Math.floor((Math.random() * 360) - 360);
    if (type == 'neutral'){
        time = Math.floor((Math.random() * 30) + 15);
    }
    else if (type == 'calm') {
        time = Math.floor((Math.random() * 45) + 40);
        
    }
    else if (type == 'excited') {
        time = Math.floor((Math.random() * 20) + 10);
        
    }
    else {
        return;
    }
    s = document.createElement('shape');
    s.style.cssText = ("transform: rotate("+deg+"deg); " +
        "animation: pulserotate "+ time +"s linear alternate infinite;")
    amoeba.appendChild(s);
}

function addNeutral() {
    for (var i = 0; i <= 100;i++) {
        addShape('neutral');
    }
    amoeba.style.cssText = ("animation: mediumpulse " + 20 + "s ease-in alternate infinite;");
    $("amoeba").click(function () {
        $("container").animate({
            background: red,
            width: "+20%",
            height: "+20%",
            opacity: 0.9
        }, 5)
    });

}

function addCalm() {
    for (var i = 0; i <= 15; i++) {
        addShape('calm');
    }
    container.appendChild(amoeba);
    amoeba.style.cssText = ("animation: pulse " + 15 + "s ease-in-out alternate infinite;")
}

function addExcited() {
    for (var i = 0; i <= 100; i++) {
        addShape('excited');
    }
    container.appendChild(amoeba);
    amoeba.style.cssText = ("animation: pulse " + 5 + "s  linear alternate infinite;")
}

setStyle('neutral');
addNeutral();
