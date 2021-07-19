"use strict";
var soccer_simulation;
(function (soccer_simulation) {
    class Moveable {
        constructor(_position, _speed) {
            this.defaultPosition = _position.copy();
            this.position = _position.copy();
            this.speed = _speed;
        }
    }
    soccer_simulation.Moveable = Moveable;
})(soccer_simulation || (soccer_simulation = {}));
//# sourceMappingURL=moveable.js.map