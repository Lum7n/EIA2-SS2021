namespace Blumenwiese_L09 {

    export class Flower {
        position: Vector;
        scaleFactor: number;
        color: string;

        constructor(_position: Vector, _scaleFactor: number, _color: string) {

            this.position = _position;
            this.scaleFactor = _scaleFactor;
            this.color = _color;

            // this.draw();
        }

        draw(): void {

            let gradientFlower: CanvasGradient = crc2.createRadialGradient(0, -118, 8, 0, -118, 50);

            gradientFlower.addColorStop(0, "#e8c456");
            gradientFlower.addColorStop(0.1, "#e8c456");

            if (this.color == "p") {
                gradientFlower.addColorStop(0.11, "#d45791");
                gradientFlower.addColorStop(0.3, "#d457b9");
                gradientFlower.addColorStop(1, "#d498cd");

            } else if (this.color == "r") {
                gradientFlower.addColorStop(0.11, "#d4576a");
                gradientFlower.addColorStop(0.3, "#d45783");
                gradientFlower.addColorStop(1, "#d498b4");
                
            } else if (this.color == "b") {
                gradientFlower.addColorStop(0.11, "#6e57d4");
                gradientFlower.addColorStop(0.3, "#576ed4");
                gradientFlower.addColorStop(1, "#98b7d4");
                
            } else if (this.color == "y") {
                gradientFlower.addColorStop(0.11, "#d49357");
                gradientFlower.addColorStop(0.4, "#d4bf57");
                gradientFlower.addColorStop(1, "#ced498");
            }

            let stem: Path2D = new Path2D();

            stem.moveTo(0, 0);
            stem.lineTo(-5, -100);
            stem.lineTo(-1, -50);
            stem.ellipse(15, -50, 9, 18, Math.PI / 2.5, 1.3, 2.8 * Math.PI);
            stem.lineTo(0, 0);

            let blossom: Path2D = new Path2D();

            blossom.moveTo(0, -110);
            blossom.ellipse(-17, -92, 12, 25, 3.9, 2, 2.8 * Math.PI);
            blossom.ellipse(-30, -110, 12, 25, 4.6, 2, 2.8 * Math.PI);
            blossom.ellipse(-25, -135, 12, 25, 5.4, 2, 2.8 * Math.PI);
            blossom.ellipse(-2, -147, 12, 25, 6.2, 2, 2.8 * Math.PI);
            blossom.ellipse(22, -140, 12, 25, 7, 2, 2.8 * Math.PI);
            blossom.ellipse(30, -120, 12, 25, 7.7, 2, 2.8 * Math.PI);
            blossom.ellipse(25, -100, 12, 25, 8.3, 2, 2.8 * Math.PI);
            blossom.ellipse(5, -90, 12, 25, 9.2, 2, 2.8 * Math.PI);


            let randomX: number = Math.random() * canvasWidth;

            //stem
            crc2.save();

            crc2.translate(randomX, this.position.y);
            crc2.scale(this.scaleFactor, this.scaleFactor);

            crc2.strokeStyle = "#8ddb56";
            crc2.fillStyle = "#8ddb56";

            crc2.fill(stem);
            crc2.stroke(stem);

            crc2.restore();

            //blossom
            crc2.save();

            crc2.translate(randomX, this.position.y);
            crc2.scale(this.scaleFactor, this.scaleFactor);

            crc2.fillStyle = gradientFlower;
            crc2.fill(blossom);

            crc2.restore();
        }
    }
}