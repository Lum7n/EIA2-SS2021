namespace L10_1_OldMacDonaldsHeritage {

    export class Fox extends Animal {

        constructor() {
            super();

            this.type = "fox";
            this.food = "steaks";
            this.hunger = 3;
            this.foodAmount = 20;
            this.sound = "wow";
            this.specialAction = "tried to eat no sheep.";

        }
    }
}