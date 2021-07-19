"use strict";
var soccer_simulation;
(function (soccer_simulation) {
    window.addEventListener("load", init);
    // canvas
    let canvas;
    let backgroundimage;
    let scoreSpan;
    let scoreHome = 0;
    let scoreGuest = 0;
    // position of canvas-objectes
    let homeGoalTop = new soccer_simulation.Vector(5, 62.5);
    let homeGoalBottom = new soccer_simulation.Vector(5, 77.5);
    let guestGoalTop = new soccer_simulation.Vector(215, 62.5);
    let guestGoalBottom = new soccer_simulation.Vector(215, 77.5);
    let soccerfieldLeftTop = new soccer_simulation.Vector(5, 5);
    let soccerfieldRightBottom = new soccer_simulation.Vector(215, 145);
    let middelpoint = new soccer_simulation.Vector(110, 70);
    // moveables
    let allCharacters = [];
    let allPositionsHome = [new soccer_simulation.Vector(22.5, 70), new soccer_simulation.Vector(42.5, 32.5), new soccer_simulation.Vector(42.5, 107.5), new soccer_simulation.Vector(67.5, 70), new soccer_simulation.Vector(87.5, 122.5), new soccer_simulation.Vector(92.5, 22.5), new soccer_simulation.Vector(122.5, 47.5), new soccer_simulation.Vector(122.5, 87.5), new soccer_simulation.Vector(167.5, 70), new soccer_simulation.Vector(182.5, 17.5), new soccer_simulation.Vector(182.5, 122.5), new soccer_simulation.Vector(32.5, 145.5), new soccer_simulation.Vector(37.5, 145.5), new soccer_simulation.Vector(42.5, 145.5), new soccer_simulation.Vector(47.5, 145.5), new soccer_simulation.Vector(52.5, 145.5), new soccer_simulation.Vector(57.5, 145.5), new soccer_simulation.Vector(62.5, 145.5), new soccer_simulation.Vector(67.5, 145.5), new soccer_simulation.Vector(72.5, 145.5)];
    let allPositionsGuest = [new soccer_simulation.Vector(37.5, 17.5), new soccer_simulation.Vector(37.5, 122.5), new soccer_simulation.Vector(52.5, 70), new soccer_simulation.Vector(97.5, 52.5), new soccer_simulation.Vector(97.5, 92.5), new soccer_simulation.Vector(127.5, 117.5), new soccer_simulation.Vector(132.5, 17.5), new soccer_simulation.Vector(152.5, 70), new soccer_simulation.Vector(177.5, 32.5), new soccer_simulation.Vector(177.5, 107.5), new soccer_simulation.Vector(197.5, 70), new soccer_simulation.Vector(142.5, 145.5), new soccer_simulation.Vector(147.5, 145.5), new soccer_simulation.Vector(152.5, 145.5), new soccer_simulation.Vector(157.5, 145.5), new soccer_simulation.Vector(162.5, 145.5), new soccer_simulation.Vector(167.5, 145.5), new soccer_simulation.Vector(172.5, 145.5), new soccer_simulation.Vector(177.5, 145.5), new soccer_simulation.Vector(182.5, 145.5)];
    let homePlayer = [["M. Neuer", 10], ["M. Ginter", 27], ["R. Gosens", 20], ["M. Hummels", 50], ["A. Rüdiger", 16], ["N. Süle", 15], ["S. Gnabry", 22], ["L. Goretzka", 18], ["I. Gündogan", 21], ["K. Havertz", 29], ["J. Kimmich", 32], ["T. Kroos", 38], ["T. Müller", 25], ["J. Musiala", 14], ["F. Neuhaus", 17], ["L. Sané", 19], ["K. Volland", 31], ["T. Werner", 11], ["J. Draxler", 23], ["B. Leno", 12]];
    let guestPlayer = [["K. Mpappe", 10], ["A. Griezmann", 15], ["M. Rashford", 19], ["M. Damsgaard", 14], ["J. Maehle", 50], ["X. Shaqiri", 23], ["R. Freuler", 34], ["Y. Sommer", 21], ["F. Schär", 44], ["R. Vargas", 11], ["C. Fassnacht", 16], ["E. Forsberg", 38], ["S. Larsson", 25], ["M. Berg", 24], ["R. Quaison", 22], ["M. Lustig", 20], ["Sigthorsson", 77], ["Gunnarsson", 17], ["G. Sigurdsson", 18], ["B. Bjarnason", 29]];
    let ball;
    // transfer value
    let ballDestination;
    let playerAtBall = false;
    let startClicked = false;
    soccer_simulation.settingsOpen = false;
    function init(_event) {
        canvas = document.querySelector("canvas");
        soccer_simulation.crc2 = canvas.getContext("2d");
        canvas.addEventListener("click", handleClick);
        canvasSize();
        scaleObjects();
        drawSoccerfield();
        drawGoals();
        drawPlayersBench();
        soccer_simulation.settingsDiv = document.getElementById("settings");
        // settingsButton = <HTMLDivElement>document.getElementById("settingsButton");
        soccer_simulation.possessionDiv = document.getElementById("possession");
        soccer_simulation.selectedDiv = document.getElementById("selected");
        scoreSpan = document.getElementById("sbScore");
        soccer_simulation.showSettingsDiv();
        // let startBtn2: HTMLButtonElement = <HTMLButtonElement>document.getElementById("startBtn");
        // startBtn2.addEventListener("click", generateSimulation);
        soccer_simulation.settingsDiv.addEventListener("change", soccer_simulation.displaySettings);
        soccer_simulation.settingsDiv.addEventListener("input", soccer_simulation.displaySettings);
        soccer_simulation.settingsDiv.addEventListener("change", soccer_simulation.displaySettingsCanvas);
        backgroundimage = soccer_simulation.crc2.getImageData(0, 0, soccer_simulation.crc2.canvas.width, soccer_simulation.crc2.canvas.height);
        window.setInterval(update, 20);
    }
    function update() {
        if (!startClicked) {
            return;
        }
        soccer_simulation.crc2.putImageData(backgroundimage, 0, 0);
        for (let character of allCharacters) {
            character.draw();
        }
        moveCharacter();
        ball.draw();
        moveBall();
        checkGoal();
        checkOutfield();
    }
    function generateSimulation() {
        startClicked = true;
        soccer_simulation.settingsOpen = false;
        if (soccer_simulation.getInputData() == false) {
            console.log("break");
            return;
        }
        soccer_simulation.changeSettingsDiv();
        generateCharacter();
        generateBall();
        playerAtBall = false;
        scoreHome = 0;
        scoreGuest = 0;
        scoreSpan.innerHTML = "0:0";
    }
    soccer_simulation.generateSimulation = generateSimulation;
    function handleClick(_event) {
        let rect = canvas.getBoundingClientRect();
        let clickedPosition = new soccer_simulation.Vector(_event.clientX - rect.left, _event.clientY - rect.top);
        let clickedPlayer;
        for (let player of allCharacters) {
            if (player instanceof soccer_simulation.Player) {
                let difference = soccer_simulation.Vector.getDifference(clickedPosition, player.position);
                if (difference.length < 12) {
                    // console.log(player);
                    clickedPlayer = player;
                    updateSelectedDisplay(player);
                }
            }
            if (clickedPlayer == undefined && playerAtBall) {
                ballDestination = clickedPosition.copy();
            }
        }
    }
    function moveCharacter() {
        for (let player of allCharacters) {
            if (player instanceof soccer_simulation.Player) {
                let difference = soccer_simulation.Vector.getDifference(ball.position, player.position); // Abstand der Spieler zum Ball herausfinden
                if (difference.length < 1) { // überprüfen ob einer am Ball ist
                    playerAtBall = true; // ja, Variable updaten
                    updatePossessionDisplay(player); // und Ballbesitz-Display updaten
                }
                if (!playerAtBall) { // wenn, keiner am Ball ist (Variable = false)
                    player.move(ball.position); // sollen alle Spieler, bei welchen der Ball im Reaktions-Radius ist, loslaufen
                }
                else { // ansonsten (Variable = true)
                    if (difference.length > 1) { // sollen alle Spieler die nicht im Ballbesitz sind
                        player.moveToDefault(); // zurück zur Startposition laufen
                    }
                }
            }
            if (player instanceof soccer_simulation.Referee) {
                player.move(ball.position);
            }
        }
    }
    function moveBall() {
        if (ballDestination != null) { // überprüfe ob der Wert der Variable nicht Null ist
            let differenceShot = soccer_simulation.Vector.getDifference(ballDestination, ball.position); // ja, Abstand von Zielort & Position des Balles herausfinden
            if (differenceShot.length < 1) { // wenn, Ball am Zielort
                ballDestination = null; // dann Zielort-Variable auf Null setzen
                playerAtBall = false; // und Ballbesitz-Variable auf false
            }
            else { // ansonsten
                ball.move(ballDestination); // Ball bewegen
            }
        }
    }
    function checkGoal() {
        if (ball.position.x <= homeGoalTop.x && ball.position.y >= homeGoalTop.y && ball.position.y <= homeGoalBottom.y) {
            scoreGuest++;
            scoreSpan.innerHTML = scoreHome + ":" + scoreGuest;
            ball.position = ball.defaultPosition.copy();
            ballDestination = null;
            playerAtBall = false;
        }
        if (ball.position.x >= guestGoalTop.x && ball.position.y >= guestGoalTop.y && ball.position.y <= guestGoalBottom.y) {
            scoreHome++;
            scoreSpan.innerHTML = scoreHome + ":" + scoreGuest;
            ball.position = ball.defaultPosition.copy();
            ballDestination = null;
            playerAtBall = false;
        }
    }
    function checkOutfield() {
        if (ball.position.x <= soccerfieldLeftTop.x || ball.position.y <= soccerfieldLeftTop.y || ball.position.x >= soccerfieldRightBottom.x || ball.position.y >= soccerfieldRightBottom.y) {
            ball.position = ball.defaultPosition.copy();
            ballDestination = null;
            playerAtBall = false;
        }
    }
    function updatePossessionDisplay(_player) {
        if (!soccer_simulation.settingsOpen) {
            drawPossessionDisplay();
        }
        let posName = document.getElementById("posPlayer");
        let posColor = document.getElementById("posShirt");
        let posFont = document.getElementById("posFont");
        let posSpeed = document.getElementById("posSpeed");
        let posPrecision = document.getElementById("posPrecision");
        posName.innerHTML = _player.name;
        posColor.style.color = _player.color;
        posFont.innerHTML = _player.number.toString();
        posSpeed.innerHTML = " " + (_player.speed * 10);
        posPrecision.innerHTML = " " + _player.precision;
        if (_player.color == soccer_simulation.homeColorShirt) {
            posFont.style.color = soccer_simulation.homeColorFont;
        }
        else if (_player.color == soccer_simulation.guestColorShirt) {
            posFont.style.color = soccer_simulation.guestColorFont;
        }
    }
    function drawPossessionDisplay() {
        soccer_simulation.possessionDiv.style.display = "block";
        soccer_simulation.possessionDiv.style.border = "2px solid black";
    }
    function updateSelectedDisplay(_player) {
        if (!soccer_simulation.settingsOpen) {
            drawSelectedDisplay();
        }
        let slcName = document.getElementById("slcPlayer");
        let slcPrecision = document.getElementById("slcPrecision2");
        let slcSpeed = document.getElementById("slcSpeed2");
        let slcColor = document.getElementById("slcShirt");
        let slcFont = document.getElementById("slcFont");
        slcName.innerHTML = _player.name;
        slcPrecision.innerHTML = " " + _player.precision;
        slcSpeed.innerHTML = " " + (_player.speed * 10) + " km/h";
        slcColor.style.color = _player.color;
        slcFont.innerHTML = _player.number.toString();
        if (_player.color == soccer_simulation.homeColorShirt) {
            slcFont.style.color = soccer_simulation.homeColorFont;
        }
        else if (_player.color == soccer_simulation.guestColorShirt) {
            slcFont.style.color = soccer_simulation.guestColorFont;
        }
    }
    function drawSelectedDisplay() {
        soccer_simulation.selectedDiv.style.display = "block";
        soccer_simulation.selectedDiv.style.border = "2px solid black";
    }
    function generateCharacter() {
        allCharacters = [];
        for (let index = 0; index < 19; index++) {
            let name = homePlayer[index][0];
            let number = homePlayer[index][1];
            let position = new soccer_simulation.Vector(allPositionsHome[index].x * soccer_simulation.sizeFactor, allPositionsHome[index].y * soccer_simulation.sizeFactor);
            let player = new soccer_simulation.Player(name, number, position, soccer_simulation.homeColorShirt, "player");
            allCharacters.push(player);
        }
        for (let index = 0; index < 19; index++) {
            let name = guestPlayer[index][0];
            let number = guestPlayer[index][1];
            let position = new soccer_simulation.Vector(allPositionsGuest[index].x * soccer_simulation.sizeFactor, allPositionsGuest[index].y * soccer_simulation.sizeFactor);
            let player = new soccer_simulation.Player(name, number, position, soccer_simulation.guestColorShirt, "player");
            allCharacters.push(player);
        }
        let lineRefereeTop = new soccer_simulation.Referee(new soccer_simulation.Vector(middelpoint.x, 2.5 * soccer_simulation.sizeFactor), "refereeLine");
        let lineRefereeBottom = new soccer_simulation.Referee(new soccer_simulation.Vector(middelpoint.x, 138 * soccer_simulation.sizeFactor), "refereeLine");
        let mainReferee = new soccer_simulation.Referee(middelpoint, "refereeMain");
        allCharacters.push(lineRefereeTop, lineRefereeBottom, mainReferee);
        console.log(allCharacters);
    }
    function generateBall() {
        ball = new soccer_simulation.Ball(middelpoint);
    }
    function canvasSize() {
        let fieldsetWidth = document.getElementById("left");
        let canvasWidth = (fieldsetWidth.offsetWidth) - 240;
        soccer_simulation.sizeFactor = canvasWidth / 220;
        let canvasHeight = Math.round(150 * soccer_simulation.sizeFactor);
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        // border
        // crc2.strokeRect(0, 0, canvasWidth, canvasHeight);
    }
    function scaleObjects() {
        homeGoalTop.scale(soccer_simulation.sizeFactor);
        homeGoalBottom.scale(soccer_simulation.sizeFactor);
        guestGoalTop.scale(soccer_simulation.sizeFactor);
        guestGoalBottom.scale(soccer_simulation.sizeFactor);
        soccerfieldLeftTop.scale(soccer_simulation.sizeFactor);
        soccerfieldRightBottom.scale(soccer_simulation.sizeFactor);
        middelpoint.scale(soccer_simulation.sizeFactor);
    }
    function drawSoccerfield() {
        soccer_simulation.crc2.save();
        soccer_simulation.crc2.fillStyle = "#65ba52";
        soccer_simulation.crc2.strokeStyle = "#ffffff";
        soccer_simulation.crc2.scale(soccer_simulation.sizeFactor, soccer_simulation.sizeFactor);
        soccer_simulation.crc2.fillRect(4, 4, 212, 132);
        soccer_simulation.crc2.strokeRect(5, 5, 210, 130);
        soccer_simulation.crc2.beginPath();
        // middleline
        soccer_simulation.crc2.moveTo(110, 5);
        soccer_simulation.crc2.lineTo(110, 70);
        soccer_simulation.crc2.arc(110, 70, 18, 1.5 * Math.PI, 3.5 * Math.PI);
        soccer_simulation.crc2.arc(110, 70, 1, 1.5 * Math.PI, 3.5 * Math.PI);
        soccer_simulation.crc2.lineTo(110, 140);
        // home-goal
        soccer_simulation.crc2.moveTo(5, 29.5);
        soccer_simulation.crc2.lineTo(38, 29.5);
        soccer_simulation.crc2.lineTo(38, 70);
        soccer_simulation.crc2.arc(27, 70, 18, 1.71 * Math.PI, 2.29 * Math.PI);
        soccer_simulation.crc2.moveTo(27, 70);
        soccer_simulation.crc2.arc(27, 70, 1, 1.5 * Math.PI, 3.5 * Math.PI);
        soccer_simulation.crc2.arc(27, 70, 0.5, 1.5 * Math.PI, 3.5 * Math.PI);
        soccer_simulation.crc2.moveTo(38, 70);
        soccer_simulation.crc2.lineTo(38, 110.5);
        soccer_simulation.crc2.lineTo(5, 110.5);
        soccer_simulation.crc2.moveTo(5, 51.5);
        soccer_simulation.crc2.lineTo(16, 51.5);
        soccer_simulation.crc2.lineTo(16, 88.5);
        soccer_simulation.crc2.lineTo(5, 88.5);
        // guest-goal
        soccer_simulation.crc2.moveTo(215, 29.5);
        soccer_simulation.crc2.lineTo(182, 29.5);
        soccer_simulation.crc2.lineTo(182, 70);
        soccer_simulation.crc2.arc(193, 70, 18, 0.71 * Math.PI, 1.29 * Math.PI);
        soccer_simulation.crc2.moveTo(193, 70);
        soccer_simulation.crc2.arc(193, 70, 1, 1.5 * Math.PI, 3.5 * Math.PI);
        soccer_simulation.crc2.arc(193, 70, 0.5, 1.5 * Math.PI, 3.5 * Math.PI);
        soccer_simulation.crc2.moveTo(182, 70);
        soccer_simulation.crc2.lineTo(182, 110.5);
        soccer_simulation.crc2.lineTo(215, 110.5);
        soccer_simulation.crc2.moveTo(215, 51.5);
        soccer_simulation.crc2.lineTo(204, 51.5);
        soccer_simulation.crc2.lineTo(204, 88.5);
        soccer_simulation.crc2.lineTo(215, 88.5);
        soccer_simulation.crc2.moveTo(215, 51.5);
        soccer_simulation.crc2.closePath();
        soccer_simulation.crc2.strokeStyle = "#ffffff";
        soccer_simulation.crc2.stroke();
        soccer_simulation.crc2.restore();
    }
    function drawGoals() {
        soccer_simulation.crc2.save();
        soccer_simulation.crc2.fillStyle = "#c4c4c4";
        soccer_simulation.crc2.strokeStyle = "#858585";
        soccer_simulation.crc2.scale(soccer_simulation.sizeFactor, soccer_simulation.sizeFactor);
        // home-goal
        soccer_simulation.crc2.fillRect(0.5, 62.5, 4.5, 15);
        soccer_simulation.crc2.strokeRect(0.5, 62.5, 4.5, 15);
        // guest-goal
        soccer_simulation.crc2.fillRect(215, 62.5, 4.5, 15);
        soccer_simulation.crc2.strokeRect(215, 62.5, 4.5, 15);
        soccer_simulation.crc2.strokeStyle = "#ffffff";
        soccer_simulation.crc2.strokeRect(5, 5, 210, 130);
        soccer_simulation.crc2.restore();
    }
    function drawPlayersBench() {
        soccer_simulation.crc2.save();
        soccer_simulation.crc2.scale(soccer_simulation.sizeFactor, soccer_simulation.sizeFactor);
        soccer_simulation.crc2.strokeStyle = "#08444d";
        soccer_simulation.crc2.strokeStyle = soccer_simulation.homeColorFont;
        soccer_simulation.crc2.strokeRect(30, 143, 50, 5);
        soccer_simulation.crc2.strokeStyle = "#ff6666";
        soccer_simulation.crc2.strokeStyle = soccer_simulation.guestColorFont;
        soccer_simulation.crc2.strokeRect(140, 143, 50, 5);
        soccer_simulation.crc2.restore();
    }
    soccer_simulation.drawPlayersBench = drawPlayersBench;
})(soccer_simulation || (soccer_simulation = {}));
//# sourceMappingURL=main.js.map