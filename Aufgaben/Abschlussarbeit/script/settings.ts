namespace soccer_simulation {

    export function changeSettingsDiv(): void {

        // settingsButton.style.display = "block";

        settingsDiv.innerHTML = "";
        // settingsDiv.style.display = "none";
        settingsDiv.style.border = "none";
        
        possessionDiv.style.display = "none";
        possessionDiv.style.border = "none";

        selectedDiv.style.display = "none";
        selectedDiv.style.border = "none";

        // let settingsBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("settingsBtn");
        let settingsBtn: HTMLButtonElement = document.createElement("button");
        settingsBtn.innerHTML = "Settings <small class='fas fa-cog'></small>";
        settingsBtn.id = "settingsBtn";
        settingsBtn.addEventListener("click", showSettingsDiv);

        settingsDiv.appendChild(settingsBtn);
    }

    export function showSettingsDiv(): void {

        settingsOpen = true;

        // settingsButton.style.display = "none";

        settingsDiv.innerHTML = "";
        settingsDiv.style.border = "2px solid black";

        possessionDiv.style.display = "none";
        possessionDiv.style.border = "none";

        selectedDiv.style.display = "none";
        selectedDiv.style.border = "none";

        let newDiv: HTMLDivElement = document.createElement("div");
        newDiv.innerHTML = "Heim-Team Trikot: <input type='color' id='tHeim_shirt' name='tHeim_shirt' value='#94cad1'><input type='color' id='tHeim_font' name='tHeim_font' value='#08444d'></br>Gast-Team Trikot:<input type='color' id='tGast_shirt' name='tGast_shirt' value='#4d0808'><input type='color' id='tGast_font' name='tGast_font' value='#ff6666'></br><div id='Hshirt' class='fas fa-tshirt'><span id='Hfont'>1</span></div><div id='Gshirt' class='fas fa-tshirt'><span id='Gfont'>2</span></div></br></br>";
        newDiv.insertAdjacentHTML("beforeend", "Sprintgeschiwindigkeit<label for='sMin'>Min</label><input type='number' id='sMin' name='sMin' min='10' max='30' value='22' step='2'></br><label for='sMax'>Max</label><input type='number' id='sMax' name='sMax' min='20' max='40' value='34' step='2'></br></br>Präzision<label for='pMin'>Min</label><input type='number' id='pMin' name='pMin' min='40' max='90' value='64' step='2'></br><label for='pMax'>Max</label><input type='number' id='pMax' name='pMax' min='50' max='99' value='96' step='2'></br></br>");
        
        // let startBtn2: HTMLButtonElement = <HTMLButtonElement>document.getElementById("startBtn");
        let startBtn2: HTMLButtonElement = document.createElement("button");
        startBtn2.innerText = "Start";
        startBtn2.id = "startBtn";
        startBtn2.addEventListener("click", generateSimulation);

        settingsDiv.appendChild(newDiv);
        newDiv.appendChild(startBtn2);
        // settingsDiv.appendChild(startBtn2);
    }
    
    export function displaySettings(_event: Event): void {
        let target: HTMLInputElement = <HTMLInputElement>_event.target;

        let heimShirt: HTMLDivElement = <HTMLDivElement>document.getElementById("Hshirt");
        let gastShirt: HTMLDivElement = <HTMLDivElement>document.getElementById("Gshirt");

        let heimFont: HTMLSpanElement = <HTMLSpanElement>document.getElementById("Hfont");
        let gastFont: HTMLSpanElement = <HTMLSpanElement>document.getElementById("Gfont");

        if (target.name == "tHeim_shirt") {
            heimShirt.style.color = target.value;

        } else if (target.name == "tGast_shirt") {
            gastShirt.style.color = target.value;

        } else if (target.name == "tHeim_font") {
            heimFont.style.color = target.value;

        } else if (target.name == "tGast_font") {
            gastFont.style.color = target.value;
        }
    }

    export function displaySettingsCanvas(_event: Event): void {

        let target: HTMLInputElement = <HTMLInputElement>_event.target;

        if (target.name == "tHeim_font") {
            homeColorFont = target.value;

        } else if (target.name == "tGast_font") {
            guestColorFont = target.value;
        }

        drawPlayersBench();
    }

    export function getInputData(): boolean {

        form = <HTMLFormElement>document.querySelector("form");
        let formData: FormData = new FormData(form);

        for (let entry of formData) {
            let selector: string = "[name='" + entry[0] + "']";
            let item: HTMLInputElement = <HTMLInputElement>document.querySelector(selector);
            switch (entry[0]) {
                case "tHeim_shirt":
                    console.log(item.value);
                    homeColorShirt = item.value;
                    break;
                case "tHeim_font":
                    console.log(item.value);
                    homeColorFont = item.value;
                    break;
                case "tGast_shirt":
                    console.log(item.value);
                    guestColorShirt = item.value;
                    break;
                case "tGast_font":
                    console.log(item.value);
                    guestColorFont = item.value;
                    break;
                case "sMin":
                    console.log(item.value);
                    speedMin = parseFloat(item.value);
                    break;
                case "sMax":
                    console.log(item.value);
                    speedMax = parseFloat(item.value);
                    break;
                case "pMin":
                    console.log(item.value);
                    precisionMin = parseFloat(item.value);
                    break;
                case "pMax":
                    console.log(item.value);
                    precisionMax = parseFloat(item.value);
                    break;
                default:
            }
        }

        if (checkSettingsSpeed() == false) {
            console.log("false");
            return false;
        } else if (checkSettingsSpeed() == true) {
            if (checkSettingsPrecision() == false) {
                console.log("false");
                return false;
            } else if (checkSettingsPrecision() == true) {
                console.log("true");
            }
        }
        return true;
    }

    export function checkSettingsSpeed(): boolean {
        
        if (speedMax < speedMin) {
            alert("nicht möglich");
            return false;
        } else if (speedMin > speedMax) {
            alert("nicht möglich");
            return false;
        } else return true;
    }

    export function checkSettingsPrecision(): boolean {
        
        if (precisionMax < precisionMin) {
            alert("nicht möglich");
            return false;
        } else if (precisionMin > precisionMax) {
            alert("nicht möglich");
            return false;
        } else return true;
    }
}