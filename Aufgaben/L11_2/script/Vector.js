"use strict";
var Blumenwiese_L11;
(function (Blumenwiese_L11) {
    class Vector {
        constructor(_x, _y) {
            this.set(_x, _y);
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
        clone() {
            return new Vector(this.x, this.y);
        }
    }
    Blumenwiese_L11.Vector = Vector;
})(Blumenwiese_L11 || (Blumenwiese_L11 = {}));
//# sourceMappingURL=vector.js.map