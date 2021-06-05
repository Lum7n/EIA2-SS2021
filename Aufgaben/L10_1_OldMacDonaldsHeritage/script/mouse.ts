namespace L10_1_OldMacDonaldsHeritage {

    export class Mouse extends Animal {

        constructor() {
            super();

            this.type = "mouse";
            this.food = "grains";
            this.hunger = 18;
            this.foodAmount = 360;
            this.sound = "eek";
            this.specialAction = "dug many holes into cheese.";

        }
    }
}