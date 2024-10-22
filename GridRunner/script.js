"use strict";

import Queue from "./queue.js";
import Grid from "./grid.js";

window.addEventListener("load", start);

// ****** CONTROLLER ******
// #region controller
const queue = new Queue();

queue.enqueue({ row: 5, col: 5 });
queue.enqueue({ row: 5, col: 6 });
queue.enqueue({ row: 5, col: 7 });

function start() {
  console.log(`Javascript kører`);
  createBoard();

  document.addEventListener("keydown", keyDown);
  // start ticking
  tick();
}

function keyDown(event) {
  switch (event.key) {
    case "ArrowLeft":
    case "a":
      direction = "left";
      break;
    case "ArrowRight":
    case "d":
      direction = "right";
      break;
    case "ArrowUp":
    case "w":
      direction = "up";
      break;
    case "ArrowDown":
    case "s":
      direction = "down";
      break;
  }
}

function tick() {
  // setup next tick
  setTimeout(tick, 100);

  for (let i = 0; i < queue.size(); i++) {
    const part = queue.get(i);
    grid.set({ row: part.row, col: part.col, value: 0 });
  }

  const head = { row: queue.tail.data.row, col: queue.tail.data.col };

  switch (direction) {
    case "left":
      head.col--;
      if (head.col < 0) {
        head.col = grid.getCols() - 1;
      }
      break;
    case "right":
      head.col++;
      if (head.col > grid.getCols() - 1) {
        head.col = 0;
      }
      break;
    case "down":
      head.row++;
      if (head.row > grid.getRows() - 1) {
        head.row = 0;
      }
      break;
    case "up":
      head.row--;
      if (head.row < 0) {
        head.row = grid.getRows() - 1;
      }
  }

  // TODO: Do stuff
  queue.enqueue(head);
  queue.dequeue();

  for (let i = 0; i < queue.size(); i++) {
    const part = queue.get(i);
    grid.set({ row: part.row, col: part.col, value: 1 });
  }

  // display the model in full
  displayBoard();
}

// #endregion controller

// ****** MODEL ******
// #region model

let direction = "right";
//const newHead = { row: queue[queue.length - 1].row, col: queue[queue.length - 1].col };
const player = {
  row: 5,
  col: 5,
};

const grid = new Grid(30, 30);

// #endregion model

// ****** VIEW ******
// #region view

function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < grid.getRows(); row++) {
    for (let col = 0; col < grid.getCols(); col++) {
      const index = row * grid.getCols() + col;

      switch (grid.get({ row: row, col: col })) {
        case 0:
          cells[index].classList.remove("player", "goal");
          break;
        case 1: // Note: doesn't remove goal if previously set
          cells[index].classList.add("player");
          break;
        case 2: // Note: doesn't remove player if previously set
          cells[index].classList.add("goal");
          break;
      }
    }
  }
}

function createBoard() {
  for (let i = 0; i < grid.size(); i++) {
    document.querySelector("#grid").insertAdjacentHTML(
      "beforeend",
      /*HTML*/
      `<div class="cell"></div>`
    );
  }

  document.querySelector("#grid").style.gridTemplateColumns = `repeat(${grid.getCols()}, 1fr)`;
}

// #endregion view
