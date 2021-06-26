namespace Blumenwiese_L11 {

    window.addEventListener("load", init);

    let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;

    let golden: number = 0.62;
    let reversGolden: number = 1 - golden;

    export let canvasWidth: number;
    export let canvasHeight: number;

    let statics: Static[] = [];
    // let moveables: Moveable[] = [];

    let backgroundImage: ImageData;

    function init(_event: Event): void {

        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        canvasSize();
        canvasWidth = crc2.canvas.width;
        canvasHeight = crc2.canvas.height;
        // border
        crc2.strokeRect(0, 0, canvasWidth, canvasHeight);

        drawSteady();
        console.log(backgroundImage);

        //animate
        // window.setInterval(animate, 20);
    }

    function canvasSize(): void {

        let windowWidth: number = window.innerWidth;
        let windowHeight: number = window.innerHeight;

        canvas.width = windowWidth - 50;
        canvas.height = windowHeight - 100;

        crc2.strokeRect(0, 0, canvasWidth, canvasHeight);
    }

    function drawSteady(): void {

        drawBackground();
        drawSun(new Vector(golden, 0.25));
        drawMountains(new Vector(0, canvasHeight * reversGolden), 0.55, 0.70, "#7f91b3", "#4f4f69", "#9e9eb8");
        drawMountains(new Vector(0, canvasHeight * reversGolden), 0.5, 0.65, "#67688a", "#3b3e4d", "#9a8fa6");

        drawFlowers(5);
        //safe the steady background things
        backgroundImage = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    function drawBackground(): void {
        console.log("Background");

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "#8fb7db");
        gradient.addColorStop(0.18, "#f5ddda");
        gradient.addColorStop(0.28, "#fcd087");
        gradient.addColorStop(0.38, "#fcd087");
        gradient.addColorStop(0.38, "#2f522d");
        gradient.addColorStop(0.6, "#518f32");
        gradient.addColorStop(1, "#518f32");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    function drawSun(_position: Vector): void {
        console.log("Sun", _position);

        let r1: number = 30;
        let r2: number = 150;

        let x: number = _position.x * canvasWidth;
        let y: number = _position.y * canvasHeight;

        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

        gradient.addColorStop(0, "#fffcdd");
        gradient.addColorStop(0.3, "#ffd72b66");
        gradient.addColorStop(0.7, "#fe9d0026");
        gradient.addColorStop(1, "#fe9d0000");

        crc2.save();
        crc2.translate(x, y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }

    function drawMountains(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string, _colorTop: string): void {
        console.log("Mountains", _position, _min, _max);
        let stepMin: number = 50;
        let stepMax: number = 130;
        let x: number = 0;
        let minHeight: number = (_min - 0.5) * canvasHeight;
        let maxHeight: number = (_max - 0.5) * canvasHeight;

        crc2.save();
        crc2.translate(_position.x, _position.y);

        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -maxHeight * 0.7);

        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y: number = -minHeight - Math.random() * (maxHeight - minHeight);

            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);

        crc2.lineTo(x, 0);
        crc2.closePath();

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -maxHeight);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        gradient.addColorStop(0.8, _colorHigh);
        gradient.addColorStop(1, _colorTop);

        crc2.fillStyle = gradient;
        crc2.fill();

        crc2.restore();
    }

    function drawFlowers(_nAsteroids: number): void {

        let positionY: number = (golden - 0.04) * canvasHeight;
        let scaleFactor: number = 0.4;

        for (let i: number = 0; i < _nAsteroids; i++) {
            let flower: Flower = new Flower(new Vector(200, positionY), scaleFactor);
            flower.draw();
            statics.push(flower);
        }
    }
    // function animate(): void {

    //     //drawSteady();
    //     crc2.putImageData(backgroundImage, 0, 0);

    // }


}

        // crc2.save();
        // crc2.beginPath();

        // crc2.strokeStyle = "black";
        // crc2.fillStyle = gradient;

        // crc2.moveTo(0   , 0);
        // crc2.lineTo(-10 , 0);
        // ...
        // crc2.lineTo(10 , 0);

        // crc2.closePath();

        // crc2.fill();
        // crc2.stroke();

        // crc2.restore();