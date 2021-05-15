"use strict";
var Blumenwiese_L08;
(function (Blumenwiese_L08) {
    window.addEventListener("load", init);
    let canvas;
    let crc2;
    let golden = 0.62;
    let canvasWidth;
    let canvasHeight;
    function init(_event) {
        canvas = document.querySelector("canvas");
        crc2 = canvas.getContext("2d");
        canvasSize();
        canvasWidth = crc2.canvas.width;
        canvasHeight = crc2.canvas.height;
        // border
        crc2.strokeRect(0, 0, canvasWidth, canvasHeight);
        let posMountains = { x: 0, y: canvasHeight / 2 };
        drawBackground();
        drawSun({ x: golden, y: 1 - golden });
        // drawCloud({ x: 500, y: 125 }, { x: 250, y: 75 });
        drawMountains(posMountains, 0.55, 0.75, "grey", "white");
        drawMountains(posMountains, 0.5, 0.7, "grey", "lightgrey");
    }
    function canvasSize() {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        canvas.width = windowWidth - 50;
        canvas.height = windowHeight - 100;
        crc2.strokeRect(0, 0, canvasWidth, canvasHeight);
    }
    function drawBackground() {
        console.log("Background");
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "#8fb7db");
        gradient.addColorStop(0.25, "#f5ddda");
        gradient.addColorStop(1 - golden, "#fcd087");
        gradient.addColorStop(1, "#388a0f");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }
    function drawSun(_position) {
        console.log("Sun", _position);
        let r1 = 30;
        let r2 = 150;
        let gradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        let x = _position.x * canvasWidth;
        let y = _position.y * canvasHeight;
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
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        console.log("Mountains", _position, _min, _max);
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        let minHeight = (_min - 0.5) * canvasHeight;
        let maxHeight = (_max - 0.5) * canvasHeight;
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -maxHeight);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -minHeight - Math.random() * (maxHeight - minHeight);
            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);
        crc2.lineTo(x, 0);
        crc2.closePath();
        let gradient = crc2.createLinearGradient(0, 0, 0, -maxHeight);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        crc2.fillStyle = gradient;
        crc2.fill();
        crc2.restore();
    }
})(Blumenwiese_L08 || (Blumenwiese_L08 = {}));
//# sourceMappingURL=script.js.map