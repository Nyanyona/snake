export class Cell {
  #x;

  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  isSameCell(targetCell) {
    return this.#x === targetCell.x && this.#y === targetCell.y;
  }
}
