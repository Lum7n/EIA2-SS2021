namespace soccer_simulation {

    export class Referee extends Moveable {

        public category: string;
        private size: number = 10;

        constructor(_position: Vector, _category: string) {
            super(_position, 2);
            this.category = _category;
        }

        public draw(): void {

            crc2.save();

            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
            crc2.closePath();

            let img: CanvasImageSource = <CanvasImageSource>document.getElementById("referee_muster");
            let pat: CanvasPattern = <CanvasPattern>crc2.createPattern(img, "repeat");

            crc2.fillStyle = pat;

            // crc2.fillStyle = "#000000";
            crc2.strokeStyle = "#000000";

            crc2.fill();
            crc2.stroke();

            crc2.restore();
        }

        public move(_ballPosition: Vector): void {

            if (this.category == "refereeMain") {
                let newBallPosition: Vector = _ballPosition.copy();

                if (_ballPosition.x > (110 * sizeFactor)) {
                    newBallPosition.add(new Vector(-50, 0));
                } else {
                    newBallPosition.add(new Vector(50, 0));
                }
                this.position.x = newBallPosition.x;

            } else if (this.category == "refereeLine") {
                this.position.x = _ballPosition.x;
            }
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