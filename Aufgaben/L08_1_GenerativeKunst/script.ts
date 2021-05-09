namespace GenerativeKunst {

    window.addEventListener("load", init);

    let canvas: HTMLCanvasElement;
    let crc2: CanvasRenderingContext2D;

    let canvasWidth: number;
    let canvasHeight: number;


    function init(_event: Event): void {

        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        canvasSize();

        backgroundPattern();

        canvasWidth = crc2.canvas.width;
        canvasHeight = crc2.canvas.height;

        // border
        // crc2.strokeRect(0, 0, canvasWidth, canvasHeight);

        generateRects();

        // generateTris();
    }

    function canvasSize(): void {

        let windowWidth: number = window.innerWidth;
        let windowHeight: number = window.innerHeight;

        canvas.width = windowWidth - 500;
        canvas.height = windowHeight - 250;

        crc2.strokeRect(0, 0, canvasWidth, canvasHeight);
    }

    function backgroundPattern(): void {

        // create canvas for one unit
        let patternCanvas: HTMLCanvasElement = document.createElement("canvas");
        let patternContext: CanvasRenderingContext2D = <CanvasRenderingContext2D>patternCanvas.getContext("2d");
        patternCanvas.width = 50;
        patternCanvas.height = 50;

        // create pattern on the unit
        let z: number = getRandomNumber(40);
        patternContext.fillStyle = "#fec";
        patternContext.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
        patternContext.lineTo(0, 0);
        patternContext.lineTo(z, 25);
        patternContext.lineTo(0, 50);
        patternContext.stroke();

        // fill canvas with pattern
        let pattern: CanvasPattern = <CanvasPattern>crc2.createPattern(patternCanvas, "repeat");
        crc2.fillStyle = pattern;
        crc2.fillRect(0, 0, canvas.width, canvas.height);
    }

    function generateRects(): void {

        for (let index: number = 0; index < 8; index++) {

            generateTris();

            let width: number = getRandomNumber(canvasWidth) / 2;
            let height: number = getRandomNumber(canvasHeight) / 2;

            let x: number = getRandomNumber(canvasWidth - (width * 0.8)) - 5;
            let y: number = getRandomNumber(canvasHeight - (height * 0.8)) - 5;

            let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, 100);
            let color: string = getRandomColor();
            gradient.addColorStop(0, color + "ea");
            gradient.addColorStop(0.8, color + "99");
            crc2.fillStyle = gradient;

            crc2.fillRect(x, y, width, height);
        }
    }

    function generateTris(): void {

        let path: Path2D = new Path2D();
        path.lineTo(0, 0);
        path.lineTo(8, 10);
        path.lineTo(-8, 10);
        path.lineTo(0, 0);

        for (let index: number = 0; index < 10; index++) {

            crc2.save();

            let x: number = getRandomNumber(canvasWidth);
            let y: number = getRandomNumber(canvasHeight);

            crc2.translate(x, y);

            crc2.fill(path);
            crc2.stroke(path);

            crc2.restore();


        }
    }

    function getRandomNumber(_max: number): number {
        let i: number;
        i = Math.floor(Math.random() * _max);
        return i;
    }

    function getRandomColor(): string {
        var letters: string = "0123456789ABCDEF";
        var color: string = "#";
        for (var i: number = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}