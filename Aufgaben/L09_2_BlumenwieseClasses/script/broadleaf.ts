namespace Blumenwiese_L09 { 

    export class Broadleaf {
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

            let gradientBroadleaf: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -size.y);

            gradientBroadleaf.addColorStop(0, "#ad7f53");           //brown
            gradientBroadleaf.addColorStop(1 / 6.2, "#ad7f53");     //brown
            gradientBroadleaf.addColorStop(1 / 6.1, "#528c29");     //green
            gradientBroadleaf.addColorStop(1, "#528c29");           //green

            let broadleaf: Path2D = new Path2D();

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

            crc2.save();

            crc2.translate(randomX, this.position.y);
            crc2.scale(this.scaleFactor, this.scaleFactor);

            crc2.fillStyle = gradientBroadleaf;
            crc2.fill(broadleaf);

            crc2.restore();
        }
    }
}