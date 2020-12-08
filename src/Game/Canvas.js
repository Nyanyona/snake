import { Cell } from './Cell';
import { Snake, SNAKE_MOVEMENT_DIRECTION } from './Snake';

export class Canvas {
  static #backgroundColor = '#000';

  static #cellSize = 25.5;

  static #color = '#fff';

  static __calcSize(size) {
    return size * Canvas.#cellSize;
  }

  #canvasEl;

  #container;

  #snake;

  #height;

  #width;

  constructor(container, height, width) {
    this.#container = container;
    this.#height = height;
    this.#width = width;
  }

  __initCanvas() {
    this.#canvasEl = document.createElement('canvas');

    const canvasHeight = Canvas.__calcSize(this.#height);
    const canvasWidth = Canvas.__calcSize(this.#width);

    this.#canvasEl.classList.add('canvas');
    this.#canvasEl.setAttribute('height', canvasHeight);
    this.#canvasEl.setAttribute('width', canvasWidth);

    this.#container.appendChild(this.#canvasEl);

    return this;
  }

  __initSnake() {
    const initialSnakeX = Math.floor(this.#height / 2);
    const initialSnakeY = Math.floor(this.#width / 2);

    const initialSnakeHead = new Cell(initialSnakeX, initialSnakeY);
    this.#snake = new Snake(initialSnakeHead);

    return this;
  }

  __initControls() {
    document.addEventListener('keyup', ({ key }) => {
      const snake = this.#snake;

      if (key === 'ArrowUp' && snake.direction !== SNAKE_MOVEMENT_DIRECTION.down)
        snake.setDirection(SNAKE_MOVEMENT_DIRECTION.up);
      else if (key === 'ArrowRight' && snake.direction !== SNAKE_MOVEMENT_DIRECTION.left)
        snake.setDirection(SNAKE_MOVEMENT_DIRECTION.right);
      else if (key === 'ArrowDown' && snake.direction !== SNAKE_MOVEMENT_DIRECTION.up)
        snake.setDirection(SNAKE_MOVEMENT_DIRECTION.down);
      else if (key === 'ArrowLeft' && snake.direction !== SNAKE_MOVEMENT_DIRECTION.right)
        snake.setDirection(SNAKE_MOVEMENT_DIRECTION.left);
    });

    return this;
  }

  init() {
    return this.__initCanvas().__initSnake().__initControls();
  }

  __clearCanvas(ctx) {
    const canvasHeight = Canvas.__calcSize(this.#height);
    const canvasWidth = Canvas.__calcSize(this.#width);

    ctx.fillStyle = Canvas.#backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    return this;
  }

  __renderSnake(ctx) {
    ctx.fillStyle = Canvas.#color;

    this.#snake.position.forEach(cell => {
      const x = Canvas.__calcSize(cell.x);
      const y = Canvas.__calcSize(cell.y);
      ctx.fillRect(x, y, Canvas.#cellSize, Canvas.#cellSize);
    });

    return this;
  }

  __render(ctx) {
    this.__clearCanvas(ctx).__renderSnake(ctx);

    return this;
  }

  __update() {
    this.#snake.update();

    return this;
  }

  start() {
    const ctx = this.#canvasEl.getContext('2d');

    this.__render(ctx);

    setInterval(() => this.__update().__render(ctx), 250);

    return this;
  }
}
