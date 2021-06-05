namespace L10_1_OldMacDonaldsHeritage {

    export class Dove extends Animal {

        constructor() {
            super();

            this.type = "dove";
            this.food = "peas";
            this.hunger = 15;
            this.foodAmount = 240;
            this.sound = "gurr";
            this.specialAction = "brought peace to all the people.";

        }
    }
}