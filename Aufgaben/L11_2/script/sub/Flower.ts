namespace Blumenwiese_L11 {
    export class Flower extends NectarProducer {
        public scaleFactor: number;
        private type: number;

        constructor(_position: Vector, _scaleFactor: number) {
            super(_position);

            this.scaleFactor = _scaleFactor;

            this.type = Math.floor(Math.random() * 4);
        }

        public draw(): void {
            let randomX: number = Math.random() * canvasWidth;

            // stem
            crc2.save();

            crc2.translate(randomX, this.position.y);
            crc2.scale(this.scaleFactor, this.scaleFactor);

            crc2.strokeStyle = "#8ddb56";
            crc2.fillStyle = "#8ddb56";

            crc2.fill(stemPath);
            crc2.stroke(stemPath);

            crc2.restore();

            //blossom
            crc2.save();

            crc2.translate(randomX, this.position.y);
            crc2.scale(this.scaleFactor, this.scaleFactor);

            crc2.fillStyle = flowerGradient[this.type];
            crc2.fill(blossomPath);

            crc2.restore();
        }
        
        public adjustNectar(_nectar: number): void {
            super.adjustNectar(_nectar);
        }
    }
}