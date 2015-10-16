var amoeba = document.createElement('amoeba');
amoeba.setAttribute("onclick", "transition()");
var container = document.getElementById('container');
var status = "neutral";

function setStyle(style) {
    document.getElementById('stylesheet').setAttribute('href', 'css/'+style+'.css');
}

function neutral_to_excited() {
    var shapes = document.querySelectorAll("shape");
    shapes.style.setAttribute("background", "green");
}

function transition() {
    if (status == 'neutral') {
        setStyle('excited');
        this.status = 'excited';
    }
    else if (status == 'excited') {
        setStyle('neutral');
        this.status = 'neutral';
    }
}

function addShape(type) {
    var time;
    var border_radius;
    if (type == 'neutral'){
        time = Math.floor((Math.random() * 30) + 15);
    }
    else if (type == 'calm') {
        time = Math.floor((Math.random() * 45) + 40);
        
    }
    else if (type == 'excited') {
        time = Math.floor((Math.random() * 20) + 5);
        
    }
    else {
        return;
    }
    s = document.createElement('shape');
    s.style.cssText = ("border-radius: " + border_radius + "px; " +
        "animation: pulserotate "+ time +"s linear alternate infinite;")
    amoeba.appendChild(s);
    }

function addNeutral() {
    for (var i = 0; i <= 50;i++) {
        addShape('neutral');
    }
    container.appendChild(amoeba);
    amoeba.style.cssText = ("animation: pulse " + 20 + "s ease-in alternate infinite;");
}

function addCalm() {
    for (var i = 0; i <= 10; i++) {
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


addNeutral();



