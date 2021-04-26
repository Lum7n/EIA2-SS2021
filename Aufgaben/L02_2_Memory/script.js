"use strict";
var valentina;
(function (valentina) {
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
        let introduction;
        let container;
        let startButton;
        window.addEventListener("load", handleLoad);
        function handleLoad() {
            introduction = document.getElementById("introduction");
            container = document.getElementById("container");
            startButton = document.getElementById("startbtn");
            startButton.addEventListener("click", generateContent);
        }
        function generateContent() {
            introduction.style.display = "none";
            startButton.style.display = "none";
            let input = document.getElementById("number");
            let nPairs = parseInt(input.value);
            // console.log(nPairs);
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
                div.style.backgroundColor = "#46469b";
                let span = document.createElement("span");
                span.innerHTML = playcards[k];
                span.classList.add("unhidden");
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
                let width = span.offsetWidth;
                let restWidth = 100 - width;
                let paddingLeft = restWidth / 2;
                let paddingRight = restWidth / 2;
                span.style.paddingLeft = paddingLeft + "px";
                span.style.paddingRight = paddingRight + "px";
            }
            setTimeout(hideAllLetters, 3000);
        }
        function hideAllLetters() {
            let allSpan = document.querySelectorAll("span");
            for (let i = 0; i < allSpan.length; i++) {
                if (allSpan[i].classList.contains("unhidden")) {
                    allSpan[i].classList.remove("unhidden");
                    allSpan[i].classList.add("hidden");
                }
            }
        }
        function showLetters(_event) {
            let targetSpan = _event.target;
            let targetID1 = targetSpan.id; //Help!!!! wie geht das ohne das der Linter mich gleich erhängt
            // let targetID2: string = _event.target.id;   
            // let targetID3: string = this.id;                    // alle drei Methoden funktionieren, aber das kann ja nicht die richtige Lösung sein...? oder ?
            // console.log(targetSpan, targetID1, targetID2, targetID3);
            targetSpan.classList.remove("hidden");
            targetSpan.classList.add("unhidden");
            let onlyLetter = targetID1.slice(0, 1);
            chosenCards.push(onlyLetter);
            if (chosenCards.length == 1) {
                card1 = document.getElementById(targetID1);
                console.log(card1);
            }
            else if (chosenCards.length == 2) {
                card2 = document.getElementById(targetID1);
                console.log(card2);
                setTimeout(checkForMatch, 500);
            }
        }
        function checkForMatch() {
            if (chosenCards[0] == chosenCards[1]) {
                alert("it's a match!");
                card1.style.background = "slategrey";
                card2.style.background = "slategrey";
                let cardOneArray = chosenCards.splice(0, 1);
                let cardOne = cardOneArray.toString();
                matches.push(cardOne);
                let cardTwoArray = chosenCards.splice(1, 1);
                let cardTwo = cardTwoArray.toString();
                matches.push(cardTwo);
            }
            else {
                alert("wrong! try again.");
                card1.classList.remove("unhidden");
                card1.classList.add("hidden");
                card2.classList.remove("unhidden");
                card2.classList.add("hidden");
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
    })(Memory = valentina.Memory || (valentina.Memory = {}));
})(valentina || (valentina = {}));
//# sourceMappingURL=script.js.map