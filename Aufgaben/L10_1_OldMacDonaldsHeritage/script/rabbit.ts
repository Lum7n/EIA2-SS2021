namespace L10_1_OldMacDonaldsHeritage {

    export class Rabbit extends Animal {

        constructor() {
            super();

            this.type = "rabbit";
            this.food = "carrots";
            this.hunger = 4;
            this.foodAmount = 34;
            this.sound = "squeak";
            this.specialAction = "jumped over many fields of clover.";

        }
    }
}