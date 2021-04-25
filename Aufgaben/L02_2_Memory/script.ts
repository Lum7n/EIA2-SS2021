namespace valentina.Memory {

    let allcards: string[] = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E",
        "F", "F", "G", "G", "H", "H", "I", "I", "J", "J",
        "K", "K", "L", "L", "M", "M", "N", "N", "O", "O",
        "P", "P", "Q", "Q", "R", "R", "S", "S", "T", "T",
        "U", "U", "V", "V", "W", "W", "X", "X"];

    let playcards: string[] = [];
    let chosenCards: string[] = [];
    let matches: string[] = [];

    let introduction: HTMLDivElement;
    let container: HTMLDivElement;
    let startButton: HTMLButtonElement;

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {

        introduction = <HTMLDivElement>document.getElementById("introduction");
        container = <HTMLDivElement>document.getElementById("container");

        startButton = <HTMLButtonElement>document.getElementById("startbtn");
        startButton.addEventListener("click", generateContent);
    }


    function generateContent(): void {

        introduction.style.display = "none";
        startButton.style.display = "none";

        let input: HTMLInputElement = <HTMLInputElement>document.getElementById("number");
        let nPairs: number = <number>parseInt(input.value);
        // console.log(nPairs);
        let amountCards: number = nPairs * 2;

        for (let i: number = 0; i < amountCards; i++) {
            let oneLetterArray: string[] = allcards.slice(i, i + 1);
            let oneLetter: string = oneLetterArray.toString();
            playcards.push(oneLetter);
            // console.log(playcards);
        }
        shuffle(playcards);
        console.log(playcards);

        for (let k: number = 0; k < playcards.length; k++) {
            let div: HTMLDivElement = document.createElement("div");
            div.classList.add("cardContainer");
            div.style.backgroundColor = "#46469b";

            let span: HTMLSpanElement = document.createElement("span");
            span.innerHTML = playcards[k];
            span.id = playcards[k];
            span.style.color = "#46469b";
            span.addEventListener("click", showLetters);

            div.appendChild(span);
            container.appendChild(div);
        }
    }

    function showLetters(_event: Event): void {

        let targetSpan: EventTarget = <EventTarget>_event.target;
        let targetID1: string = this.id;                                //Help!!!! wie geht das ohne das der Linter mich gleich erhängt
        let targetID2: string = _event.target.id;                       // die beiden Methoden funktionieren, aber das kann ja nicht die richtige Lösung sein...? oder ?

        console.log(targetSpan, targetID1, targetID2);

        _event.target.style.color = "#ffffff";
        chosenCards.push(targetID1);

        if (chosenCards.length == 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch(): void {

        if (chosenCards[0] == chosenCards[1]) {
            alert("it's a match!");

        //how can I find the two spans_ here less important cause they're right but....

            let cardOneArray: string[] = chosenCards.splice(0, 1);
            let cardOne: string = cardOneArray.toString();
            matches.push(cardOne);
            let cardTwoArray: string[] = chosenCards.splice(1, 1);
            let cardTwo: string = cardTwoArray.toString();
            matches.push(cardTwo);

        } else {
            alert("wrong! try again.");

        // here really important, i need to hide them again...
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