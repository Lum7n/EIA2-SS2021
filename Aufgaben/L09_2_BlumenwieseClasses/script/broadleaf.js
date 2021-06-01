"use strict";
var Blumenwiese_L09;
(function (Blumenwiese_L09) {
    class Broadleaf {
        constructor(_position, _scaleFactor) {
            this.position = _position;
            this.scaleFactor = _scaleFactor;
            // this.draw();
        }
        draw() {
            let size = new Blumenwiese_L09.Vector(180, 220);
            let randomX = Math.random() * Blumenwiese_L09.canvasWidth;
            let gradientBroadleaf = Blumenwiese_L09.crc2.createLinearGradient(0, 0, 0, -size.y);
            gradientBroadleaf.addColorStop(0, "#ad7f53"); //brown
            gradientBroadleaf.addColorStop(1 / 6.2, "#ad7f53"); //brown
            gradientBroadleaf.addColorStop(1 / 6.1, "#528c29"); //green
            gradientBroadleaf.addColorStop(1, "#528c29"); //green
            let broadleaf = new Path2D();
            broadleaf.moveTo(0, 0);
            broadleaf.lineTo(-10, 0);
            broadleaf.lineTo(-10, -40);
            broadleaf.arc(-30, -60, 25, 0.2 * Math.PI, 0.9 * Math.PI);
            broadleaf.arc(-50, -82, 30, 0.5 * Math.PI, 1.4 * Math.PI);
            broadleaf.arc(-55, -132, 23, 0.5 * Math.PI, 1.5 * Math.PI);
            broadleaf.arc(-22, -167, 40, 0.9 * Math.PI, 1.4 * Math.PI);
            broadleaf.arc(-10, -215, 25, 0.8 * Math.PI, 2 * Math.PI);
            broadleaf.arc(20, -190, 25, 1.4 * Math.PI, 2.1 * Math.PI);
            broadleaf.arc(45, -162, 20, 1.4 * Math.PI, 2.4 * Math.PI);
            broadleaf.arc(40, -107, 40, 1.6 * Math.PI, 2.43 * Math.PI);
            broadleaf.arc(25, -60, 25, 1.85 * Math.PI, 2.7 * Math.PI);
            broadleaf.lineTo(10, -40);
            broadleaf.lineTo(10, 0);
            Blumenwiese_L09.crc2.save();
            Blumenwiese_L09.crc2.translate(randomX, this.position.y);
            Blumenwiese_L09.crc2.scale(this.scaleFactor, this.scaleFactor);
            Blumenwiese_L09.crc2.fillStyle = gradientBroadleaf;
            Blumenwiese_L09.crc2.fill(broadleaf);
            Blumenwiese_L09.crc2.restore();
        }
    }
    Blumenwiese_L09.Broadleaf = Broadleaf;
})(Blumenwiese_L09 || (Blumenwiese_L09 = {}));
//# sourceMappingURL=broadleaf.js.map