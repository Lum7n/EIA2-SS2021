"use strict";
var Blumenwiese_L11;
(function (Blumenwiese_L11) {
    class NectarProducer extends Blumenwiese_L11.Static {
        constructor(_position) {
            super(_position);
            this.nectarAmount = 0;
        }
        adjustNectar(_nectar) {
            if ((this.nectarAmount + _nectar) < 1) {
                this.nectarAmount += _nectar;
            }
            else {
                this.nectarAmount = 1;
            }
        }
    }
    Blumenwiese_L11.NectarProducer = NectarProducer;
})(Blumenwiese_L11 || (Blumenwiese_L11 = {}));
//# sourceMappingURL=NectarProducer.js.map