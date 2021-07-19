namespace soccer_simulation {

    export abstract class Moveable {

        public position: Vector;
        public defaultPosition: Vector;
        public speed: number;

        constructor(_position: Vector, _speed: number) {
            this.defaultPosition = _position.copy();
            this.position = _position.copy();
            this.speed = _speed;
        }

        public abstract draw(): void;

        public abstract move(_targetPosition: Vector): void;

    }
}