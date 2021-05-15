namespace Blumenwiese_L08 {

    interface Vector {
        x: number;
        y: number;
    }

    window.addEventListener("load", init);

    let canvas: HTMLCanvasElement;
    let crc2: CanvasRenderingContext2D;

    let golden: number = 0.62;

    let canvasWidth: number;
    let canvasHeight: number;


    function init(_event: Event): void {

        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        canvasSize();
        canvasWidth = crc2.canvas.width;
        canvasHeight = crc2.canvas.height;
        // border
        crc2.strokeRect(0, 0, canvasWidth, canvasHeight);

        // let horizon: number = crc2.canvas.height * golden;
        // let posMountains: Vector = { x: 0, y: horizon };


        // drawBackground();
        // drawSun({ x: 100, y: 75 });
        // drawCloud({ x: 500, y: 125 }, { x: 250, y: 75 });
        // drawMountains(posMountains, 75, 200, "grey", "white");
        // drawMountains(posMountains, 50, 150, "grey", "lightgrey");

    }

    function canvasSize(): void {

        let windowWidth: number = window.innerWidth;
        let windowHeight: number = window.innerHeight;

        canvas.width = windowWidth - 50;
        canvas.height = windowHeight - 100;

        crc2.strokeRect(0, 0, canvasWidth, canvasHeight);
    }

    // function drawBackground(): void {
    //     console.log("Background");

    //     let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
    //     gradient.addColorStop(0, "lightblue");
    //     gradient.addColorStop(golden, "white");
    //     gradient.addColorStop(1, "HSL(100, 80%, 30%)");

    //     crc2.fillStyle = gradient;
    //     crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    // }

    // function drawSun(_position: Vector): void {
    //     console.log("Sun", _position);

    //     let r1: number = 30;
    //     let r2: number = 150;
    //     let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

    //     gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
    //     gradient.addColorStop(1, "HSLA(60, 100%, 50%, 0)");

    //     crc2.save();
    //     crc2.translate(_position.x, _position.y);
    //     crc2.fillStyle = gradient;
    //     crc2.arc(0, 0, r2, 0, 2 * Math.PI);
    //     crc2.fill();
    //     crc2.restore();
    // }


    // function drawCloud(_position: Vector, _size: Vector): void {
    //     console.log("Cloud", _position, _size);

    //     let nParticles: number = 20;
    //     let radiusParticle: number = 50;
    //     let particle: Path2D = new Path2D();
    //     let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

    //     particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
    //     gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
    //     gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

    //     crc2.save();
    //     crc2.translate(_position.x, _position.y);
    //     crc2.fillStyle = gradient;

    //     for (let drawn: number = 0; drawn < nParticles; drawn++) {
    //         crc2.save();
    //         let x: number = (Math.random() - 0.5) * _size.x;
    //         let y: number = - (Math.random() * _size.y);
    //         crc2.translate(x, y);
    //         crc2.fill(particle);
    //         crc2.restore();
    //     }
    //     crc2.restore();
    // }

    // function drawMountains(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string): void {
    //     console.log("Mountains", _position, _min, _max);
    //     let stepMin: number = 50;
    //     let stepMax: number = 150;
    //     let x: number = 0;

    //     crc2.save();
    //     crc2.translate(_position.x, _position.y);

    //     crc2.beginPath();
    //     crc2.moveTo(0, 0);
    //     crc2.lineTo(0, -_max);

    //     do {
    //         x += stepMin + Math.random() * (stepMax - stepMin);
    //         let y: number = -_min - Math.random() * (_max - _min);

    //         crc2.lineTo(x, y);
    //     } while (x < crc2.canvas.width);

    //     crc2.lineTo(x, 0);
    //     crc2.closePath();

    //     let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -_max);
    //     gradient.addColorStop(0, _colorLow);
    //     gradient.addColorStop(0.7, _colorHigh);

    //     crc2.fillStyle = gradient;
    //     crc2.fill();

    //     crc2.restore();
    // }

}