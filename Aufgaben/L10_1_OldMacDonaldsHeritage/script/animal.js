"use strict";
var L10_1_OldMacDonaldsHeritage;
(function (L10_1_OldMacDonaldsHeritage) {
    class Animal {
        sing() {
            return "Old MacDonald had a farm, E-I-E-I-O! <br>" +
                "And on his farm he had a " + this.type + ", E-I-E-I-O! <br>" +
                "With a " + this.sound + "-" + this.sound + " here and a " + this.sound + "-" + this.sound + " there, <br>" +
                "Here a " + this.sound + ", there a " + this.sound + ", <br>" +
                "Everywhere a " + this.sound + "-" + this.sound + ", <br>" +
                "Old MacDonald had a farm, E-I-E-I-O! <br>";
        }
        eat() {
            this.foodAmount -= this.hunger;
            return "The " + this.type + " ate " + this.hunger + " " + this.food + ". <br>" + "There are " + this.foodAmount + " " + this.food + " left.";
        }
        doSpecialAction() {
            return "The " + this.type + " " + this.specialAction + ".";
        }
    }
    L10_1_OldMacDonaldsHeritage.Animal = Animal;
})(L10_1_OldMacDonaldsHeritage || (L10_1_OldMacDonaldsHeritage = {}));
//# sourceMappingURL=animal.js.map