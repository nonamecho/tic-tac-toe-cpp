const BOARD_SIZE = 4;
const OBJ_SIZE = 200;

/**@type {HTMLCanvasElement} */
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
c.width = 800;
c.height = 800;

class Game {
  constructor() {
    const board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      const row = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (i != BOARD_SIZE - 1 || j != BOARD_SIZE - 1) {
          row.push(i * BOARD_SIZE + j + 1);
        } else {
          row.push(null);
        }
      }
      board.push(row);
    }
    this.board = board;
    this.emptyGrid = { x: BOARD_SIZE - 1, y: BOARD_SIZE - 1 };
  }

  init() {
    for (let attempt = 0; attempt < 1000; attempt++) {
      const isMoveVert = Math.floor(Math.random() * 2);
      const isAddValue = Math.floor(Math.random() * 2);
      if (isMoveVert) {
        if (isAddValue) {
          this.pick(this.emptyGrid.x, this.emptyGrid.y + 1);
        } else {
          this.pick(this.emptyGrid.x, this.emptyGrid.y - 1);
        }
      } else {
        if (isAddValue) {
          this.pick(this.emptyGrid.x + 1, this.emptyGrid.y);
        } else {
          this.pick(this.emptyGrid.x - 1, this.emptyGrid.y);
        }
      }
    }
  }

  pick(x, y) {
    if (x < 0 || x > BOARD_SIZE - 1 || y < 0 || y > BOARD_SIZE - 1) {
      return false;
    }
    if (
      !(
        (x == this.emptyGrid.x + 1 && y == this.emptyGrid.y) ||
        (x == this.emptyGrid.x - 1 && y == this.emptyGrid.y) ||
        (x == this.emptyGrid.x && y == this.emptyGrid.y + 1) ||
        (x == this.emptyGrid.x && y == this.emptyGrid.y - 1)
      )
    ) {
      return false;
    }
    this.board[this.emptyGrid.x][this.emptyGrid.y] = this.board[x][y];
    this.board[x][y] = null;
    this.emptyGrid.x = x;
    this.emptyGrid.y = y;
    return true;
  }
  draw() {
    let match = 0;
    ctx.reset();
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (this.board[i][j] != null) {
          if (i * BOARD_SIZE + j + 1 == this.board[i][j]) {
            ctx.fillStyle = "#FE9E24";
            match++;
          } else {
            ctx.fillStyle = "#3FC2DA";
          }

          ctx.fillRect(
            j * OBJ_SIZE + 10,
            i * OBJ_SIZE + 10,
            OBJ_SIZE - 20,
            OBJ_SIZE - 20
          );
          ctx.fillStyle = "black";
          ctx.font = "50px serif";
          const print = this.board[i][j];
          const printWidth = ctx.measureText(print).width;
          ctx.fillText(
            this.board[i][j],
            j * OBJ_SIZE + OBJ_SIZE / 2 - printWidth / 2,
            i * OBJ_SIZE + OBJ_SIZE / 2 + 15
          );
        }
      }
    }
    if (match == BOARD_SIZE * BOARD_SIZE - 1) {
      ctx.reset();
      ctx.font = "50px serif";
      const print = "You win!";
      const printWidth = ctx.measureText(print).width;
      ctx.fillText(print, 400 - printWidth / 2, OBJ_SIZE);
    }
  }
}

const game = new Game();
game.init();
game.draw();

c.addEventListener("mousedown", (e) => {
  let rect = c.getBoundingClientRect();
  let x = Math.floor((e.clientY - rect.top) / OBJ_SIZE);
  let y = Math.floor((e.clientX - rect.left) / OBJ_SIZE);
  if (game.pick(x, y)) {
    game.draw();
  }
});

addEventListener("keydown", (e) => {
  const x = game.emptyGrid.x;
  const y = game.emptyGrid.y;
  switch (e.key) {
    case "ArrowLeft":
      if (game.pick(x, y + 1)) {
        game.draw();
      }
      break;
    case "ArrowRight":
      if (game.pick(x, y - 1)) {
        game.draw();
      }
      break;
    case "ArrowDown":
      if (game.pick(x - 1, y)) {
        game.draw();
      }
      break;
    case "ArrowUp":
      if (game.pick(x + 1, y)) {
        game.draw();
      }
      break;
    default:
      console.log("absorb unsupported keydown event", e);
  }
});
