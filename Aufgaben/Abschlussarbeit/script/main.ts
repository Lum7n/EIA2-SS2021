namespace soccer_simulation {

    window.addEventListener("load", init);

    // canvas
    let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;
    let backgroundimage: ImageData;
    export let sizeFactor: number;

    // displays
    export let settingsDiv: HTMLDivElement;
    // export let settingsButton: HTMLDivElement;
    export let possessionDiv: HTMLDivElement;
    export let selectedDiv: HTMLDivElement;
    let scoreSpan: HTMLSpanElement;
    let scoreHome: number = 0;
    let scoreGuest: number = 0;

    // input of form
    export let form: HTMLFormElement;
    export let homeColorShirt: string;
    export let homeColorFont: string;
    export let guestColorShirt: string;
    export let guestColorFont: string;
    export let speedMax: number;
    export let speedMin: number;
    export let precisionMax: number;
    export let precisionMin: number;

    // position of canvas-objectes
    let homeGoalTop: Vector = new Vector(5, 62.5);
    let homeGoalBottom: Vector = new Vector(5, 77.5);
    let guestGoalTop: Vector = new Vector(215, 62.5);
    let guestGoalBottom: Vector = new Vector(215, 77.5);
    let soccerfieldLeftTop: Vector = new Vector(5, 5);
    let soccerfieldRightBottom: Vector = new Vector(215, 145);
    let middelpoint: Vector = new Vector(110, 70);

    // moveables
    let allCharacters: Moveable[] = [];
    let allPositionsHome: Vector[] = [new Vector(22.5, 70), new Vector(42.5, 32.5), new Vector(42.5, 107.5), new Vector(67.5, 70), new Vector(87.5, 122.5), new Vector(92.5, 22.5), new Vector(122.5, 47.5), new Vector(122.5, 87.5), new Vector(167.5, 70), new Vector(182.5, 17.5), new Vector(182.5, 122.5), new Vector(32.5, 145.5), new Vector(37.5, 145.5), new Vector(42.5, 145.5), new Vector(47.5, 145.5), new Vector(52.5, 145.5), new Vector(57.5, 145.5), new Vector(62.5, 145.5), new Vector(67.5, 145.5), new Vector(72.5, 145.5)];
    let allPositionsGuest: Vector[] = [new Vector(37.5, 17.5), new Vector(37.5, 122.5), new Vector(52.5, 70), new Vector(97.5, 52.5), new Vector(97.5, 92.5), new Vector(127.5, 117.5), new Vector(132.5, 17.5), new Vector(152.5, 70), new Vector(177.5, 32.5), new Vector(177.5, 107.5), new Vector(197.5, 70), new Vector(142.5, 145.5), new Vector(147.5, 145.5), new Vector(152.5, 145.5), new Vector(157.5, 145.5), new Vector(162.5, 145.5), new Vector(167.5, 145.5), new Vector(172.5, 145.5), new Vector(177.5, 145.5), new Vector(182.5, 145.5)];
    let homePlayer: (string | number)[][] = [["M. Neuer", 10], ["M. Ginter", 27], ["R. Gosens", 20], ["M. Hummels", 50], ["A. Rüdiger", 16], ["N. Süle", 15], ["S. Gnabry", 22], ["L. Goretzka", 18], ["I. Gündogan", 21], ["K. Havertz", 29], ["J. Kimmich", 32], ["T. Kroos", 38], ["T. Müller", 25], ["J. Musiala", 14], ["F. Neuhaus", 17], ["L. Sané", 19], ["K. Volland", 31], ["T. Werner", 11], ["J. Draxler", 23], ["B. Leno", 12]];
    let guestPlayer: (string | number)[][] = [["K. Mpappe", 10], ["A. Griezmann", 15], ["M. Rashford", 19], ["M. Damsgaard", 14], ["J. Maehle", 50], ["X. Shaqiri", 23], ["R. Freuler", 34], ["Y. Sommer", 21], ["F. Schär", 44], ["R. Vargas", 11], ["C. Fassnacht", 16], ["E. Forsberg", 38], ["S. Larsson", 25], ["M. Berg", 24], ["R. Quaison", 22], ["M. Lustig", 20], ["Sigthorsson", 77], ["Gunnarsson", 17], ["G. Sigurdsson", 18], ["B. Bjarnason", 29]];
    let ball: Ball;

    // transfer value
    let ballDestination: Vector | null;
    let playerAtBall: boolean = false;
    let startClicked: boolean = false;
    export let settingsOpen: boolean = false;

    function init(_event: Event): void {

        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        canvas.addEventListener("click", handleClick);

        canvasSize();

        scaleObjects();

        drawSoccerfield();
        drawGoals();
        drawPlayersBench();

        settingsDiv = <HTMLDivElement>document.getElementById("settings");
        // settingsButton = <HTMLDivElement>document.getElementById("settingsButton");
        possessionDiv = <HTMLDivElement>document.getElementById("possession");
        selectedDiv = <HTMLDivElement>document.getElementById("selected");
        scoreSpan = <HTMLSpanElement>document.getElementById("sbScore");

        showSettingsDiv();

        // let startBtn2: HTMLButtonElement = <HTMLButtonElement>document.getElementById("startBtn");
        // startBtn2.addEventListener("click", generateSimulation);

        settingsDiv.addEventListener("change", displaySettings);
        settingsDiv.addEventListener("input", displaySettings);

        settingsDiv.addEventListener("change", displaySettingsCanvas);

        backgroundimage = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);
        window.setInterval(update, 20);
    }

    function update(): void {

        if (!startClicked) {
            return;
        }

        crc2.putImageData(backgroundimage, 0, 0);

        for (let character of allCharacters) {
            character.draw();
        }

        moveCharacter();

        ball.draw();

        moveBall();

        checkGoal();
        checkOutfield();
    }

    export function generateSimulation(): void {

        startClicked = true;
        settingsOpen = false;

        if (getInputData() == false) {
            console.log("break");
            return;
        }

        changeSettingsDiv();

        generateCharacter();
        generateBall();

        playerAtBall = false;
        scoreHome = 0;
        scoreGuest = 0;
        scoreSpan.innerHTML = "0:0";
    }

    function handleClick(_event: MouseEvent): void {
        let rect: DOMRect = canvas.getBoundingClientRect();
        let clickedPosition: Vector = new Vector(_event.clientX - rect.left, _event.clientY - rect.top);
        let clickedPlayer: Player | undefined;


        for (let player of allCharacters) {
            if (player instanceof Player) {
                let difference: Vector = Vector.getDifference(clickedPosition, player.position);
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

    function moveCharacter(): void {

        for (let player of allCharacters) {
            if (player instanceof Player) {
                let difference: Vector = Vector.getDifference(ball.position, player.position);  // Abstand der Spieler zum Ball herausfinden
                if (difference.length < 1) {                                                        // überprüfen ob einer am Ball ist
                    playerAtBall = true;                                                            // ja, Variable updaten
                    updatePossessionDisplay(player);                                            // und Ballbesitz-Display updaten
                }
                if (!playerAtBall) {                                                                // wenn, keiner am Ball ist (Variable = false)
                    player.move(ball.position);                                                 // sollen alle Spieler, bei welchen der Ball im Reaktions-Radius ist, loslaufen
                } else {                                                                            // ansonsten (Variable = true)
                    if (difference.length > 1) {                                                    // sollen alle Spieler die nicht im Ballbesitz sind
                        player.moveToDefault();                                                     // zurück zur Startposition laufen
                    }
                }
            }
            if (player instanceof Referee) {
                player.move(ball.position);
            }
        }
    }

    function moveBall(): void {

        if (ballDestination != null) {                                                          // überprüfe ob der Wert der Variable nicht Null ist
            let differenceShot: Vector = Vector.getDifference(ballDestination, ball.position);  // ja, Abstand von Zielort & Position des Balles herausfinden
            if (differenceShot.length < 1) {                                                    // wenn, Ball am Zielort
                ballDestination = null;                                                         // dann Zielort-Variable auf Null setzen
                playerAtBall = false;                                                           // und Ballbesitz-Variable auf false
            } else {                                                                            // ansonsten
                ball.move(ballDestination);                                                     // Ball bewegen
            }
        }
    }

    function checkGoal(): void {
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

    function checkOutfield(): void {
        if (ball.position.x <= soccerfieldLeftTop.x || ball.position.y <= soccerfieldLeftTop.y || ball.position.x >= soccerfieldRightBottom.x || ball.position.y >= soccerfieldRightBottom.y) {
            ball.position = ball.defaultPosition.copy();
            ballDestination = null;
            playerAtBall = false;
        }
    }

    function updatePossessionDisplay(_player: Player): void {

        if (!settingsOpen) {
            drawPossessionDisplay();
        }

        let posName: HTMLSpanElement = <HTMLSpanElement>document.getElementById("posPlayer");
        let posColor: HTMLDivElement = <HTMLDivElement>document.getElementById("posShirt");
        let posFont: HTMLSpanElement = <HTMLSpanElement>document.getElementById("posFont");
        let posSpeed: HTMLSpanElement = <HTMLSpanElement>document.getElementById("posSpeed");
        let posPrecision: HTMLSpanElement = <HTMLSpanElement>document.getElementById("posPrecision");

        posName.innerHTML = _player.name;
        posColor.style.color = _player.color;
        posFont.innerHTML = _player.number.toString();
        posSpeed.innerHTML = " " + (_player.speed * 10);
        posPrecision.innerHTML = " " + _player.precision;

        if (_player.color == homeColorShirt) {
            posFont.style.color = homeColorFont;
        } else if (_player.color == guestColorShirt) {
            posFont.style.color = guestColorFont;
        }
    }

    function drawPossessionDisplay(): void {
        possessionDiv.style.display = "block";
        possessionDiv.style.border = "2px solid black";
    }

    function updateSelectedDisplay(_player: Player): void {

        if (!settingsOpen) {
            drawSelectedDisplay();
        }

        let slcName: HTMLSpanElement = <HTMLSpanElement>document.getElementById("slcPlayer");
        let slcPrecision: HTMLSpanElement = <HTMLSpanElement>document.getElementById("slcPrecision2");
        let slcSpeed: HTMLSpanElement = <HTMLSpanElement>document.getElementById("slcSpeed2");
        let slcColor: HTMLDivElement = <HTMLDivElement>document.getElementById("slcShirt");
        let slcFont: HTMLSpanElement = <HTMLSpanElement>document.getElementById("slcFont");

        slcName.innerHTML = _player.name;
        slcPrecision.innerHTML = " " + _player.precision;
        slcSpeed.innerHTML = " " + (_player.speed * 10) + " km/h";
        slcColor.style.color = _player.color;
        slcFont.innerHTML = _player.number.toString();

        if (_player.color == homeColorShirt) {
            slcFont.style.color = homeColorFont;
        } else if (_player.color == guestColorShirt) {
            slcFont.style.color = guestColorFont;
        }
    }

    function drawSelectedDisplay(): void {
        selectedDiv.style.display = "block";
        selectedDiv.style.border = "2px solid black";
    }

    function generateCharacter(): void {
        allCharacters = [];

        for (let index: number = 0; index < 19; index++) {
            let name: string = <string>homePlayer[index][0];
            let number: number = <number>homePlayer[index][1];
            let position: Vector = new Vector(allPositionsHome[index].x * sizeFactor, allPositionsHome[index].y * sizeFactor);
            let player: Player = new Player(name, number, position, homeColorShirt, "player");
            allCharacters.push(player);
        }
        for (let index: number = 0; index < 19; index++) {
            let name: string = <string>guestPlayer[index][0];
            let number: number = <number>guestPlayer[index][1];
            let position: Vector = new Vector(allPositionsGuest[index].x * sizeFactor, allPositionsGuest[index].y * sizeFactor);
            let player: Player = new Player(name, number, position, guestColorShirt, "player");
            allCharacters.push(player);
        }

        let lineRefereeTop: Referee = new Referee(new Vector(middelpoint.x, 2.5 * sizeFactor), "refereeLine");
        let lineRefereeBottom: Referee = new Referee(new Vector(middelpoint.x, 138 * sizeFactor), "refereeLine");
        let mainReferee: Referee = new Referee(middelpoint, "refereeMain");

        allCharacters.push(lineRefereeTop, lineRefereeBottom, mainReferee);

        console.log(allCharacters);

    }

    function generateBall(): void {

        ball = new Ball(middelpoint);

    }

    function canvasSize(): void {

        let fieldsetWidth: HTMLFieldSetElement = <HTMLFieldSetElement>document.getElementById("left");
        let canvasWidth: number = (fieldsetWidth.offsetWidth) - 240;

        sizeFactor = canvasWidth / 220;
        let canvasHeight: number = Math.round(150 * sizeFactor);

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // border
        // crc2.strokeRect(0, 0, canvasWidth, canvasHeight);
    }

    function scaleObjects(): void {
        homeGoalTop.scale(sizeFactor);
        homeGoalBottom.scale(sizeFactor);
        guestGoalTop.scale(sizeFactor);
        guestGoalBottom.scale(sizeFactor);
        soccerfieldLeftTop.scale(sizeFactor);
        soccerfieldRightBottom.scale(sizeFactor);
        middelpoint.scale(sizeFactor);
    }

    function drawSoccerfield(): void {

        crc2.save();

        crc2.fillStyle = "#65ba52";
        crc2.strokeStyle = "#ffffff";

        crc2.scale(sizeFactor, sizeFactor);
        crc2.fillRect(4, 4, 212, 132);
        crc2.strokeRect(5, 5, 210, 130);

        crc2.beginPath();
        // middleline
        crc2.moveTo(110, 5);
        crc2.lineTo(110, 70);
        crc2.arc(110, 70, 18, 1.5 * Math.PI, 3.5 * Math.PI);
        crc2.arc(110, 70, 1, 1.5 * Math.PI, 3.5 * Math.PI);
        crc2.lineTo(110, 140);
        // home-goal
        crc2.moveTo(5, 29.5);
        crc2.lineTo(38, 29.5);
        crc2.lineTo(38, 70);
        crc2.arc(27, 70, 18, 1.71 * Math.PI, 2.29 * Math.PI);
        crc2.moveTo(27, 70);
        crc2.arc(27, 70, 1, 1.5 * Math.PI, 3.5 * Math.PI);
        crc2.arc(27, 70, 0.5, 1.5 * Math.PI, 3.5 * Math.PI);
        crc2.moveTo(38, 70);
        crc2.lineTo(38, 110.5);
        crc2.lineTo(5, 110.5);
        crc2.moveTo(5, 51.5);
        crc2.lineTo(16, 51.5);
        crc2.lineTo(16, 88.5);
        crc2.lineTo(5, 88.5);

        // guest-goal
        crc2.moveTo(215, 29.5);
        crc2.lineTo(182, 29.5);
        crc2.lineTo(182, 70);
        crc2.arc(193, 70, 18, 0.71 * Math.PI, 1.29 * Math.PI);
        crc2.moveTo(193, 70);
        crc2.arc(193, 70, 1, 1.5 * Math.PI, 3.5 * Math.PI);
        crc2.arc(193, 70, 0.5, 1.5 * Math.PI, 3.5 * Math.PI);
        crc2.moveTo(182, 70);
        crc2.lineTo(182, 110.5);
        crc2.lineTo(215, 110.5);
        crc2.moveTo(215, 51.5);
        crc2.lineTo(204, 51.5);
        crc2.lineTo(204, 88.5);
        crc2.lineTo(215, 88.5);
        crc2.moveTo(215, 51.5);
        crc2.closePath();

        crc2.strokeStyle = "#ffffff";
        crc2.stroke();

        crc2.restore();
    }

    function drawGoals(): void {

        crc2.save();

        crc2.fillStyle = "#c4c4c4";
        crc2.strokeStyle = "#858585";

        crc2.scale(sizeFactor, sizeFactor);

        // home-goal
        crc2.fillRect(0.5, 62.5, 4.5, 15);
        crc2.strokeRect(0.5, 62.5, 4.5, 15);

        // guest-goal
        crc2.fillRect(215, 62.5, 4.5, 15);
        crc2.strokeRect(215, 62.5, 4.5, 15);

        crc2.strokeStyle = "#ffffff";
        crc2.strokeRect(5, 5, 210, 130);

        crc2.restore();
    }

    export function drawPlayersBench(): void {

        crc2.save();

        crc2.scale(sizeFactor, sizeFactor);

        crc2.strokeStyle = "#08444d";
        crc2.strokeStyle = homeColorFont;
        crc2.strokeRect(30, 143, 50, 5);

        crc2.strokeStyle = "#ff6666";
        crc2.strokeStyle = guestColorFont;
        crc2.strokeRect(140, 143, 50, 5);

        crc2.restore();
    }
}