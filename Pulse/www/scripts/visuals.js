var amoeba = document.createElement('amoeba');
var container = document.getElementById('container');

function setStyle(style) {
    document.head.innerHTML.anchor('<link href="css/'+ style +'.css" rel="stylesheet" />');
}

function addShape(type) {
    var time;
    var border_radius;
    if (type == 'neutral'){
        time = Math.floor((Math.random() * 30) + 15);
        border_radius = 15;
    }
    else if (type == 'calm') {
        time = Math.floor((Math.random() * 45) + 40);
        border_radius = 50;
    }
    else if (type == 'excited') {
        time = Math.floor((Math.random() * 30) + 10);
        border_radius = 0;
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
    for (var i = 0; i <= 10;i++) {
        addShape('calm');
        
    }
    container.appendChild(amoeba);
    amoeba.style.cssText = ("animation: pulse " + 10+ "s alternate infinite;")
}

setStyle('calm');
addNeutral();
