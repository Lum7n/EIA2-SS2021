namespace Memory {

    let allcards: string[] = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E",
        "F", "F", "G", "G", "H", "H", "I", "I", "J", "J",
        "K", "K", "L", "L", "M", "M", "N", "N", "O", "O",
        "P", "P", "Q", "Q", "R", "R", "S", "S", "T", "T",
        "U", "U", "V", "V", "W", "W", "X", "X"];

    let playcards: string[] = [];
    let chosenCards: string[] = [];
    let matches: string[] = [];

    let card1: HTMLElement;
    let card2: HTMLElement;

    let parent1: HTMLDivElement;
    let parent2: HTMLDivElement;

    let homeScreen: HTMLDivElement;
    let container: HTMLDivElement;
    let form: HTMLFormElement;
    let startButton: HTMLButtonElement;

    let cardColor: string = "#46469b";
    let fontColor: string = "#ffffff";

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {

        homeScreen = <HTMLDivElement>document.getElementById("homeScreen");
        container = <HTMLDivElement>document.getElementById("container");

        form = <HTMLFormElement>document.querySelector("form");

        startButton = <HTMLButtonElement>document.getElementById("startbtn");
        startButton.addEventListener("click", generateContent);

        homeScreen.addEventListener("change", displaySettings);
        homeScreen.addEventListener("input", displaySettings);
    }


    function displaySettings(_event: Event): void {
        let target: HTMLInputElement = <HTMLInputElement>_event.target;

        let sampleCardBack: HTMLDivElement = <HTMLDivElement>document.getElementById("sampleCardBack");
        let sampleCardFront: HTMLDivElement = <HTMLDivElement>document.getElementById("sampleCardFront");

        let fontSize: number;

        if (target.name == "size") {
            sampleCardBack.style.width = target.value + "px";
            sampleCardBack.style.height = target.value + "px";

            sampleCardFront.style.width = target.value + "px";
            sampleCardFront.style.height = target.value + "px";

            fontSize = parseFloat(target.value);
            fontSize = fontSize - 10;

            sampleCardBack.style.fontSize = fontSize + "px";
            sampleCardFront.style.fontSize = fontSize + "px";

        } else if (target.name == "background") {
            homeScreen.style.backgroundColor = target.value;
            container.style.backgroundColor = target.value;

        } else if (target.name == "cardColor") {
            sampleCardBack.style.backgroundColor = target.value;
            sampleCardBack.style.color = target.value;
            sampleCardFront.style.backgroundColor = target.value;

        } else if (target.name == "fontColor") {
            sampleCardFront.style.color = target.value;

        } else if (target.name == "fontType") {

            switch (target.value) {
                case "opt1":
                    let fontType1: string = "'Times New Roman', Times, serif";
                    sampleCardFront.style.fontFamily = fontType1;
                    break;

                case "opt2":
                    let fontType2: string = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans'";
                    sampleCardFront.style.fontFamily = fontType2;
                    break;

                case "opt3":
                    let fontType3: string = "monospace";
                    sampleCardFront.style.fontFamily = fontType3;
                    break;

                case "opt4":
                    let fontType4: string = "Calibri";
                    sampleCardFront.style.fontFamily = fontType4;
                    break;

                default:
                    break;
            }
            // sampleCardFront.style.fontFamily = target.value;
        }
    }

    function generateContent(): void {

        homeScreen.style.display = "none";
        startButton.style.display = "none";

        let title: HTMLElement = <HTMLElement>document.querySelector("h1");
        title.style.display = "inherit";

        let formData: FormData = new FormData(form);

        let nPairs: number = 16;
        let cardSize: number = 120;
        let fontFamily: string = "serif";

        let fontType1: string = "'Times New Roman', Times, serif";
        let fontType2: string = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans'";
        let fontType3: string = "monospace";
        let fontType4: string = "Calibri";

        for (let entry of formData) {
            let selector: string = "[name='" + entry[0] + "']";
            let item: HTMLInputElement = <HTMLInputElement>document.querySelector(selector);
            switch (entry[0]) {
                case "number":
                    // console.log(item.value);
                    nPairs = parseFloat(item.value);
                    break;
                case "size":
                    // console.log(item.value);
                    cardSize = parseFloat(item.value);
                    break;
                case "cardColor":
                    // console.log(item.value);
                    cardColor = item.value;
                    break;
                case "fontColor":
                    // console.log(item.value);
                    fontColor = item.value;
                    break;
                case "fontType":
                    // console.log(item.value);
                    switch (item.value) {
                        case "opt1":
                            fontFamily = fontType1;
                            break;
                        case "opt2":
                            fontFamily = fontType2;
                            break;
                        case "opt3":
                            fontFamily = fontType3;
                            break;
                        case "opt4":
                            fontFamily = fontType4;
                            break;
                        default:
                            break;
                    }
                    break;
                default:
            }
        }

        let amountCards: number = nPairs * 2;

        for (let i: number = 0; i < amountCards; i++) {
            let oneLetterArray: string[] = allcards.slice(i, i + 1);
            let oneLetter: string = oneLetterArray.toString();
            playcards.push(oneLetter);
            // console.log(playcards);
        }
        shuffle(playcards);
        // console.log(playcards);

        for (let k: number = 0; k < playcards.length; k++) {
            let div: HTMLDivElement = document.createElement("div");
            div.classList.add("cardContainer");

            div.style.width = cardSize + "px";
            div.style.height = cardSize + "px";

            div.style.backgroundColor = cardColor;

            let span: HTMLSpanElement = document.createElement("span");
            span.innerHTML = playcards[k];
            span.classList.add("unhidden");

            let fontSize: number = cardSize - 18;
            span.style.fontSize = fontSize + "px";
            span.style.color = fontColor;
            span.style.fontFamily = fontFamily;

            let checkIfSecondLetter: HTMLElement = <HTMLElement>document.getElementById(playcards[k] + "1");
            if (checkIfSecondLetter == null) {
                span.id = playcards[k] + "1";
            } else {
                span.id = playcards[k] + "2";
            }

            span.addEventListener("click", showLetters);
            div.appendChild(span);
            container.appendChild(div);

            let width: number = span.offsetWidth;
            let restWidth: number = cardSize - width;
            let paddingLeft: number = restWidth / 2;
            let paddingRight: number = restWidth / 2;
            span.style.paddingLeft = paddingLeft + "px";
            span.style.paddingRight = paddingRight + "px";

            let height: number = span.offsetHeight;
            let restHeight: number = cardSize - height;
            let paddingTop: number = restHeight / 3;
            let paddingBottom: number = paddingTop * 2;
            span.style.paddingTop = paddingTop + 5 + "px";
            span.style.paddingBottom = paddingBottom + "px";
        }

        setTimeout(hideAllLetters, 3000);
    }

    function hideAllLetters(): void {

        let allSpan: NodeListOf<HTMLSpanElement> = document.querySelectorAll("span");

        for (let i: number = 0; i < allSpan.length; i++) {

            if (allSpan[i].classList.contains("unhidden")) {
                allSpan[i].classList.remove("unhidden");
                allSpan[i].classList.add("hidden");
                allSpan[i].style.color = cardColor;
            }
        }
    }

    function showLetters(_event: Event): void {

        let targetSpan: EventTarget = <EventTarget>_event.target;
        let targetID1: string = targetSpan.id;                                //Help!!!! wie geht das ohne das der Linter mich gleich erhängt
        // let targetID2: string = _event.target.id;   
        // let targetID3: string = this.id;                    // alle drei Methoden funktionieren, aber das kann ja nicht die richtige Lösung sein...? oder ?

        // console.log(targetSpan, targetID1, targetID2, targetID3);
      
        let onlyLetter: string = targetID1.slice(0, 1);
        chosenCards.push(onlyLetter);

        if (chosenCards.length == 1) {
            card1 = <HTMLElement>document.getElementById(targetID1);
            parent1 = <HTMLDivElement>card1.parentElement;
            card1.classList.remove("hidden");
            card1.classList.add("unhidden");
            card1.style.color = fontColor;
            // console.log(card1);
        } else if (chosenCards.length == 2) {
            card2 = <HTMLElement>document.getElementById(targetID1);
            parent2 = <HTMLDivElement>card2.parentElement;
            console.log(parent2);
            card2.classList.remove("hidden");
            card2.classList.add("unhidden");
            card2.style.color = fontColor;
            // console.log(card2);
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch(): void {


        if (chosenCards[0] == chosenCards[1]) {
            // alert("it's a match!");
            parent1.style.background = "slategrey";
            parent2.style.background = "slategrey";

            let cardOneArray: string[] = chosenCards.splice(0, 1);
            let cardOne: string = cardOneArray.toString();
            matches.push(cardOne);
            let cardTwoArray: string[] = chosenCards.splice(1, 1);
            let cardTwo: string = cardTwoArray.toString();
            matches.push(cardTwo);

        } else {
            // alert("wrong! try again.");

            card1.classList.remove("unhidden");
            card1.classList.add("hidden");
            card1.style.color = cardColor;

            card2.classList.remove("unhidden");
            card2.classList.add("hidden");
            card2.style.color = cardColor;
        }

        chosenCards = [];

        if (matches.length == playcards.length) {
            alert("you won!!!");
        }
    }

    // basierend auf Fisher-Yates Shuffle
    function shuffle(_array: string[]): string[] {

        let currentIndex: number = _array.length;
        let temporaryValue: string;
        let randomIndex: number;

        // Solange noch Elemente vorhanden sind ...
        while (0 !== currentIndex) {

            // ein vorhandenes Element auswählen und ...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // mit dem Aktuellen tauschen.
            temporaryValue = _array[currentIndex];
            _array[currentIndex] = _array[randomIndex];
            _array[randomIndex] = temporaryValue;
        }
        return _array;
    }
}