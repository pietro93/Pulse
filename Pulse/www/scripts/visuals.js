var amoeba = document.createElement('amoeba');
var container = document.getElementById('container');

function addShape(type) {
    var time;
    if (type == 'neutral'){
        time = Math.floor((Math.random() * 30) + 15);
    }
    else if (type == 'calm') {
        time = Math.floor((Math.random() * 45) + 35);
    }
    else if (type == 'excited') {
        time = Math.floor((Math.random() * 45) + 10);
    }
    else {
        return;
    }
    s = document.createElement('shape');
    s.style.cssText = ("animation: pulserotate "+ time +"s alternate infinite;")
    amoeba.appendChild(s);
    }

function addNeutral() {
    for (var i = 0; i <= 50; i++) {
        addShape('excited');
        
    }
    container.appendChild(amoeba);
}

addNeutral();