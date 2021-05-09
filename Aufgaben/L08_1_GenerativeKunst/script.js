"use strict";
var GenerativeKunst;
(function (GenerativeKunst) {
    window.addEventListener("load", init);
    let canvas;
    let crc2;
    let canvasWidth;
    let canvasHeight;
    function init(_event) {
        canvas = document.querySelector("canvas");
        crc2 = canvas.getContext("2d");
        canvasSize();
        backgroundPattern();
        canvasWidth = crc2.canvas.width;
        canvasHeight = crc2.canvas.height;
        // border
        // crc2.strokeRect(0, 0, canvasWidth, canvasHeight);
        generateRects();
        // generateTris();
    }
    function canvasSize() {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        canvas.width = windowWidth - 500;
        canvas.height = windowHeight - 250;
        crc2.strokeRect(0, 0, canvasWidth, canvasHeight);
    }
    function backgroundPattern() {
        // create canvas for one unit
        let patternCanvas = document.createElement("canvas");
        let patternContext = patternCanvas.getContext("2d");
        patternCanvas.width = 50;
        patternCanvas.height = 50;
        // create pattern on the unit
        let z = getRandomNumber(40);
        patternContext.fillStyle = "#fec";
        patternContext.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
        patternContext.lineTo(0, 0);
        patternContext.lineTo(z, 25);
        patternContext.lineTo(0, 50);
        patternContext.stroke();
        // fill canvas with pattern
        let pattern = crc2.createPattern(patternCanvas, "repeat");
        crc2.fillStyle = pattern;
        crc2.fillRect(0, 0, canvas.width, canvas.height);
    }
    function generateRects() {
        for (let index = 0; index < 8; index++) {
            generateTris();
            let width = getRandomNumber(canvasWidth) / 2;
            let height = getRandomNumber(canvasHeight) / 2;
            let x = getRandomNumber(canvasWidth - (width * 0.8)) - 5;
            let y = getRandomNumber(canvasHeight - (height * 0.8)) - 5;
            let gradient = crc2.createRadialGradient(0, 0, 0, 0, 0, 100);
            let color = getRandomColor();
            gradient.addColorStop(0, color + "ea");
            gradient.addColorStop(0.8, color + "99");
            crc2.fillStyle = gradient;
            crc2.fillRect(x, y, width, height);
        }
    }
    function generateTris() {
        let path = new Path2D();
        path.lineTo(0, 0);
        path.lineTo(8, 10);
        path.lineTo(-8, 10);
        path.lineTo(0, 0);
        for (let index = 0; index < 10; index++) {
            crc2.save();
            let x = getRandomNumber(canvasWidth);
            let y = getRandomNumber(canvasHeight);
            crc2.translate(x, y);
            crc2.fill(path);
            crc2.stroke(path);
            crc2.restore();
        }
    }
    function getRandomNumber(_max) {
        let i;
        i = Math.floor(Math.random() * _max);
        return i;
    }
    function getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
})(GenerativeKunst || (GenerativeKunst = {}));
//# sourceMappingURL=script.js.map