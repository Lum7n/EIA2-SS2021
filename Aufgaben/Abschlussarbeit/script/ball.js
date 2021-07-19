"use strict";
var soccer_simulation;
(function (soccer_simulation) {
    class Ball extends soccer_simulation.Moveable {
        constructor(_position) {
            super(_position, 2);
            this.size = 7;
        }
        draw() {
            soccer_simulation.crc2.save();
            soccer_simulation.crc2.beginPath();
            soccer_simulation.crc2.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
            soccer_simulation.crc2.closePath();
            soccer_simulation.crc2.fillStyle = "#ffffff";
            soccer_simulation.crc2.strokeStyle = "#000000";
            soccer_simulation.crc2.fill();
            soccer_simulation.crc2.stroke();
            soccer_simulation.crc2.restore();
        }
        move(_targetPosition) {
            let direction = soccer_simulation.Vector.getDifference(_targetPosition, this.position);
            direction.scale(this.speed / direction.length);
            this.position.add(direction);
        }
    }
    soccer_simulation.Ball = Ball;
})(soccer_simulation || (soccer_simulation = {}));
//# sourceMappingURL=ball.js.map