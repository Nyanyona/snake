import { Canvas } from './Game';

const canvasWrapperEl = document.querySelector('.canvas-wrapper');

const canvas = new Canvas(canvasWrapperEl, 15, 15);

canvas.init().start();

window.canvas = canvas;
