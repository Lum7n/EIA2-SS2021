"use strict";
var soccer_simulation;
(function (soccer_simulation) {
    function changeSettingsDiv() {
        // settingsButton.style.display = "block";
        soccer_simulation.settingsDiv.innerHTML = "";
        // settingsDiv.style.display = "none";
        soccer_simulation.settingsDiv.style.border = "none";
        soccer_simulation.possessionDiv.style.display = "none";
        soccer_simulation.possessionDiv.style.border = "none";
        soccer_simulation.selectedDiv.style.display = "none";
        soccer_simulation.selectedDiv.style.border = "none";
        // let settingsBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("settingsBtn");
        let settingsBtn = document.createElement("button");
        settingsBtn.innerHTML = "Settings <small class='fas fa-cog'></small>";
        settingsBtn.id = "settingsBtn";
        settingsBtn.addEventListener("click", showSettingsDiv);
        soccer_simulation.settingsDiv.appendChild(settingsBtn);
    }
    soccer_simulation.changeSettingsDiv = changeSettingsDiv;
    function showSettingsDiv() {
        soccer_simulation.settingsOpen = true;
        // settingsButton.style.display = "none";
        soccer_simulation.settingsDiv.innerHTML = "";
        soccer_simulation.settingsDiv.style.border = "2px solid black";
        soccer_simulation.possessionDiv.style.display = "none";
        soccer_simulation.possessionDiv.style.border = "none";
        soccer_simulation.selectedDiv.style.display = "none";
        soccer_simulation.selectedDiv.style.border = "none";
        let newDiv = document.createElement("div");
        newDiv.innerHTML = "Heim-Team Trikot: <input type='color' id='tHeim_shirt' name='tHeim_shirt' value='#94cad1'><input type='color' id='tHeim_font' name='tHeim_font' value='#08444d'></br>Gast-Team Trikot:<input type='color' id='tGast_shirt' name='tGast_shirt' value='#4d0808'><input type='color' id='tGast_font' name='tGast_font' value='#ff6666'></br><div id='Hshirt' class='fas fa-tshirt'><span id='Hfont'>1</span></div><div id='Gshirt' class='fas fa-tshirt'><span id='Gfont'>2</span></div></br></br>";
        newDiv.insertAdjacentHTML("beforeend", "Sprintgeschiwindigkeit<label for='sMin'>Min</label><input type='number' id='sMin' name='sMin' min='10' max='30' value='22' step='2'></br><label for='sMax'>Max</label><input type='number' id='sMax' name='sMax' min='20' max='40' value='34' step='2'></br></br>Präzision<label for='pMin'>Min</label><input type='number' id='pMin' name='pMin' min='40' max='90' value='64' step='2'></br><label for='pMax'>Max</label><input type='number' id='pMax' name='pMax' min='50' max='99' value='96' step='2'></br></br>");
        // let startBtn2: HTMLButtonElement = <HTMLButtonElement>document.getElementById("startBtn");
        let startBtn2 = document.createElement("button");
        startBtn2.innerText = "Start";
        startBtn2.id = "startBtn";
        startBtn2.addEventListener("click", soccer_simulation.generateSimulation);
        soccer_simulation.settingsDiv.appendChild(newDiv);
        newDiv.appendChild(startBtn2);
        // settingsDiv.appendChild(startBtn2);
    }
    soccer_simulation.showSettingsDiv = showSettingsDiv;
    function displaySettings(_event) {
        let target = _event.target;
        let heimShirt = document.getElementById("Hshirt");
        let gastShirt = document.getElementById("Gshirt");
        let heimFont = document.getElementById("Hfont");
        let gastFont = document.getElementById("Gfont");
        if (target.name == "tHeim_shirt") {
            heimShirt.style.color = target.value;
        }
        else if (target.name == "tGast_shirt") {
            gastShirt.style.color = target.value;
        }
        else if (target.name == "tHeim_font") {
            heimFont.style.color = target.value;
        }
        else if (target.name == "tGast_font") {
            gastFont.style.color = target.value;
        }
    }
    soccer_simulation.displaySettings = displaySettings;
    function displaySettingsCanvas(_event) {
        let target = _event.target;
        if (target.name == "tHeim_font") {
            soccer_simulation.homeColorFont = target.value;
        }
        else if (target.name == "tGast_font") {
            soccer_simulation.guestColorFont = target.value;
        }
        soccer_simulation.drawPlayersBench();
    }
    soccer_simulation.displaySettingsCanvas = displaySettingsCanvas;
    function getInputData() {
        soccer_simulation.form = document.querySelector("form");
        let formData = new FormData(soccer_simulation.form);
        for (let entry of formData) {
            let selector = "[name='" + entry[0] + "']";
            let item = document.querySelector(selector);
            switch (entry[0]) {
                case "tHeim_shirt":
                    console.log(item.value);
                    soccer_simulation.homeColorShirt = item.value;
                    break;
                case "tHeim_font":
                    console.log(item.value);
                    soccer_simulation.homeColorFont = item.value;
                    break;
                case "tGast_shirt":
                    console.log(item.value);
                    soccer_simulation.guestColorShirt = item.value;
                    break;
                case "tGast_font":
                    console.log(item.value);
                    soccer_simulation.guestColorFont = item.value;
                    break;
                case "sMin":
                    console.log(item.value);
                    soccer_simulation.speedMin = parseFloat(item.value);
                    break;
                case "sMax":
                    console.log(item.value);
                    soccer_simulation.speedMax = parseFloat(item.value);
                    break;
                case "pMin":
                    console.log(item.value);
                    soccer_simulation.precisionMin = parseFloat(item.value);
                    break;
                case "pMax":
                    console.log(item.value);
                    soccer_simulation.precisionMax = parseFloat(item.value);
                    break;
                default:
            }
        }
        if (checkSettingsSpeed() == false) {
            console.log("false");
            return false;
        }
        else if (checkSettingsSpeed() == true) {
            if (checkSettingsPrecision() == false) {
                console.log("false");
                return false;
            }
            else if (checkSettingsPrecision() == true) {
                console.log("true");
            }
        }
        return true;
    }
    soccer_simulation.getInputData = getInputData;
    function checkSettingsSpeed() {
        if (soccer_simulation.speedMax < soccer_simulation.speedMin) {
            alert("nicht möglich");
            return false;
        }
        else if (soccer_simulation.speedMin > soccer_simulation.speedMax) {
            alert("nicht möglich");
            return false;
        }
        else
            return true;
    }
    soccer_simulation.checkSettingsSpeed = checkSettingsSpeed;
    function checkSettingsPrecision() {
        if (soccer_simulation.precisionMax < soccer_simulation.precisionMin) {
            alert("nicht möglich");
            return false;
        }
        else if (soccer_simulation.precisionMin > soccer_simulation.precisionMax) {
            alert("nicht möglich");
            return false;
        }
        else
            return true;
    }
    soccer_simulation.checkSettingsPrecision = checkSettingsPrecision;
})(soccer_simulation || (soccer_simulation = {}));
//# sourceMappingURL=settings.js.map