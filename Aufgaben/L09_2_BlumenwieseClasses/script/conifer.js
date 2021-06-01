"use strict";
var Blumenwiese_L09;
(function (Blumenwiese_L09) {
    class Conifer {
        constructor(_position, _scaleFactor) {
            this.position = _position;
            this.scaleFactor = _scaleFactor;
            // this.draw();
        }
        draw() {
            let size = new Blumenwiese_L09.Vector(180, 220);
            let randomX = Math.random() * Blumenwiese_L09.canvasWidth;
            let gradientConifer = Blumenwiese_L09.crc2.createLinearGradient(0, 0, 0, -size.y);
            gradientConifer.addColorStop(0, "#382411"); //dark brown
            gradientConifer.addColorStop(1 / 11, "#382411"); //dark brown
            gradientConifer.addColorStop(1 / 11, "#0c5918"); //lighter needle-green
            gradientConifer.addColorStop(1 / 3.7, "#0b3611"); //darker needle-green
            gradientConifer.addColorStop(1 / 3.7, "#0c5918"); //lighter needle-green
            gradientConifer.addColorStop(1 / 2.2, "#0b3611"); //darker needle-green
            gradientConifer.addColorStop(1 / 2.2, "#0c5918"); //lighter needle-green
            gradientConifer.addColorStop(1 / 1.6, "#0b3611"); //darker needle-green
            gradientConifer.addColorStop(1 / 1.6, "#0c5918"); //lighter needle-green
            gradientConifer.addColorStop(1, "#0b3611"); //darker needle-green
            let conifer = new Path2D();
            conifer.moveTo(0, 0);
            conifer.lineTo(-(size.x / 18), 0);
            conifer.lineTo(-(size.x / 18), -(size.y / 11));
            conifer.lineTo(-(size.x / 2), -(size.y / 11));
            conifer.lineTo(-(size.x / 3.6), -(size.y / 3.7));
            conifer.lineTo(-(size.x / 2.4), -(size.y / 3.7));
            conifer.lineTo(-(size.x / 6), -(size.y / 2.2));
            conifer.lineTo(-(size.x / 3), -(size.y / 2.2));
            conifer.lineTo(-(size.x / 6), -(size.y / 1.6));
            conifer.lineTo(-(size.x / 3.6), -(size.y / 1.6));
            conifer.lineTo(0, -size.y);
            conifer.lineTo((size.x / 3.6), -(size.y / 1.6));
            conifer.lineTo((size.x / 6), -(size.y / 1.6));
            conifer.lineTo((size.x / 3), -(size.y / 2.2));
            conifer.lineTo((size.x / 6), -(size.y / 2.2));
            conifer.lineTo((size.x / 2.4), -(size.y / 3.7));
            conifer.lineTo((size.x / 3.6), -(size.y / 3.7));
            conifer.lineTo((size.x / 2), -(size.y / 11));
            conifer.lineTo((size.x / 18), -(size.y / 11));
            conifer.lineTo((size.x / 18), 0);
            Blumenwiese_L09.crc2.save();
            Blumenwiese_L09.crc2.translate(randomX, this.position.y);
            Blumenwiese_L09.crc2.scale(this.scaleFactor, this.scaleFactor);
            Blumenwiese_L09.crc2.fillStyle = gradientConifer;
            Blumenwiese_L09.crc2.fill(conifer);
            Blumenwiese_L09.crc2.restore();
        }
    }
    Blumenwiese_L09.Conifer = Conifer;
})(Blumenwiese_L09 || (Blumenwiese_L09 = {}));
//# sourceMappingURL=conifer.js.map