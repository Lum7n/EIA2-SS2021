namespace Blumenwiese_L08 {

    interface Vector {
        x: number;
        y: number;
    }

    interface VarietiesTrees {
        c: number;
        b: number;
    }

    interface VarietiesFlowers {
        purple: number;
        rosa: number;
        blue: number;
        yellow: number;
    }

    window.addEventListener("load", init);

    let canvas: HTMLCanvasElement;
    let crc2: CanvasRenderingContext2D;

    let golden: number = 0.62;
    let reversGolden: number = 1 - golden;

    let canvasWidth: number;
    let canvasHeight: number;


    function init(_event: Event): void {

        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        canvasSize();
        canvasWidth = crc2.canvas.width;
        canvasHeight = crc2.canvas.height;
        // border
        crc2.strokeRect(0, 0, canvasWidth, canvasHeight);

        let posMountains: Vector = { x: 0, y: canvasHeight * reversGolden };

        drawBackground();
        drawSun({ x: golden, y: 0.25 });
        drawClouds();
        drawMountains(posMountains, 0.55, 0.70, "#7f91b3", "#4f4f69", "#9e9eb8");
        drawMountains(posMountains, 0.5, 0.65, "#67688a", "#3b3e4d", "#9a8fa6");

        drawTrees({ x: 100, y: (reversGolden + 0.04) * canvasHeight }, 0.5, { c: 6, b: 4 });
        drawTrees({ x: 100, y: (reversGolden + 0.06) * canvasHeight }, 0.6, { c: 3, b: 3 });
        drawTrees({ x: 100, y: (reversGolden + 0.08) * canvasHeight }, 0.7, { c: 2, b: 1 });

        drawFlowers({ x: 200, y: (golden - 0.04) * canvasHeight }, 0.4, {purple: 1, rosa: 1, blue: 1, yellow: 1} );
        drawFlowers({ x: 200, y: (golden - 0.01) * canvasHeight }, 0.5, {purple: 1, rosa: 1, blue: 1, yellow: 1} );
        drawFlowers({ x: 200, y: (golden + 0.04) * canvasHeight }, 0.6, {purple: 1, rosa: 1, blue: 1, yellow: 1} );
        drawFlowers({ x: 200, y: (golden + 0.1) * canvasHeight }, 0.6, {purple: 1, rosa: 1, blue: 1, yellow: 1} );
        drawFlowers({ x: 200, y: (golden + 0.2) * canvasHeight }, 0.7, {purple: 1, rosa: 1, blue: 1, yellow: 1} );
        drawFlowers({ x: 200, y: (golden + 0.22) * canvasHeight }, 0.6, {purple: 1, rosa: 1, blue: 1, yellow: 1} );
        drawFlowers({ x: 200, y: (golden + 0.35) * canvasHeight }, 0.7, {purple: 1, rosa: 1, blue: 1, yellow: 1} );

    }

    function canvasSize(): void {

        let windowWidth: number = window.innerWidth;
        let windowHeight: number = window.innerHeight;

        canvas.width = windowWidth - 50;
        canvas.height = windowHeight - 100;

        crc2.strokeRect(0, 0, canvasWidth, canvasHeight);
    }

    function drawBackground(): void {
        console.log("Background");

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "#8fb7db");
        gradient.addColorStop(0.18, "#f5ddda");
        gradient.addColorStop(0.28, "#fcd087");
        gradient.addColorStop(0.38, "#fcd087");
        gradient.addColorStop(0.38, "#2f522d");
        gradient.addColorStop(0.6, "#518f32");
        gradient.addColorStop(1, "#518f32");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    function drawSun(_position: Vector): void {
        console.log("Sun", _position);

        let r1: number = 30;
        let r2: number = 150;

        let x: number = _position.x * canvasWidth;
        let y: number = _position.y * canvasHeight;

        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

        gradient.addColorStop(0, "#fffcdd");
        gradient.addColorStop(0.3, "#ffd72b66");
        gradient.addColorStop(0.7, "#fe9d0026");
        gradient.addColorStop(1, "#fe9d0000");

        crc2.save();
        crc2.translate(x, y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }

    function drawClouds(): void {

        let sizeMin: Vector = { x: 0.17, y: 0.02 };
        let sizeMax: Vector = { x: 0.27, y: 0.03 };
        let nParticlesMin: number = 75;
        let nParticlesMax: number = 120;

        let cloudAmount: number = Math.floor(canvasWidth / 130);
        let horizon: number = (1 - 0.8) * canvasHeight;
        let skyPart: number = horizon / 5;

        // drawCloud({ x: 200, y: 125 }, sizeMax, nParticlesMax);
        // drawCloud({ x: 200, y: 125 }, sizeMin, nParticlesMin);

        while (cloudAmount != 0) {
            console.log(cloudAmount);

            let positionX: number = 130 * (Math.random() * (cloudAmount + 5));
            let positionY: number = 2 * skyPart + (Math.random() * (skyPart * 3));

            if (cloudAmount >= 4) {
                drawCloud({ x: positionX, y: positionY }, sizeMax, nParticlesMax);
            } else {
                drawCloud({ x: positionX, y: positionY }, sizeMin, nParticlesMin);
            }
            cloudAmount--;

        }
    }

    function drawCloud(_position: Vector, _size: Vector, _nParticles: number): void {
        console.log("Cloud", _position, _size);

        let sizeX: number = _size.x * canvasWidth;
        console.log(sizeX);
        if (sizeX >= 400) {
            sizeX = 400;
            _nParticles = 170;

        } else if (sizeX >= 300) {
            _nParticles = 150;
        }
        console.log(sizeX);
        let sizeY: number = _size.y * canvasHeight;

        let radius1Particle: number = 10;
        let radius2Particle: number = 25;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radius2Particle);

        particle.ellipse(0, 0, radius1Particle, radius2Particle, Math.PI / 2, 0, 2 * Math.PI);
        gradient.addColorStop(0, "#ffe2de40"); //black
        gradient.addColorStop(1, "#fff5f500"); //green

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;

        // _nParticles = 1;

        for (let drawn: number = 0; drawn < _nParticles; drawn++) {
            crc2.save();
            let x: number = (Math.random() - 0.5) * sizeX;
            let y: number = - (Math.random() * sizeY);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }

    function drawMountains(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string, _colorTop: string): void {
        console.log("Mountains", _position, _min, _max);
        let stepMin: number = 50;
        let stepMax: number = 130;
        let x: number = 0;
        let minHeight: number = (_min - 0.5) * canvasHeight;
        let maxHeight: number = (_max - 0.5) * canvasHeight;

        crc2.save();
        crc2.translate(_position.x, _position.y);

        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -maxHeight * 0.7);

        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y: number = -minHeight - Math.random() * (maxHeight - minHeight);

            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);

        crc2.lineTo(x, 0);
        crc2.closePath();

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -maxHeight);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        gradient.addColorStop(0.8, _colorHigh);
        gradient.addColorStop(1, _colorTop);

        crc2.fillStyle = gradient;
        crc2.fill();

        crc2.restore();
    }

    function drawTrees(_position: Vector, _scaleFactor: number, _amount: VarietiesTrees): void {
        console.log("Trees", _position);

        let size: Vector = { x: 180, y: 220 };

        let gradientConifer: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -size.y);

        gradientConifer.addColorStop(0, "#382411");             //dark brown
        gradientConifer.addColorStop(1 / 11, "#382411");        //dark brown
        gradientConifer.addColorStop(1 / 11, "#0c5918");        //lighter needle-green
        gradientConifer.addColorStop(1 / 3.7, "#0b3611");       //darker needle-green
        gradientConifer.addColorStop(1 / 3.7, "#0c5918");       //lighter needle-green
        gradientConifer.addColorStop(1 / 2.2, "#0b3611");       //darker needle-green
        gradientConifer.addColorStop(1 / 2.2, "#0c5918");       //lighter needle-green
        gradientConifer.addColorStop(1 / 1.6, "#0b3611");       //darker needle-green
        gradientConifer.addColorStop(1 / 1.6, "#0c5918");       //lighter needle-green
        gradientConifer.addColorStop(1, "#0b3611");             //darker needle-green

        let gradientBroadleaf: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -size.y);

        gradientBroadleaf.addColorStop(0, "#ad7f53");           //brown
        gradientBroadleaf.addColorStop(1 / 6.2, "#ad7f53");     //brown
        gradientBroadleaf.addColorStop(1 / 6.1, "#528c29");     //green
        gradientBroadleaf.addColorStop(1, "#528c29");           //green


        while (_amount.c >= 0) {

            let randomX: number = Math.random() * canvasWidth;

            crc2.save();

            crc2.translate(randomX, _position.y);
            crc2.scale(_scaleFactor, _scaleFactor);

            crc2.fillStyle = gradientConifer;
            crc2.fill(getPathConifer(size));

            crc2.restore();

            _amount.c--;
        }

        while (_amount.b >= 0) {

            let randomX: number = Math.random() * canvasWidth;

            crc2.save();

            crc2.translate(randomX, _position.y);
            crc2.scale(_scaleFactor, _scaleFactor);

            crc2.fillStyle = gradientBroadleaf;
            crc2.fill(getPathBroadleaf(size));

            crc2.restore();

            _amount.b--;
        }
    }

    function getPathConifer(_size: Vector): Path2D {

        let conifer: Path2D = new Path2D();

        conifer.moveTo(0, 0);
        conifer.lineTo(-(_size.x / 18), 0);
        conifer.lineTo(-(_size.x / 18), -(_size.y / 11));
        conifer.lineTo(-(_size.x / 2), -(_size.y / 11));
        conifer.lineTo(-(_size.x / 3.6), -(_size.y / 3.7));
        conifer.lineTo(-(_size.x / 2.4), -(_size.y / 3.7));
        conifer.lineTo(-(_size.x / 6), -(_size.y / 2.2));
        conifer.lineTo(-(_size.x / 3), -(_size.y / 2.2));
        conifer.lineTo(-(_size.x / 6), -(_size.y / 1.6));
        conifer.lineTo(-(_size.x / 3.6), -(_size.y / 1.6));
        conifer.lineTo(0, -_size.y);
        conifer.lineTo((_size.x / 3.6), -(_size.y / 1.6));
        conifer.lineTo((_size.x / 6), -(_size.y / 1.6));
        conifer.lineTo((_size.x / 3), -(_size.y / 2.2));
        conifer.lineTo((_size.x / 6), -(_size.y / 2.2));
        conifer.lineTo((_size.x / 2.4), -(_size.y / 3.7));
        conifer.lineTo((_size.x / 3.6), -(_size.y / 3.7));
        conifer.lineTo((_size.x / 2), -(_size.y / 11));
        conifer.lineTo((_size.x / 18), -(_size.y / 11));
        conifer.lineTo((_size.x / 18), 0);

        return conifer;
    }

    function getPathBroadleaf(_size: Vector): Path2D {

        let broadleaf: Path2D = new Path2D();

        broadleaf.moveTo(0, 0);
        broadleaf.lineTo(-10, 0);
        broadleaf.lineTo(-10, -40);
        broadleaf.arc(-30, -60, 25, 0.2 * Math.PI, 0.9 * Math.PI);
        broadleaf.arc(-50, -82, 30, 0.5 * Math.PI, 1.4 * Math.PI);
        broadleaf.arc(-55, -132, 23, 0.5 * Math.PI, 1.5 * Math.PI);
        broadleaf.arc(-22, -167, 40, 0.9 * Math.PI, 1.4 * Math.PI);
        broadleaf.arc(-10, -215, 25, 0.8 * Math.PI, 2 * Math.PI);
        broadleaf.arc(20, -190, 25, 1.4 * Math.PI, 2.1 * Math.PI);
        broadleaf.arc(45, -162, 20, 1.4 * Math.PI, 2.4 * Math.PI);
        broadleaf.arc(40, -107, 40, 1.6 * Math.PI, 2.43 * Math.PI);
        broadleaf.arc(25, -60, 25, 1.85 * Math.PI, 2.7 * Math.PI);
        broadleaf.lineTo(10, -40);
        broadleaf.lineTo(10, 0);

        return broadleaf;
    }

    function drawFlowers(_position: Vector, _scaleFactor: number, _amount: VarietiesFlowers): void {

        let gradientPurple: CanvasGradient = crc2.createRadialGradient(0, -118, 8, 0, -118, 50);

        gradientPurple.addColorStop(0, "#e8c456");
        gradientPurple.addColorStop(0.1, "#e8c456");
        gradientPurple.addColorStop(0.11, "#d45791");
        gradientPurple.addColorStop(0.3, "#d457b9");
        gradientPurple.addColorStop(1, "#d498cd");
        
        let gradientRosa: CanvasGradient = crc2.createRadialGradient(0, -118, 8, 0, -118, 50);

        gradientRosa.addColorStop(0, "#e8de56");
        gradientRosa.addColorStop(0.1, "#e8de56");
        gradientRosa.addColorStop(0.11, "#d4576a");
        gradientRosa.addColorStop(0.3, "#d45783");
        gradientRosa.addColorStop(1, "#d498b4");

        let gradientBlue: CanvasGradient = crc2.createRadialGradient(0, -118, 8, 0, -118, 50);

        gradientBlue.addColorStop(0, "#e8de56");
        gradientBlue.addColorStop(0.1, "#e8de56");
        gradientBlue.addColorStop(0.11, "#6e57d4");
        gradientBlue.addColorStop(0.3, "#576ed4");
        gradientBlue.addColorStop(1, "#98b7d4");

        let gradientYellow: CanvasGradient = crc2.createRadialGradient(0, -118, 8, 0, -118, 50);

        gradientYellow.addColorStop(0, "#e8de56");
        gradientYellow.addColorStop(0.1, "#e8de56");
        gradientYellow.addColorStop(0.11, "#d49357");
        gradientYellow.addColorStop(0.4, "#d4bf57");
        gradientYellow.addColorStop(1, "#ced498");

        let stem: Path2D = new Path2D();

        stem.moveTo(0, 0);
        stem.lineTo(-5, -100);
        stem.lineTo(-1, -50);
        stem.ellipse(15, -50, 9, 18, Math.PI / 2.5, 1.3, 2.8 * Math.PI);
        stem.lineTo(0, 0);

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


        while (_amount.purple >= 0) {
            
            let randomX: number = Math.random() * canvasWidth;

            //stem
            crc2.save();

            crc2.translate(randomX, _position.y);
            crc2.scale(_scaleFactor, _scaleFactor);

            crc2.strokeStyle = "#8ddb56";
            crc2.fillStyle = "#8ddb56";

            crc2.fill(stem);
            crc2.stroke(stem);

            crc2.restore();

            //blossom
            crc2.save();

            crc2.translate(randomX, _position.y);
            crc2.scale(_scaleFactor, _scaleFactor);

            crc2.fillStyle = gradientPurple;
            crc2.fill(blossom);

            crc2.restore();

            _amount.purple--;
        }

        while (_amount.rosa >= 0) {
            
            let randomX: number = Math.random() * canvasWidth;

            //stem
            crc2.save();

            crc2.translate(randomX, _position.y);
            crc2.scale(_scaleFactor, _scaleFactor);

            crc2.strokeStyle = "#8ddb56";
            crc2.fillStyle = "#8ddb56";

            crc2.fill(stem);
            crc2.stroke(stem);

            crc2.restore();

            //blossom
            crc2.save();

            crc2.translate(randomX, _position.y);
            crc2.scale(_scaleFactor, _scaleFactor);

            crc2.fillStyle = gradientRosa;
            crc2.fill(blossom);

            crc2.restore();

            _amount.rosa--;
        }

        while (_amount.blue >= 0) {
            
            let randomX: number = Math.random() * canvasWidth;

            //stem
            crc2.save();

            crc2.translate(randomX, _position.y);
            crc2.scale(_scaleFactor, _scaleFactor);

            crc2.strokeStyle = "#8ddb56";
            crc2.fillStyle = "#8ddb56";

            crc2.fill(stem);
            crc2.stroke(stem);

            crc2.restore();

            //blossom
            crc2.save();

            crc2.translate(randomX, _position.y);
            crc2.scale(_scaleFactor, _scaleFactor);

            crc2.fillStyle = gradientBlue;
            crc2.fill(blossom);

            crc2.restore();

            _amount.blue--;
        }

        while (_amount.yellow >= 0) {
            
            let randomX: number = Math.random() * canvasWidth;

            //stem
            crc2.save();

            crc2.translate(randomX, _position.y);
            crc2.scale(_scaleFactor, _scaleFactor);

            crc2.strokeStyle = "#8ddb56";
            crc2.fillStyle = "#8ddb56";

            crc2.fill(stem);
            crc2.stroke(stem);

            crc2.restore();

            //blossom
            crc2.save();

            crc2.translate(randomX, _position.y);
            crc2.scale(_scaleFactor, _scaleFactor);

            crc2.fillStyle = gradientYellow;
            crc2.fill(blossom);

            crc2.restore();

            _amount.yellow--;
        }
    }
}

        // crc2.save();
        // crc2.beginPath();

        // crc2.strokeStyle = "black";
        // crc2.fillStyle = gradient;

        // crc2.moveTo(0   , 0);
        // crc2.lineTo(-10 , 0);
        // ...
        // crc2.lineTo(10 , 0);

        // crc2.closePath();

        // crc2.fill();
        // crc2.stroke();

        // crc2.restore();