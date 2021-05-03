"use strict";
var Memory;
(function (Memory) {
    let allcards = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E",
        "F", "F", "G", "G", "H", "H", "I", "I", "J", "J",
        "K", "K", "L", "L", "M", "M", "N", "N", "O", "O",
        "P", "P", "Q", "Q", "R", "R", "S", "S", "T", "T",
        "U", "U", "V", "V", "W", "W", "X", "X"];
    let playcards = [];
    let chosenCards = [];
    let matches = [];
    let card1;
    let card2;
    let parent1;
    let parent2;
    let homeScreen;
    let container;
    let form;
    let startButton;
    let cardColor = "#46469b";
    let cardBackColor = "#521438";
    let fontColor = "#ffffff";
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        homeScreen = document.getElementById("homeScreen");
        container = document.getElementById("container");
        form = document.querySelector("form");
        startButton = document.getElementById("startbtn");
        startButton.addEventListener("click", generateContent);
        homeScreen.addEventListener("change", displaySettings);
        homeScreen.addEventListener("input", displaySettings);
    }
    function displaySettings(_event) {
        let target = _event.target;
        let sampleCardBack = document.getElementById("sampleCardBack");
        let sampleCardFront = document.getElementById("sampleCardFront");
        let fontSize;
        if (target.name == "size") {
            sampleCardBack.style.width = target.value + "px";
            sampleCardBack.style.height = target.value + "px";
            sampleCardFront.style.width = target.value + "px";
            sampleCardFront.style.height = target.value + "px";
            fontSize = parseFloat(target.value);
            fontSize = fontSize - 10;
            sampleCardBack.style.fontSize = fontSize + "px";
            sampleCardFront.style.fontSize = fontSize + "px";
        }
        else if (target.name == "background") {
            homeScreen.style.backgroundColor = target.value;
            container.style.backgroundColor = target.value;
        }
        else if (target.name == "cardFrontColor") {
            sampleCardFront.style.backgroundColor = target.value;
        }
        else if (target.name == "cardBackColor") {
            sampleCardBack.style.backgroundColor = target.value;
            sampleCardBack.style.color = target.value;
        }
        else if (target.name == "fontColor") {
            sampleCardFront.style.color = target.value;
        }
        else if (target.name == "fontType") {
            switch (target.value) {
                case "opt1":
                    let fontType1 = "'Times New Roman', Times, serif";
                    sampleCardFront.style.fontFamily = fontType1;
                    break;
                case "opt2":
                    let fontType2 = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans'";
                    sampleCardFront.style.fontFamily = fontType2;
                    break;
                case "opt3":
                    let fontType3 = "monospace";
                    sampleCardFront.style.fontFamily = fontType3;
                    break;
                case "opt4":
                    let fontType4 = "Calibri";
                    sampleCardFront.style.fontFamily = fontType4;
                    break;
                default:
                    break;
            }
            // sampleCardFront.style.fontFamily = target.value;
        }
    }
    function generateContent() {
        homeScreen.style.display = "none";
        startButton.style.display = "none";
        let title = document.querySelector("h1");
        title.style.display = "inherit";
        let formData = new FormData(form);
        let nPairs = 16;
        let cardSize = 120;
        let fontFamily = "serif";
        let fontType1 = "'Times New Roman', Times, serif";
        let fontType2 = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans'";
        let fontType3 = "monospace";
        let fontType4 = "Calibri";
        for (let entry of formData) {
            let selector = "[name='" + entry[0] + "']";
            let item = document.querySelector(selector);
            switch (entry[0]) {
                case "number":
                    // console.log(item.value);
                    nPairs = parseFloat(item.value);
                    break;
                case "size":
                    // console.log(item.value);
                    cardSize = parseFloat(item.value);
                    break;
                case "cardFrontColor":
                    // console.log(item.value);
                    cardColor = item.value;
                    break;
                case "cardBackColor":
                    // console.log(item.value);
                    cardBackColor = item.value;
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
        let amountCards = nPairs * 2;
        for (let i = 0; i < amountCards; i++) {
            let oneLetterArray = allcards.slice(i, i + 1);
            let oneLetter = oneLetterArray.toString();
            playcards.push(oneLetter);
            // console.log(playcards);
        }
        shuffle(playcards);
        // console.log(playcards);
        for (let k = 0; k < playcards.length; k++) {
            let div = document.createElement("div");
            div.classList.add("cardContainer");
            div.style.width = cardSize + "px";
            div.style.height = cardSize + "px";
            div.style.backgroundColor = cardColor;
            let span = document.createElement("span");
            span.innerHTML = playcards[k];
            span.classList.add("unhidden");
            let fontSize = cardSize - 18;
            span.style.fontSize = fontSize + "px";
            span.style.color = fontColor;
            span.style.fontFamily = fontFamily;
            let checkIfSecondLetter = document.getElementById(playcards[k] + "1");
            if (checkIfSecondLetter == null) {
                span.id = playcards[k] + "1";
            }
            else {
                span.id = playcards[k] + "2";
            }
            span.addEventListener("click", showLetters);
            div.appendChild(span);
            container.appendChild(div);
        }
        setTimeout(hideAllLetters, 3000);
    }
    function hideAllLetters() {
        let allSpan = document.querySelectorAll("span");
        for (let i = 0; i < allSpan.length; i++) {
            if (allSpan[i].classList.contains("unhidden")) {
                allSpan[i].classList.remove("unhidden");
                allSpan[i].classList.add("hidden");
                allSpan[i].style.color = cardBackColor;
                let parentDiv = allSpan[i].parentElement;
                parentDiv.style.backgroundColor = cardBackColor;
            }
        }
    }
    function showLetters(_event) {
        let targetSpan = _event.target;
        let targetID1 = targetSpan.id; //Help!!!! wie geht das ohne das der Linter mich gleich erhängt
        // let targetID2: string = _event.target.id;   
        // let targetID3: string = this.id;                    // alle drei Methoden funktionieren, aber das kann ja nicht die richtige Lösung sein...? oder ?
        // console.log(targetSpan, targetID1, targetID2, targetID3);
        let onlyLetter = targetID1.slice(0, 1);
        chosenCards.push(onlyLetter);
        if (chosenCards.length == 1) {
            card1 = document.getElementById(targetID1);
            parent1 = card1.parentElement;
            card1.classList.remove("hidden");
            card1.classList.add("unhidden");
            card1.style.color = fontColor;
            parent1.style.backgroundColor = cardColor;
            // console.log(card1);
        }
        else if (chosenCards.length == 2) {
            card2 = document.getElementById(targetID1);
            parent2 = card2.parentElement;
            console.log(parent2);
            card2.classList.remove("hidden");
            card2.classList.add("unhidden");
            card2.style.color = fontColor;
            parent2.style.backgroundColor = cardColor;
            // console.log(card2);
            setTimeout(checkForMatch, 500);
        }
    }
    function checkForMatch() {
        if (chosenCards[0] == chosenCards[1]) {
            // alert("it's a match!");
            parent1.style.background = "slategrey";
            parent2.style.background = "slategrey";
            let cardOneArray = chosenCards.splice(0, 1);
            let cardOne = cardOneArray.toString();
            matches.push(cardOne);
            let cardTwoArray = chosenCards.splice(1, 1);
            let cardTwo = cardTwoArray.toString();
            matches.push(cardTwo);
        }
        else {
            // alert("wrong! try again.");
            card1.classList.remove("unhidden");
            card1.classList.add("hidden");
            card1.style.color = cardBackColor;
            parent1.style.background = cardBackColor;
            card2.classList.remove("unhidden");
            card2.classList.add("hidden");
            card2.style.color = cardBackColor;
            parent2.style.background = cardBackColor;
        }
        chosenCards = [];
        if (matches.length == playcards.length) {
            alert("you won!!!");
        }
    }
    // basierend auf Fisher-Yates Shuffle
    function shuffle(_array) {
        let currentIndex = _array.length;
        let temporaryValue;
        let randomIndex;
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
})(Memory || (Memory = {}));
//# sourceMappingURL=script.js.map