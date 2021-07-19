namespace soccer_simulation {

    export class Ball extends Moveable {
        
        private size: number = 7;

        constructor(_position: Vector) {
            super(_position, 2);
        }

        public draw(): void {

            crc2.save();

            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
            crc2.closePath();

            crc2.fillStyle = "#ffffff";
            crc2.strokeStyle = "#000000";

            crc2.fill();
            crc2.stroke();

            crc2.restore();
        }

        public move(_targetPosition: Vector): void {
            
            let direction: Vector = Vector.getDifference(_targetPosition, this.position);
            direction.scale(this.speed / direction.length);
            this.position.add(direction);
        }
    }

}