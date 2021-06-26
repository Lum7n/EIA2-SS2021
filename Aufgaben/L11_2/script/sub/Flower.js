"use strict";
var Blumenwiese_L11;
(function (Blumenwiese_L11) {
    class Flower extends Blumenwiese_L11.NectarProducer {
        constructor(_position, _scaleFactor) {
            super(_position);
            this.scaleFactor = _scaleFactor;
            this.type = Math.floor(Math.random() * 4);
        }
        draw() {
            let randomX = Math.random() * Blumenwiese_L11.canvasWidth;
            // stem
            Blumenwiese_L11.crc2.save();
            Blumenwiese_L11.crc2.translate(randomX, this.position.y);
            Blumenwiese_L11.crc2.scale(this.scaleFactor, this.scaleFactor);
            Blumenwiese_L11.crc2.strokeStyle = "#8ddb56";
            Blumenwiese_L11.crc2.fillStyle = "#8ddb56";
            Blumenwiese_L11.crc2.fill(Blumenwiese_L11.stemPath);
            Blumenwiese_L11.crc2.stroke(Blumenwiese_L11.stemPath);
            Blumenwiese_L11.crc2.restore();
            //blossom
            Blumenwiese_L11.crc2.save();
            Blumenwiese_L11.crc2.translate(randomX, this.position.y);
            Blumenwiese_L11.crc2.scale(this.scaleFactor, this.scaleFactor);
            Blumenwiese_L11.crc2.fillStyle = Blumenwiese_L11.flowerGradient[this.type];
            Blumenwiese_L11.crc2.fill(Blumenwiese_L11.blossomPath);
            Blumenwiese_L11.crc2.restore();
        }
        adjustNectar(_nectar) {
            super.adjustNectar(_nectar);
        }
    }
    Blumenwiese_L11.Flower = Flower;
})(Blumenwiese_L11 || (Blumenwiese_L11 = {}));
//# sourceMappingURL=Flower.js.map