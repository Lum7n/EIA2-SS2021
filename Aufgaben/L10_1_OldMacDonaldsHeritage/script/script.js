"use strict";
var L10_1_OldMacDonaldsHeritage;
(function (L10_1_OldMacDonaldsHeritage) {
    window.addEventListener("load", init);
    let dove = new L10_1_OldMacDonaldsHeritage.Dove();
    let fox = new L10_1_OldMacDonaldsHeritage.Fox();
    let mouse = new L10_1_OldMacDonaldsHeritage.Mouse();
    let rabbit = new L10_1_OldMacDonaldsHeritage.Rabbit();
    let sheep = new L10_1_OldMacDonaldsHeritage.Sheep();
    let mainSection;
    let index = 1;
    function init(_event) {
        let buttonNext = document.getElementById("next");
        buttonNext.addEventListener("click", nextDay);
        dailyRoutine();
    }
    function dailyRoutine() {
        routineDove();
        routineFox();
        routineMouse();
        routineRabbit();
        routineSheep();
    }
    function nextDay() {
        index++;
        let headline = document.getElementById("head");
        headline.innerText = "Day " + index;
        mainSection.innerHTML = "";
        dailyRoutine();
    }
    function routineDove() {
        mainSection = document.getElementById("main");
        let newDiv = document.createElement("div");
        newDiv.innerHTML = "<h2> dove </h2>" + dove.sing() + "<br>" + dove.eat() + "<br>" + dove.doSpecialAction() + "<br><br>";
        mainSection.appendChild(newDiv);
    }
    function routineFox() {
        mainSection = document.getElementById("main");
        let newDiv = document.createElement("div");
        newDiv.innerHTML = "<h2> fox </h2>" + fox.sing() + "<br>" + fox.eat() + "<br>" + fox.doSpecialAction() + "<br><br>";
        mainSection.appendChild(newDiv);
    }
    function routineMouse() {
        mainSection = document.getElementById("main");
        let newDiv = document.createElement("div");
        newDiv.innerHTML = "<h2> mouse </h2>" + mouse.sing() + "<br>" + mouse.eat() + "<br>" + mouse.doSpecialAction() + "<br><br>";
        mainSection.appendChild(newDiv);
    }
    function routineRabbit() {
        mainSection = document.getElementById("main");
        let newDiv = document.createElement("div");
        newDiv.innerHTML = "<h2> rabbit </h2>" + rabbit.sing() + "<br>" + rabbit.eat() + "<br>" + rabbit.doSpecialAction() + "<br><br>";
        mainSection.appendChild(newDiv);
    }
    function routineSheep() {
        mainSection = document.getElementById("main");
        let newDiv = document.createElement("div");
        newDiv.innerHTML = "<h2> sheep </h2>" + sheep.sing() + "<br>" + sheep.eat() + "<br>" + sheep.doSpecialAction() + "<br><br>";
        mainSection.appendChild(newDiv);
    }
})(L10_1_OldMacDonaldsHeritage || (L10_1_OldMacDonaldsHeritage = {}));
//# sourceMappingURL=script.js.map