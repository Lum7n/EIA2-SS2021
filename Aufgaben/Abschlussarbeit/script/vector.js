"use strict";
var soccer_simulation;
(function (soccer_simulation) {
    class Vector {
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        static getDifference(_v0, _v1) {
            return new Vector(_v0.x - _v1.x, _v0.y - _v1.y);
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        get length() {
            return Math.hypot(this.x, this.y);
        }
        copy() {
            return new Vector(this.x, this.y);
        }
    }
    soccer_simulation.Vector = Vector;
})(soccer_simulation || (soccer_simulation = {}));
//# sourceMappingURL=vector.js.map