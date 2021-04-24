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
        // let playcards: string[];
        // let matches: string[];
        // let chosenCards: string[];
        //.addEventListener("click", showLetters);
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
            let input = document.getElementById("number");
            let nPairs = parseInt(input.value);
            console.log(nPairs);
        }
        // let allCards: string[] = ["A", "B", "C", "D", "E", "F"];
        // console.log(allCards);
        // let amountPairs: number = 4;
        // let playingCardsOne: string[] = allCards.slice(0, amountPairs);
        // let playingCardsTwo: string[] = playingCardsOne.slice(0, playingCardsOne.length);
        // console.log(playingCardsOne);
        // console.log(playingCardsTwo);
        // getL(playingCardsOne);
        // function getL(_playingCardsOne: string[]): void {
        //     // for (let index = 0; index < array.length; index++) {
        //     //     const element = array[index];
        //     // }
        //     let x: number = Math.random();
        //     x = x * _playingCardsOne.length;
        //     x = Math.floor(x);
        //     let oneCard: string[] = _playingCardsOne.splice(x, 1);
        //     console.log(oneCard);
        //     console.log(playingCardsOne);
        // }
        // let pairsInput: string;
        // window.addEventListener("load", handleLoad);
        // function handleLoad(): void {
        //     pairsInput = <string>prompt("how many pairs:", "5");
        //     if (pairsInput) {
        //         getCards();
        //         startTimer();
        //     }
        // }
        // function getCards(): void {
        //     amountPairs = parseInt(pairsInput);
        //     console.log(amountPairs);
        // }
    })(Memory = valentina.Memory || (valentina.Memory = {}));
})(valentina || (valentina = {}));
//# sourceMappingURL=script.js.map