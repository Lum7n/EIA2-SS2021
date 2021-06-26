namespace Blumenwiese_L11 {

    export let stemPath: Path2D;
    export let blossomPath: Path2D;
    // export let ufoPath: Path2D;

    export function createPaths(): void {

        stemPath = createStemPath();
        blossomPath = createBlossomPath();
        // ufoPath = createUfoPath();
    }

    function createStemPath(): Path2D {

        let stem: Path2D = new Path2D();

        stem.moveTo(0, 0);
        stem.lineTo(-5, -100);
        stem.lineTo(-1, -50);
        stem.ellipse(15, -50, 9, 18, Math.PI / 2.5, 1.3, 2.8 * Math.PI);
        stem.lineTo(0, 0);
        stem.closePath();

        return stem;
    }

    function createBlossomPath(): Path2D {

        let blossom: Path2D = new Path2D();

        blossom.moveTo(0, -110);
        blossom.ellipse(-17, -92, 12, 25, 3.9, 2, 2.8 * Math.PI);
        blossom.ellipse(-30, -110, 12, 25, 4.6, 2, 2.8 * Math.PI);
        blossom.ellipse(-25, -135, 12, 25, 5.4, 2, 2.8 * Math.PI);
        blossom.ellipse(-2, -147, 12, 25, 6.2, 2, 2.8 * Math.PI);
        blossom.ellipse(22, -140, 12, 25, 7, 2, 2.8 * Math.PI);
        blossom.ellipse(30, -120, 12, 25, 7.7, 2, 2.8 * Math.PI);
        blossom.ellipse(25, -100, 12, 25, 8.3, 2, 2.8 * Math.PI);
        blossom.ellipse(5, -90, 12, 25, 9.2, 2, 2.8 * Math.PI);
        blossom.closePath();

        return blossom;
    }

    // function createUfoPath(): Path2D {
    //     let path: Path2D = new Path2D();
    //     path.moveTo(20, 13);
    //     path.lineTo(27, 3);
    //     path.lineTo(38, 3);
    //     path.lineTo(43, 13);
    //     path.lineTo(59, 25);
    //     path.lineTo(45, 35);
    //     path.lineTo(18, 35);
    //     path.lineTo(4, 25);
    //     path.lineTo(20, 13);
    //     path.lineTo(43, 13);
    //     path.closePath();

    //     path.moveTo(4, 25);
    //     path.lineTo(59, 25);
    //     path.closePath();
    //     return path;
    // }
}