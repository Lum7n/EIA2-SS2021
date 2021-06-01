namespace Blumenwiese_L09 { 

    export class Conifer {
        position: Vector;
        scaleFactor: number;

        constructor(_position: Vector, _scaleFactor: number) {

            this.position = _position;
            this.scaleFactor = _scaleFactor;

            // this.draw();
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

            let conifer: Path2D = new Path2D();

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

            crc2.save();

            crc2.translate(randomX, this.position.y);
            crc2.scale(this.scaleFactor, this.scaleFactor);

            crc2.fillStyle = gradientConifer;
            crc2.fill(conifer);

            crc2.restore();
        }

    }
}