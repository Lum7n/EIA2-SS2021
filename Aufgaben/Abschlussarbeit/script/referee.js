"use strict";
var soccer_simulation;
(function (soccer_simulation) {
    class Referee extends soccer_simulation.Moveable {
        constructor(_position, _category) {
            super(_position, 2);
            this.size = 10;
            this.category = _category;
        }
        draw() {
            soccer_simulation.crc2.save();
            soccer_simulation.crc2.beginPath();
            soccer_simulation.crc2.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
            soccer_simulation.crc2.closePath();
            let img = document.getElementById("referee_muster");
            let pat = soccer_simulation.crc2.createPattern(img, "repeat");
            soccer_simulation.crc2.fillStyle = pat;
            // crc2.fillStyle = "#000000";
            soccer_simulation.crc2.strokeStyle = "#000000";
            soccer_simulation.crc2.fill();
            soccer_simulation.crc2.stroke();
            soccer_simulation.crc2.restore();
        }
        move(_ballPosition) {
            if (this.category == "refereeMain") {
                let newBallPosition = _ballPosition.copy();
                if (_ballPosition.x > (110 * soccer_simulation.sizeFactor)) {
                    newBallPosition.add(new soccer_simulation.Vector(-50, 0));
                }
                else {
                    newBallPosition.add(new soccer_simulation.Vector(50, 0));
                }
                this.position.x = newBallPosition.x;
            }
            else if (this.category == "refereeLine") {
                this.position.x = _ballPosition.x;
            }
        }
        moveToDefault() {
            let direction = soccer_simulation.Vector.getDifference(this.defaultPosition, this.position);
            if (direction.length < 1) {
                return;
            }
            direction.scale(this.speed / direction.length);
            this.position.add(direction);
        }
    }
    soccer_simulation.Referee = Referee;
})(soccer_simulation || (soccer_simulation = {}));
//# sourceMappingURL=referee.js.map