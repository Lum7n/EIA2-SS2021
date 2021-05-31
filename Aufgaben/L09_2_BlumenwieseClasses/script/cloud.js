"use strict";
var Blumenwiese_L09;
(function (Blumenwiese_L09) {
    class Cloud {
        constructor(_position, _size, _nParticles) {
            this.velocity = new Blumenwiese_L09.Vector(-5, 0);
            this.position = _position;
            this.size = _size;
            this.velocity.x = this.velocity.x * _size.x;
            this.nParticles = _nParticles;
            this.draw();
        }
        draw() {
            let particle = new Path2D();
            let gradient = Blumenwiese_L09.crc2.createRadialGradient(0, 0, 0, 0, 0, 25);
            particle.ellipse(0, 0, 10, 25, Math.PI / 2, 0, 2 * Math.PI);
            gradient.addColorStop(0, "#ffe2de40"); //black
            gradient.addColorStop(1, "#fff5f500"); //green
            Blumenwiese_L09.crc2.save();
            Blumenwiese_L09.crc2.translate(this.position.x, this.position.y);
            Blumenwiese_L09.crc2.fillStyle = gradient;
            for (let drawn = 0; drawn < this.nParticles; drawn++) {
                Blumenwiese_L09.crc2.save();
                let x = (Math.random() - 0.5) * this.size.x;
                let y = -(Math.random() * this.size.y);
                Blumenwiese_L09.crc2.translate(x, y);
                Blumenwiese_L09.crc2.fill(particle);
                Blumenwiese_L09.crc2.restore();
            }
            Blumenwiese_L09.crc2.restore();
        }
        move(_timeslice) {
            let offset = new Blumenwiese_L09.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < -450)
                this.position.x += Blumenwiese_L09.crc2.canvas.width + 450;
            if (this.position.x > Blumenwiese_L09.crc2.canvas.width)
                this.position.x -= Blumenwiese_L09.crc2.canvas.width;
        }
    }
    Blumenwiese_L09.Cloud = Cloud;
})(Blumenwiese_L09 || (Blumenwiese_L09 = {}));
//# sourceMappingURL=cloud.js.map