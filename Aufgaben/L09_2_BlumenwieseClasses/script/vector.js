"use strict";
var Blumenwiese_L09;
(function (Blumenwiese_L09) {
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
    }
    Blumenwiese_L09.Vector = Vector;
})(Blumenwiese_L09 || (Blumenwiese_L09 = {}));
//# sourceMappingURL=Vector.js.map