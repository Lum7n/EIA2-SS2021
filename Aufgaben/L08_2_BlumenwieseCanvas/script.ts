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

        let posMountains: Vector = { x: 0, y: canvasHeight / 2 };

        drawBackground();
        drawSun({ x: golden, y: 1 - golden });
        drawClouds();
        drawMountains(posMountains, 0.55, 0.70, "#7f91b3", "#4f4f69", "#9e9eb8");
        drawMountains(posMountains, 0.5, 0.65, "#67688a", "#3b3e4d", "#9a8fa6");

    }

    function canvasSize(): void {

        let windowWidth: number = window.innerWidth;
        let windowHeight: number = window.innerHeight;

        canvas.width = windowWidth - 50;
        canvas.height = windowHeight - 100;

        crc2.strokeRect(0, 0, canvasWidth, canvasHeight);
    }

    function drawBackground(): void {
        console.log("Background");

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "#8fb7db");
        gradient.addColorStop(0.25, "#f5ddda");
        gradient.addColorStop(1 - golden, "#fcd087");
        gradient.addColorStop(1, "#388a0f");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    function drawSun(_position: Vector): void {
        console.log("Sun", _position);

        let r1: number = 30;
        let r2: number = 150;
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

        let x: number = _position.x * canvasWidth;
        let y: number = _position.y * canvasHeight;

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

    function drawClouds(): void {

        let sizeMin: Vector = { x: 0.17, y: 0.02 };
        let sizeMax: Vector = { x: 0.27, y: 0.03 };
        let nParticlesMin: number = 75;
        let nParticlesMax: number = 120;

        let cloudAmount: number = Math.floor(canvasWidth / 100);
        let horizon: number = (1 - golden) * canvasHeight;
        let skyPart: number = horizon / 5;

        // drawCloud({ x: 200, y: 125 }, sizeMax, nParticlesMax);
        // drawCloud({ x: 200, y: 125 }, sizeMin, nParticlesMin);

        while (cloudAmount != 0) {
            console.log(cloudAmount);

            let positionX: number = 100 * (Math.random() * cloudAmount + 1);
            let positionY: number = skyPart + (Math.random() * (skyPart * 3));

            if (cloudAmount >= 4) {
                drawCloud({ x: positionX, y: positionY }, sizeMax, nParticlesMax);
            } else {
                drawCloud({ x: positionX, y: positionY }, sizeMin, nParticlesMin);
            }
            cloudAmount--;

        }
    }

    function drawCloud(_position: Vector, _size: Vector, _nParticles: number): void {
        console.log("Cloud", _position, _size);

        let sizeX: number = _size.x * canvasWidth;
        let sizeY: number = _size.y * canvasHeight;

        let radius1Particle: number = 5;
        let radius2Particle: number = 15;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radius2Particle);

        particle.ellipse(0, 0, radius1Particle, radius2Particle, Math.PI / 2, 0, 2 * Math.PI);
        gradient.addColorStop(0, "#ffded980");
        gradient.addColorStop(1, "#ffffff00");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;

        for (let drawn: number = 0; drawn < _nParticles; drawn++) {
            crc2.save();
            let x: number = (Math.random() - 0.5) * sizeX;
            let y: number = - (Math.random() * sizeY);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }

    function drawMountains(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string, _colorTop: string): void {
        console.log("Mountains", _position, _min, _max);
        let stepMin: number = 50;
        let stepMax: number = 100;
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

}