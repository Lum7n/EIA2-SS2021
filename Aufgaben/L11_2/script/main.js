"use strict";
var Blumenwiese_L11;
(function (Blumenwiese_L11) {
    window.addEventListener("load", init);
    let canvas;
    let golden = 0.62;
    let reversGolden = 1 - golden;
    let statics = [];
    // let moveables: Moveable[] = [];
    let backgroundImage;
    function init(_event) {
        canvas = document.querySelector("canvas");
        Blumenwiese_L11.crc2 = canvas.getContext("2d");
        canvasSize();
        Blumenwiese_L11.canvasWidth = Blumenwiese_L11.crc2.canvas.width;
        Blumenwiese_L11.canvasHeight = Blumenwiese_L11.crc2.canvas.height;
        // border
        Blumenwiese_L11.crc2.strokeRect(0, 0, Blumenwiese_L11.canvasWidth, Blumenwiese_L11.canvasHeight);
        drawSteady();
        console.log(backgroundImage);
        //animate
        // window.setInterval(animate, 20);
    }
    function canvasSize() {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        canvas.width = windowWidth - 50;
        canvas.height = windowHeight - 100;
        Blumenwiese_L11.crc2.strokeRect(0, 0, Blumenwiese_L11.canvasWidth, Blumenwiese_L11.canvasHeight);
    }
    function drawSteady() {
        drawBackground();
        drawSun(new Blumenwiese_L11.Vector(golden, 0.25));
        drawMountains(new Blumenwiese_L11.Vector(0, Blumenwiese_L11.canvasHeight * reversGolden), 0.55, 0.70, "#7f91b3", "#4f4f69", "#9e9eb8");
        drawMountains(new Blumenwiese_L11.Vector(0, Blumenwiese_L11.canvasHeight * reversGolden), 0.5, 0.65, "#67688a", "#3b3e4d", "#9a8fa6");
        drawFlowers(5);
        //safe the steady background things
        backgroundImage = Blumenwiese_L11.crc2.getImageData(0, 0, Blumenwiese_L11.crc2.canvas.width, Blumenwiese_L11.crc2.canvas.height);
    }
    function drawBackground() {
        console.log("Background");
        let gradient = Blumenwiese_L11.crc2.createLinearGradient(0, 0, 0, Blumenwiese_L11.crc2.canvas.height);
        gradient.addColorStop(0, "#8fb7db");
        gradient.addColorStop(0.18, "#f5ddda");
        gradient.addColorStop(0.28, "#fcd087");
        gradient.addColorStop(0.38, "#fcd087");
        gradient.addColorStop(0.38, "#2f522d");
        gradient.addColorStop(0.6, "#518f32");
        gradient.addColorStop(1, "#518f32");
        Blumenwiese_L11.crc2.fillStyle = gradient;
        Blumenwiese_L11.crc2.fillRect(0, 0, Blumenwiese_L11.crc2.canvas.width, Blumenwiese_L11.crc2.canvas.height);
    }
    function drawSun(_position) {
        console.log("Sun", _position);
        let r1 = 30;
        let r2 = 150;
        let x = _position.x * Blumenwiese_L11.canvasWidth;
        let y = _position.y * Blumenwiese_L11.canvasHeight;
        let gradient = Blumenwiese_L11.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "#fffcdd");
        gradient.addColorStop(0.3, "#ffd72b66");
        gradient.addColorStop(0.7, "#fe9d0026");
        gradient.addColorStop(1, "#fe9d0000");
        Blumenwiese_L11.crc2.save();
        Blumenwiese_L11.crc2.translate(x, y);
        Blumenwiese_L11.crc2.fillStyle = gradient;
        Blumenwiese_L11.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        Blumenwiese_L11.crc2.fill();
        Blumenwiese_L11.crc2.restore();
    }
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh, _colorTop) {
        console.log("Mountains", _position, _min, _max);
        let stepMin = 50;
        let stepMax = 130;
        let x = 0;
        let minHeight = (_min - 0.5) * Blumenwiese_L11.canvasHeight;
        let maxHeight = (_max - 0.5) * Blumenwiese_L11.canvasHeight;
        Blumenwiese_L11.crc2.save();
        Blumenwiese_L11.crc2.translate(_position.x, _position.y);
        Blumenwiese_L11.crc2.beginPath();
        Blumenwiese_L11.crc2.moveTo(0, 0);
        Blumenwiese_L11.crc2.lineTo(0, -maxHeight * 0.7);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -minHeight - Math.random() * (maxHeight - minHeight);
            Blumenwiese_L11.crc2.lineTo(x, y);
        } while (x < Blumenwiese_L11.crc2.canvas.width);
        Blumenwiese_L11.crc2.lineTo(x, 0);
        Blumenwiese_L11.crc2.closePath();
        let gradient = Blumenwiese_L11.crc2.createLinearGradient(0, 0, 0, -maxHeight);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        gradient.addColorStop(0.8, _colorHigh);
        gradient.addColorStop(1, _colorTop);
        Blumenwiese_L11.crc2.fillStyle = gradient;
        Blumenwiese_L11.crc2.fill();
        Blumenwiese_L11.crc2.restore();
    }
    function drawFlowers(_nAsteroids) {
        let positionY = (golden - 0.04) * Blumenwiese_L11.canvasHeight;
        let scaleFactor = 0.4;
        for (let i = 0; i < _nAsteroids; i++) {
            let flower = new Blumenwiese_L11.Flower(new Blumenwiese_L11.Vector(200, positionY), scaleFactor);
            flower.draw();
            statics.push(flower);
        }
    }
    // function animate(): void {
    //     //drawSteady();
    //     crc2.putImageData(backgroundImage, 0, 0);
    // }
})(Blumenwiese_L11 || (Blumenwiese_L11 = {}));
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
//# sourceMappingURL=main.js.map