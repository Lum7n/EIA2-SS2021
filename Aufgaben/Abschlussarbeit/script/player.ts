namespace soccer_simulation {

    export class Player extends Moveable {

        public name: string;
        public number: number;
        public precision: number;
        public color: string;
        public category: string;
        private size: number;
        private preceptionRadius: number;
        
        constructor(_name: string, _number: number, _position: Vector, _color: string, _category: string) {
            let speed: number = Math.round((Math.random() * (speedMax - speedMin + 1) + speedMin)) / 10;
            super(_position, speed);
            this.name = _name;
            this.number = _number;
            this.precision = Math.round(Math.random() * (precisionMax - precisionMin + 1) + precisionMin);
            this.color = _color;
            this.category = _category;
            this.size = 10;
            this.preceptionRadius = 150;
        }

        public draw(): void {

            crc2.save();

            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
            crc2.closePath();

            crc2.fillStyle = this.color;
            crc2.strokeStyle = "#000000";

            crc2.fill();
            crc2.stroke();

            crc2.restore();
        }

        public move(_ballPosition: Vector): void {
            
            let direction: Vector = Vector.getDifference(_ballPosition, this.position);
            if (direction.length > this.preceptionRadius) {
                return;
            }
            direction.scale(this.speed / direction.length);
            this.position.add(direction);
        }

        public moveToDefault(): void {

            let direction: Vector = Vector.getDifference(this.defaultPosition, this.position);
            if (direction.length < 1) {
                return;
            }
            direction.scale(this.speed / direction.length);
            this.position.add(direction);
        }
    }

}