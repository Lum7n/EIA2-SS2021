"use strict";
var Blumenwiese_L09;
(function (Blumenwiese_L09) {
    window.addEventListener("load", init);
    let canvas;
    let golden = 0.62;
    let reversGolden = 1 - golden;
    let backgroundImage;
    let cloudsArray = [];
    function init(_event) {
        canvas = document.querySelector("canvas");
        Blumenwiese_L09.crc2 = canvas.getContext("2d");
        canvasSize();
        Blumenwiese_L09.canvasWidth = Blumenwiese_L09.crc2.canvas.width;
        Blumenwiese_L09.canvasHeight = Blumenwiese_L09.crc2.canvas.height;
        // border
        Blumenwiese_L09.crc2.strokeRect(0, 0, Blumenwiese_L09.canvasWidth, Blumenwiese_L09.canvasHeight);
        drawSteady();
        console.log(backgroundImage);
        drawClouds();
        //animate
        window.setInterval(animate, 20);
    }
    function canvasSize() {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        canvas.width = windowWidth - 50;
        canvas.height = windowHeight - 100;
        Blumenwiese_L09.crc2.strokeRect(0, 0, Blumenwiese_L09.canvasWidth, Blumenwiese_L09.canvasHeight);
    }
    function drawSteady() {
        drawBackground();
        drawSun(new Blumenwiese_L09.Vector(golden, 0.25));
        drawMountains(new Blumenwiese_L09.Vector(0, Blumenwiese_L09.canvasHeight * reversGolden), 0.55, 0.70, "#7f91b3", "#4f4f69", "#9e9eb8");
        drawMountains(new Blumenwiese_L09.Vector(0, Blumenwiese_L09.canvasHeight * reversGolden), 0.5, 0.65, "#67688a", "#3b3e4d", "#9a8fa6");
        drawTrees();
        drawFlowers();
        //safe the steady background things
        backgroundImage = Blumenwiese_L09.crc2.getImageData(0, 0, Blumenwiese_L09.crc2.canvas.width, Blumenwiese_L09.crc2.canvas.height);
    }
    function drawBackground() {
        console.log("Background");
        let gradient = Blumenwiese_L09.crc2.createLinearGradient(0, 0, 0, Blumenwiese_L09.crc2.canvas.height);
        gradient.addColorStop(0, "#8fb7db");
        gradient.addColorStop(0.18, "#f5ddda");
        gradient.addColorStop(0.28, "#fcd087");
        gradient.addColorStop(0.38, "#fcd087");
        gradient.addColorStop(0.38, "#2f522d");
        gradient.addColorStop(0.6, "#518f32");
        gradient.addColorStop(1, "#518f32");
        Blumenwiese_L09.crc2.fillStyle = gradient;
        Blumenwiese_L09.crc2.fillRect(0, 0, Blumenwiese_L09.crc2.canvas.width, Blumenwiese_L09.crc2.canvas.height);
    }
    function drawSun(_position) {
        console.log("Sun", _position);
        let r1 = 30;
        let r2 = 150;
        let x = _position.x * Blumenwiese_L09.canvasWidth;
        let y = _position.y * Blumenwiese_L09.canvasHeight;
        let gradient = Blumenwiese_L09.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "#fffcdd");
        gradient.addColorStop(0.3, "#ffd72b66");
        gradient.addColorStop(0.7, "#fe9d0026");
        gradient.addColorStop(1, "#fe9d0000");
        Blumenwiese_L09.crc2.save();
        Blumenwiese_L09.crc2.translate(x, y);
        Blumenwiese_L09.crc2.fillStyle = gradient;
        Blumenwiese_L09.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        Blumenwiese_L09.crc2.fill();
        Blumenwiese_L09.crc2.restore();
    }
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh, _colorTop) {
        console.log("Mountains", _position, _min, _max);
        let stepMin = 50;
        let stepMax = 130;
        let x = 0;
        let minHeight = (_min - 0.5) * Blumenwiese_L09.canvasHeight;
        let maxHeight = (_max - 0.5) * Blumenwiese_L09.canvasHeight;
        Blumenwiese_L09.crc2.save();
        Blumenwiese_L09.crc2.translate(_position.x, _position.y);
        Blumenwiese_L09.crc2.beginPath();
        Blumenwiese_L09.crc2.moveTo(0, 0);
        Blumenwiese_L09.crc2.lineTo(0, -maxHeight * 0.7);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -minHeight - Math.random() * (maxHeight - minHeight);
            Blumenwiese_L09.crc2.lineTo(x, y);
        } while (x < Blumenwiese_L09.crc2.canvas.width);
        Blumenwiese_L09.crc2.lineTo(x, 0);
        Blumenwiese_L09.crc2.closePath();
        let gradient = Blumenwiese_L09.crc2.createLinearGradient(0, 0, 0, -maxHeight);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        gradient.addColorStop(0.8, _colorHigh);
        gradient.addColorStop(1, _colorTop);
        Blumenwiese_L09.crc2.fillStyle = gradient;
        Blumenwiese_L09.crc2.fill();
        Blumenwiese_L09.crc2.restore();
    }
    function drawClouds() {
        let smallSizeFactor = new Blumenwiese_L09.Vector(0.17, 0.02);
        let bigSizeFactor = new Blumenwiese_L09.Vector(0.27, 0.03);
        let nParticles = 75;
        let cloudAmount = Math.floor(Blumenwiese_L09.canvasWidth / 90);
        let horizon = (1 - 0.8) * Blumenwiese_L09.canvasHeight;
        let skyPart = horizon / 5;
        while (cloudAmount != 0) {
            // console.log("cloudAmount = " + cloudAmount);
            let positionX = 130 * (Math.random() * (cloudAmount + 5));
            let positionY = 2 * skyPart + (Math.random() * (skyPart * 3));
            let size = new Blumenwiese_L09.Vector(0, 0);
            if (cloudAmount >= 4) {
                size.y = smallSizeFactor.y * Blumenwiese_L09.canvasHeight;
                size.x = smallSizeFactor.x * Blumenwiese_L09.canvasWidth;
                nParticles = Math.floor(size.x / 3);
                // console.log("nParticles = " + nParticles);
            }
            else {
                size.y = bigSizeFactor.y * Blumenwiese_L09.canvasHeight;
                size.x = bigSizeFactor.x * Blumenwiese_L09.canvasWidth;
                if (size.x <= 150) {
                    nParticles = 40;
                }
                else {
                    nParticles = Math.floor(size.x / 5);
                }
                // console.log("nParticles = " + nParticles);
            }
            let cloud = new Blumenwiese_L09.Cloud(new Blumenwiese_L09.Vector(positionX, positionY), size, nParticles);
            cloud.draw();
            cloudsArray.push(cloud);
            cloudAmount--;
        }
    }
    function drawTrees() {
        let amount = 10;
        let positionY = 0.7;
        let scaleFactor = 0.5;
        for (let index = 0; index < amount; index++) {
            if (index <= 5) {
                positionY = (reversGolden + 0.04);
                scaleFactor = 0.5;
            }
            else if (index <= 8) {
                positionY = (reversGolden + 0.06);
                scaleFactor = 0.6;
            }
            else {
                positionY = (reversGolden + 0.08);
                scaleFactor = 0.7;
            }
            let treeBroadleaf = new Blumenwiese_L09.Broadleaf(new Blumenwiese_L09.Vector(100, positionY * Blumenwiese_L09.canvasHeight), scaleFactor);
            treeBroadleaf.draw();
            let treeConifer = new Blumenwiese_L09.Conifer(new Blumenwiese_L09.Vector(100, positionY * Blumenwiese_L09.canvasHeight), scaleFactor);
            treeConifer.draw();
        }
    }
    function drawFlowers() {
        let amount = 13;
        let positionY = (golden - 0.04) * Blumenwiese_L09.canvasHeight;
        let scaleFactor = 0.4;
        for (let index = 0; index < amount; index++) {
            switch (index) {
                case 0:
                case 1:
                    positionY = (golden - 0.04) * Blumenwiese_L09.canvasHeight;
                    scaleFactor = 0.4;
                    break;
                case 2:
                case 3:
                    positionY = (golden - 0.01) * Blumenwiese_L09.canvasHeight;
                    scaleFactor = 0.5;
                    break;
                case 4:
                case 5:
                    positionY = (golden + 0.04) * Blumenwiese_L09.canvasHeight;
                    scaleFactor = 0.4;
                    break;
                case 6:
                case 7:
                    positionY = (golden + 0.1) * Blumenwiese_L09.canvasHeight;
                    scaleFactor = 0.5;
                    break;
                case 8:
                case 9:
                    positionY = (golden + 0.2) * Blumenwiese_L09.canvasHeight;
                    scaleFactor = 0.7;
                    break;
                case 10:
                case 11:
                    positionY = (golden + 0.22) * Blumenwiese_L09.canvasHeight;
                    scaleFactor = 0.6;
                    break;
                case 12:
                case 13:
                    positionY = (golden + 0.35) * Blumenwiese_L09.canvasHeight;
                    scaleFactor = 0.7;
                    break;
                default:
                    console.log("too much");
                    break;
            }
            let flowerPurple = new Blumenwiese_L09.Flower(new Blumenwiese_L09.Vector(200, positionY), scaleFactor, "p");
            flowerPurple.draw();
            let flowerRosa = new Blumenwiese_L09.Flower(new Blumenwiese_L09.Vector(200, positionY), scaleFactor, "r");
            flowerRosa.draw();
            let flowerBlue = new Blumenwiese_L09.Flower(new Blumenwiese_L09.Vector(200, positionY), scaleFactor, "b");
            flowerBlue.draw();
            let flowerYellow = new Blumenwiese_L09.Flower(new Blumenwiese_L09.Vector(200, positionY), scaleFactor, "y");
            flowerYellow.draw();
        }
    }
    function animate() {
        //drawSteady();
        Blumenwiese_L09.crc2.putImageData(backgroundImage, 0, 0);
        //move clouds
        for (let index = 0; index < cloudsArray.length; index++) {
            cloudsArray[index].move(1 / 800);
            cloudsArray[index].draw();
        }
    }
})(Blumenwiese_L09 || (Blumenwiese_L09 = {}));
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
//# sourceMappingURL=script.js.map