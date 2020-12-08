import { Cell } from './Cell';

export const SNAKE_MOVEMENT_DIRECTION = {
  up: 'up',
  right: 'right',
  down: 'down',
  left: 'left',
};

export const SNAKE_STATE = {
  alive: 'o_o',
  dead: 'x_x',
};

export class Snake {
  #direction = SNAKE_MOVEMENT_DIRECTION.up;

  #length = 1;

  #position = [];

  #state = SNAKE_STATE.alive;

  constructor(initialCell) {
    this.#position.push(initialCell);
  }

  get position() {
    return [...this.#position];
  }

  get direction() {
    return this.#direction;
  }

  get isDead() {
    return this.#state === SNAKE_STATE.dead;
  }

  setDirection(newDirection) {
    this.#direction = newDirection;

    return this;
  }

  incrementLength() {
    this.#length += 1;

    return this;
  }

  update() {
    if (this.isDead) return this;

    const direction = this.#direction;
    const currentPosition = this.#position;
    const currentHead = currentPosition[0];
    let nextHead;

    if (direction === SNAKE_MOVEMENT_DIRECTION.up)
      nextHead = new Cell(currentHead.x, currentHead.y - 1);
    else if (direction === SNAKE_MOVEMENT_DIRECTION.right)
      nextHead = new Cell(currentHead.x + 1, currentHead.y);
    else if (direction === SNAKE_MOVEMENT_DIRECTION.down)
      nextHead = new Cell(currentHead.x, currentHead.y + 1);
    else if (direction === SNAKE_MOVEMENT_DIRECTION.left)
      nextHead = new Cell(currentHead.x - 1, currentHead.y);

    const newPosition = [nextHead, ...currentPosition].slice(0, this.#length);

    this.#position = newPosition;

    if (newPosition.slice(1).some(cell => cell.isSameCell(nextHead))) this.__die();

    return this;
  }

  __die() {
    this.#state = SNAKE_STATE.dead;

    return this;
  }
}
