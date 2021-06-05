namespace L10_1_OldMacDonaldsHeritage {

    export class Sheep extends Animal {

        constructor() {
            super();

            this.type = "sheep";
            this.food = "grass blades";
            this.hunger = 26;
            this.foodAmount = 310;
            this.sound = "mää";
            this.specialAction = "coloured itself yellow.";

        }
    }
}