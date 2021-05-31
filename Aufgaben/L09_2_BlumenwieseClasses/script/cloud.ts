namespace Blumenwiese_L09 {

        export class Cloud {
            position: Vector;
            size: Vector;
            velocity: Vector = new Vector(-5, 0);
            nParticles: number;
    
            constructor(_position: Vector, _size: Vector, _nParticles: number) {

                this.position = _position;
                this.size = _size;
                this.velocity.x = this.velocity.x * _size.x;
                this.nParticles = _nParticles;
    
                this.draw();
            }
    
            draw(): void {

                let particle: Path2D = new Path2D();
                let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, 25);
        
                particle.ellipse(0, 0, 10, 25, Math.PI / 2, 0, 2 * Math.PI);
                gradient.addColorStop(0, "#ffe2de40"); //black
                gradient.addColorStop(1, "#fff5f500"); //green

                crc2.save();
                crc2.translate(this.position.x, this.position.y);
                crc2.fillStyle = gradient;
        
                for (let drawn: number = 0; drawn < this.nParticles; drawn++) {
                    crc2.save();
                    let x: number = (Math.random() - 0.5) * this.size.x;
                    let y: number = - (Math.random() * this.size.y);
                    crc2.translate(x, y);
                    crc2.fill(particle);
                    crc2.restore();
                }
                crc2.restore();
            }
    
            move(_timeslice: number): void {
                let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
                offset.scale(_timeslice);
                this.position.add(offset);
    
                if (this.position.x < -450)
                    this.position.x += crc2.canvas.width + 450;
                if (this.position.x > crc2.canvas.width)
                    this.position.x -= crc2.canvas.width;
    
            }
    
        }
    }
