namespace L10_1_OldMacDonaldsHeritage {

    window.addEventListener("load", init);

    let dove: Dove = new Dove();
    let fox: Fox = new Fox();
    let mouse: Mouse = new Mouse();
    let rabbit: Rabbit = new Rabbit();
    let sheep: Sheep = new Sheep();

    let mainSection: HTMLElement;
    let index: number = 1;

    function init(_event: Event): void {

        let buttonNext: HTMLButtonElement = <HTMLButtonElement>document.getElementById("next");
        buttonNext.addEventListener("click", nextDay);

        dailyRoutine();
    }

    function dailyRoutine(): void {
        routineDove();
        routineFox();
        routineMouse();
        routineRabbit();
        routineSheep();
    }

    function nextDay(): void {

        index ++;
        let headline: HTMLElement = <HTMLElement>document.getElementById("head");
        headline.innerText = "Day " + index;

        mainSection.innerHTML = "";
        dailyRoutine();
    }

    function routineDove(): void {

        mainSection = <HTMLElement>document.getElementById("main");
        let newDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");

        newDiv.innerHTML = "<h2> dove </h2>" + dove.sing() + "<br>" + dove.eat() + "<br>" + dove.doSpecialAction() + "<br><br>";
        mainSection.appendChild(newDiv);
    }

    function routineFox(): void {

        mainSection = <HTMLElement>document.getElementById("main");
        let newDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");

        newDiv.innerHTML = "<h2> fox </h2>" + fox.sing() + "<br>" + fox.eat() + "<br>" + fox.doSpecialAction() + "<br><br>";
        mainSection.appendChild(newDiv);
    }

    function routineMouse(): void {

        mainSection = <HTMLElement>document.getElementById("main");
        let newDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");

        newDiv.innerHTML = "<h2> mouse </h2>" + mouse.sing() + "<br>" + mouse.eat() + "<br>" + mouse.doSpecialAction() + "<br><br>";
        mainSection.appendChild(newDiv);
    }

    function routineRabbit(): void {

        mainSection = <HTMLElement>document.getElementById("main");
        let newDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");

        newDiv.innerHTML = "<h2> rabbit </h2>" + rabbit.sing() + "<br>" + rabbit.eat() + "<br>" + rabbit.doSpecialAction() + "<br><br>";
        mainSection.appendChild(newDiv);
    }

    function routineSheep(): void {

        mainSection = <HTMLElement>document.getElementById("main");
        let newDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");

        newDiv.innerHTML = "<h2> sheep </h2>" + sheep.sing() + "<br>" + sheep.eat() + "<br>" + sheep.doSpecialAction() + "<br><br>";
        mainSection.appendChild(newDiv);
    }
}