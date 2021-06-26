namespace Blumenwiese_L11 {
    export let flowerGradient: CanvasGradient[];
    export let coniferGradient: CanvasGradient;

    export let colorFlowers: string[][] = [
        //purple
        ["#d45791", "#d457b9", "#d498cd"],
        //red
        ["#d4576a", "#d45783", "#d498b4"],
        //blue
        ["#6e57d4", "#576ed4", "#98b7d4"],
        //yellow
        ["#d49357", "#d4bf57", "#ced498"]
    ];

    export function create(): void {
        flowerGradient = createFlowerGradient(colorFlowers);
        coniferGradient = createConiferGradient();
    }

    export function createFlowerGradient(_color: string[][]): CanvasGradient[] {

        let gradients: CanvasGradient[] = [];
        let gradientFlower: CanvasGradient = crc2.createRadialGradient(0, -118, 8, 0, -118, 50);

        for (let type of _color) {

            // console.log(type);
            gradientFlower.addColorStop(0, "#e8c456");
            gradientFlower.addColorStop(0.1, "#e8c456");

            for (let colorCode of type) {

                let index: number = 0;
                switch (index) {
                    case 0:
                        gradientFlower.addColorStop(0.11, colorCode);
                        index++;
                        break;
                    case 1:
                        gradientFlower.addColorStop(0.3, colorCode);
                        index++;
                        break;
                    case 2:
                        gradientFlower.addColorStop(1, colorCode);
                        index++;
                        break;
                    default:
                        break;
                }
            }
            gradients.push(gradientFlower);
        }
        return gradients;
    }

    function createConiferGradient(): CanvasGradient {

        let gradient: CanvasGradient = crc2.createRadialGradient(0, -118, 8, 0, -118, 50);

        return gradient;
    }
}