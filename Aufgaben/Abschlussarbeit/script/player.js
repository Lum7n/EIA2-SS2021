"use strict";
var soccer_simulation;
(function (soccer_simulation) {
    class Player extends soccer_simulation.Moveable {
        constructor(_name, _number, _position, _color, _category) {
            let speed = Math.round((Math.random() * (soccer_simulation.speedMax - soccer_simulation.speedMin + 1) + soccer_simulation.speedMin)) / 10;
            super(_position, speed);
            this.name = _name;
            this.number = _number;
            this.precision = Math.round(Math.random() * (soccer_simulation.precisionMax - soccer_simulation.precisionMin + 1) + soccer_simulation.precisionMin);
            this.color = _color;
            this.category = _category;
            this.size = 10;
            this.preceptionRadius = 150;
        }
        draw() {
            soccer_simulation.crc2.save();
            soccer_simulation.crc2.beginPath();
            soccer_simulation.crc2.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
            soccer_simulation.crc2.closePath();
            soccer_simulation.crc2.fillStyle = this.color;
            soccer_simulation.crc2.strokeStyle = "#000000";
            soccer_simulation.crc2.fill();
            soccer_simulation.crc2.stroke();
            soccer_simulation.crc2.restore();
        }
        move(_ballPosition) {
            let direction = soccer_simulation.Vector.getDifference(_ballPosition, this.position);
            if (direction.length > this.preceptionRadius) {
                return;
            }
            direction.scale(this.speed / direction.length);
            this.position.add(direction);
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
    soccer_simulation.Player = Player;
})(soccer_simulation || (soccer_simulation = {}));
//# sourceMappingURL=player.js.map