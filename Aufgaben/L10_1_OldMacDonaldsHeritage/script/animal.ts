namespace L10_1_OldMacDonaldsHeritage {

    export class Animal {

        type: string;
        food: string;
        foodAmount: number;
        hunger: number;
        sound: string;
        specialAction: string;
        
        sing(): string {

            return "Old MacDonald had a farm, E-I-E-I-O! <br>" +
                "And on his farm he had a " + this.type + ", E-I-E-I-O! <br>" +
                "With a " + this.sound + "-" + this.sound + " here and a " + this.sound + "-" + this.sound + " there, <br>" +  
                "Here a " + this.sound + ", there a " + this.sound + ", <br>" + 
                "Everywhere a " + this.sound + "-" + this.sound + ", <br>" +
                "Old MacDonald had a farm, E-I-E-I-O! <br>";
        }

        eat(): string {

            this.foodAmount -= this.hunger;
            return "The " + this.type + " ate " + this.hunger + " " + this.food + ". <br>" + "There are " + this.foodAmount + " " + this.food + " left.";
        }
        
        doSpecialAction(): string {
            return "The " + this.type + " " + this.specialAction + ".";
        }

    }
}