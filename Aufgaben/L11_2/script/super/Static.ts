namespace Blumenwiese_L11 {
    export abstract class Static {
        public position: Vector;

        constructor(_position: Vector) {
            this.position = _position.clone();
        }

        public abstract draw(): void;
    }
}