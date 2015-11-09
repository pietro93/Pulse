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
    $("#amoeba > *").css({
        "-webkit-transition": "all 10s",
        "-moz-transition": "all 10s",
        "-o-transition": "all 10s"
    });
    $("#amoeba :nth-child(even)").css({ "background": "grey" });
    $("#amoeba :nth-child(odd)").css({ "background": "mediumpurple" });
    $("#amoeba :nth-child(-n+100)").css({ "opacity": "0.2" });
    $("#amoeba :nth-child(-n+50)").css({ "opacity": "0" });
    $("#amoeba > *").animate({
        "border-radius": "20px",
        height: "67%", width: "67%"
    }, 1000);
    for (i = 1; i <= 100; i++) {
        if (i > 90){
            setAnimation($("#amoeba :nth-child("+ i +")"), "shrink", rand(30, 40));
        }
        else if (i > 50){
            setAnimation($("#amoeba :nth-child(" + i + ")"), "pulserotate", rand(20, 30));
        }
        else{
            setAnimation($("#amoeba :nth-child(" + i + ")"), "expand", rand(10, 20));
        }
    }
    status = "neutral";
    setAnimation(amoeba, "pulsate", 15);
    play(neutral);
}

function normalise() {
    $("#amoeba > *").css({
        "-webkit-transition": "all 10s",
        "-moz-transition": "all 10s",
        "-o-transition": "all 10s"
    });
    $("#amoeba :nth-child(even)").css({ "background": "DarkGray" });
    $("#amoeba :nth-child(odd)").css({ "background": "DarkKhaki" });
    $("#amoeba > *").css({ "opacity": "0.2" });
    $("#amoeba :nth-child(-n+20)").css({ "opacity": "0" });
    $("#amoeba > *").animate({
        "border-radius": "15px",
        height: "67%", width: "67%"
    }, 1000);
    for (i = 1; i <= 100; i++) {
        switch ((i % 10)) {
            case 0, 2, 7:
                setAnimation($("#amoeba :nth-child(" + i + ")"), "shrink", rand(40, 50));
                break;
            case 1, 5, 8:
                setAnimation($("#amoeba :nth-child(" + i + ")"), "expand", rand(40, 50));
                break;
            default:
                setAnimation($("#amoeba :nth-child(" + i + ")"), "pulserotate", rand(40, 50));
                break;
        }
        status = "normal";
        setAnimation(amoeba, "pulsate", 30);
        play(neutral);
    }
}
    function ignite() {
        $("#amoeba :nth-child(even)").css({ "background": "red" });
        $("#amoeba :nth-child(odd)").css({ "background": "darkred" });
        $("#amoeba > *").css({ "opacity": "0.2" });
        $("#amoeba :nth-child(-n+80)").css({ "opacity": "0" });
        $("#amoeba > *").animate({
            "border-radius": "50px",
            height: "62%", width: "62%"
        }, 1000);
        status = "ignited";
        setAnimation(amoeba, "largePulse", 15)
        play(sadness);
    }

    function lightUp() {
        $("#amoeba  :nth-child(even)").css({ "background": "LightGreen" });
        $("#amoeba :nth-child(odd)").css({ "background": "MediumSeaGreen" });
        $("#amoeba > *").css({ "opacity": "0.2" });
        $("#amoeba :nth-child(-n+60)").css({ "opacity": "0" });
        $("#amoeba > *").animate({
            "border-radius": "50px",
            height: "77%", width: "77%"
        }, 1000);
        status = "lit";
        for (i = 1; i <= 100; i++) {
            setAnimation($("#amoeba :nth-child(" + i + ")"), "pulserotate", rand(20, 30));
        }
        setAnimation($("#amoeba > *"), "pulserotate", rand(15, 25));
        setAnimation(amoeba, "pulsate", 15);
        play(happiness);
    }

    function petrify() {
        $("#amoeba > *").css({
            "-webkit-transition": "all 3s",
            "-moz-transition": "all 3s",
            "-o-transition": "all 3s"
        });
        $("#amoeba :nth-child(even)").css({ "background": "DarkSlateGray ", "opacity": "0.2" });
        $("#amoeba :nth-child(odd)").css({ "background": "SteelBlue ", "opacity": "0.2" });
        $("#amoeba :nth-child(-n-25)").css({ "background": "black", "opacity": "0.1" });
        $("#amoeba > *").animate({
            "border-radius": "15px",
            height: "55%", width: "55%"
        }, 1000);
        setAnimation($("#amoeba > *"), null, 0);
        status = "petrified";

        setAnimation(amoeba, "pulsate", 20);
        play(neutral);
    }


    function alert() {
        $("#amoeba :nth-child(-n+100)").css({
            "background": "black", "opacity": "0.9", "-webkit-transition": "all 3s",
            "-moz-transition": "all 3s",
            "-o-transition": "all 3s"
        });
        $("#amoeba :nth-child(-n+50)").css({ "background": "red", "opacity": "0.2" });
        $("#amoeba :nth-child(-n+25)").css({ "background": "brown", "opacity": "0.1" });
        $("#amoeba > *").animate({
            "border-radius": "1px",
            height: "73%", width: "76%"
        }, 1000);
        $("#amoeba :nth-child(-n+50)").animate({
            "border-radius": "1px",
            height: "80%", width: "80%"
        }, 1000);
        for (i = 1; i <= 50; i++) {
            x = rand(5, 15);
            setAnimation($("#amoeba :nth-child(" + i + ")"), "pulserotate", x);
            setAnimation($("#amoeba :nth-child(" + (50 + i) + ")"), "pulserotate", x);
        }
        setAnimation(amoeba, "pulsate", 3);
        status = "alert"
    }
