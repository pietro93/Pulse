var ts = Date()
var combos = []

function setRadioForm(form) {
    if (form == "Valence") { l1 = "Unpleasant"; l2 = "Pleasant" }
    else { l1 = "Calm"; l2 = "Excited"}
    $("container").append('<fieldset class="ratebar" id="'+ form +'"> <legend><font size=5px color="white"><b>' + form + ':</b></font></legend>' +
        '<div class="checkboxgroup" style="width: 70px"> <font class="l">'+ l1 + '</font></div>' +
        '<div class="checkboxgroup">' +
        '<label for="one" title="">1</label><input type="radio" class="rank" id="one" name="' + form + '" value="-3" /></div>' +
        '<div class="checkboxgroup">' +
        '<label for="two" title="">2</label><input type="radio" class="rank" id="two" name="' + form + '" value="-2" /></div>' +
        '<div class="checkboxgroup">' +
        '<label for="thr" title="">3</label><input type="radio" class="rank" id="thr" name="' + form + '" value="-1" /></div>' +
        '<div class="checkboxgroup">' +
        '<label for="fou" title="">4</label><input type="radio" class="rank" id="fou" name="' + form + '" value="0" /></div>' +
        '<div class="checkboxgroup">' +
        '<label for="fiv" title="">5</label><input type="radio" class="rank" id="fiv" name="' + form + '" value="1" /></div>' +
        '<div class="checkboxgroup">' +
        '<label for="six" title="">6</label><input type="radio" class="rank" id="six" name="' + form + '" value="2" /></div>' +
        '<div class="checkboxgroup">' +
        '<label for="sev" title="">7</label><input type="radio" class="rank" id="sev" name="' + form + '" value="3" /></div>' +
    '<div class="checkboxgroup" style="width: 70px"> <font class="l">' + l2 + '</font></div></fieldset>')
}

function setDemographics() {
    clear()
    $("container").append('<div style="height: 15%"></div>')
    $("container").append('<fieldset class="" id="demographics"> <legend><font size=5px color="white"><b>Please specify your gender:</b></font></legend>' +
        '<div style="float: left; margin-left: 15%; margin-top: 2%"><font class="l" style="font-size: 22px">Male </font><font class="l"style="font-size: 45px">♂</font>' +
        '<input type="radio" class="rank" id="m" name="gender" value="m" /></div>' + 
        '<div style="float: right; margin-right: 15%; margin-top: 2%"><input type="radio" class="rank" style="margin-left: 50px" id="f" name="gender" value="f" />' +
        '<font class="l" style="font-size: 45px">♀</font><font class="l" style="font-size: 22px"> Female</small></font></div>' +
        '<div style="margin-top:10%; padding-top: 10%"><legend><font size=5px color="white"><b> Please specify your age:</b></font></legend>' +
        '<input type="number" name="age" style="margin-top: 5%; margin-left: 10%" size="12" value=""></div>')
    $("container").append('<input type="submit" name="next" id="NextButton" value="start" class="nextbutton" onclick="main()"/>')
}

function setForms() {
    $("container").append('<div style="height: 5%"></div>')
    setRadioForm('Valence');
    setRadioForm('Arousal');
    $("container").append('<input type="submit" disabled name="next" id="NextButton" value="continue" class="nextbutton" onclick="submit()"/>')

    var $valButtons = $("input[name='Valence']");
    var $arsButtons = $("input[name='Arousal']");
    var valSel = false; var arsSel = false; //indicates no radio button has been selected

    // cache reference to all radio buttons.
    $valButtons.change(function () {
        valSel = true;
        if (arsSel) {
            // enable submit button.
            $("input[name='next']").removeAttr("disabled");
        }
    });

    $arsButtons.change(function () {
        arsSel = true;
        if (valSel) {
            // enable submit button.
            $("input[name='next']").removeAttr("disabled");
        }
    });

}

function clear() {
    $("amoeba").empty()
    $("container").empty()
    stop()
}

function getRadioValue(form) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements;

    // loop through list of radio buttons
    for (var i = 0; i < 7; i++) {
        if (radios[i].checked) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val; // return value of checked radio or undefined if none checked
}

function submit() {
    val = getRadioValue(Valence)
    ars = getRadioValue(Arousal)
    sessionStorage.setItem(combo + "val", val)
    sessionStorage.setItem(combo + "ars", ars)
    clear()
    nextCombo()
}

function setCombo() {
    combo = combos.pop()
    
    var colour, edge, size, speed, audio;
    
    if (17 <= combo <= 32) { edge = 'smooth'; speed = "slow" } else { edge = 'jagged'; speed = "fast" };
    if (combo <= 16) { size = 'large' } else { size = 'small' };
    switch (true) {
        case (combo <= 4): case (25 <= combo && combo <= 28): case (37 <= combo && combo <= 40):
            colour = "red"; break;
        case (5 <= combo && combo <= 8): case (17 <= combo && combo <= 20): case (33 <= combo && combo <= 36):
            colour = "blue"; break;
        case (13 <= combo && combo <= 16): case (21 <= combo && combo <= 24): case (41 <= combo && combo <= 44):
            colour = "green"; break;
        default:
            colour = "grey"
    }
    switch (combo % 4) {
        case 1:
            audio = "neutral"; break;
        case 2:
            audio = "happiness"; break;
        case 3:
            audio = "sadness"; break;
        default:
            audio = "fear"
    }

	console.log("Combination: ", combo, " [", 48-combos.length, " out of 48]")
    console.log(colour, edge, size, speed, audio)
    $(container).append(amoeba)
    createAmoeba(); setAmoeba(colour, edge, size, speed, audio)
}

function setCarousel() {
    // populate array
    for (i = 1; i <= 48; i++) { combos.push(i) }
    // shuffle array
    combos.sort(function () {
        return .5 - Math.random();
    });
}

function nextCombo() {
    if (combos.length == 0) { complete(); return;;}
    setCombo()
    setTimeout(function () { clear(); setForms() }, 7000);
}

function setSound(sound) {
    this.sound = sound
    stop()
    playing = true; play(sound)
    }

function main() {
    
    sessionStorage.setItem("gender", getRadioValue(demographics))
    sessionStorage.setItem("age", $("input[name='age']").val())
    console.log("Gender:" + sessionStorage.getItem("gender") + " Age:" + sessionStorage.getItem("age"));

    clear()
    setCarousel();
    
    nextCombo()
    }

function complete() {
    clear();

    csvContent = "data:text/csv;charset=utf-8,";
    csvContent += sessionStorage.getItem("gender") + "," + sessionStorage.getItem("age")
    for (i = 1; i <= 48; i++) {
        csvContent += "," + sessionStorage.getItem(i + "val")
        csvContent += "," + sessionStorage.getItem(i + "ars") 
    }

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", ts+".csv");

    link.click();


    $(container).append("<div class='thankyou'>Thank you</div>")
}