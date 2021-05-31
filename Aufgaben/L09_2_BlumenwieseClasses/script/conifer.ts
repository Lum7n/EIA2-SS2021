namespace Blumenwiese_L09 { 

    export class Conifer {
        position: Vector;
        scaleFactor: number;
        velocity: Vector = new Vector(-5, 0);

        constructor(_position: Vector, _scaleFactor: number) {

            this.position = _position;
            this.scaleFactor = _scaleFactor;
            this.velocity.x = this.velocity.x * _scaleFactor;

            this.draw();
        }

        draw(): void {

            let size: Vector = new Vector(180, 220);
            let randomX: number = Math.random() * canvasWidth;

            let gradientConifer: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -size.y);

            gradientConifer.addColorStop(0, "#382411");             //dark brown
            gradientConifer.addColorStop(1 / 11, "#382411");        //dark brown
            gradientConifer.addColorStop(1 / 11, "#0c5918");        //lighter needle-green
            gradientConifer.addColorStop(1 / 3.7, "#0b3611");       //darker needle-green
            gradientConifer.addColorStop(1 / 3.7, "#0c5918");       //lighter needle-green
            gradientConifer.addColorStop(1 / 2.2, "#0b3611");       //darker needle-green
            gradientConifer.addColorStop(1 / 2.2, "#0c5918");       //lighter needle-green
            gradientConifer.addColorStop(1 / 1.6, "#0b3611");       //darker needle-green
            gradientConifer.addColorStop(1 / 1.6, "#0c5918");       //lighter needle-green
            gradientConifer.addColorStop(1, "#0b3611");             //darker needle-green

            crc2.save();

            crc2.translate(randomX, this.position.y);
            crc2.scale(this.scaleFactor, this.scaleFactor);

            crc2.moveTo(0, 0);
            crc2.lineTo(-(size.x / 18), 0);
            crc2.lineTo(-(size.x / 18), -(size.y / 11));
            crc2.lineTo(-(size.x / 2), -(size.y / 11));
            crc2.lineTo(-(size.x / 3.6), -(size.y / 3.7));
            crc2.lineTo(-(size.x / 2.4), -(size.y / 3.7));
            crc2.lineTo(-(size.x / 6), -(size.y / 2.2));
            crc2.lineTo(-(size.x / 3), -(size.y / 2.2));
            crc2.lineTo(-(size.x / 6), -(size.y / 1.6));
            crc2.lineTo(-(size.x / 3.6), -(size.y / 1.6));
            crc2.lineTo(0, -size.y);
            crc2.lineTo((size.x / 3.6), -(size.y / 1.6));
            crc2.lineTo((size.x / 6), -(size.y / 1.6));
            crc2.lineTo((size.x / 3), -(size.y / 2.2));
            crc2.lineTo((size.x / 6), -(size.y / 2.2));
            crc2.lineTo((size.x / 2.4), -(size.y / 3.7));
            crc2.lineTo((size.x / 3.6), -(size.y / 3.7));
            crc2.lineTo((size.x / 2), -(size.y / 11));
            crc2.lineTo((size.x / 18), -(size.y / 11));
            crc2.lineTo((size.x / 18), 0);

            crc2.fillStyle = gradientConifer;
            crc2.fill();

            crc2.restore();
        }

        move(_timeslice: number): void {
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);

            if (this.position.x < -450)
                this.position.x += crc2.canvas.width + 450;
            if (this.position.x > crc2.canvas.width)
                this.position.x -= crc2.canvas.width;

        }

    }
}