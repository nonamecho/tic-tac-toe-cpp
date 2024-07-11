const BOARD_SIZE = 4;

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

          ctx.fillRect(j * 200 + 10, i * 200 + 10, 180, 180);
          ctx.fillStyle = "black";
          ctx.font = "50px serif";
          const print = this.board[i][j];
          const printWidth = ctx.measureText(print).width;
          ctx.fillText(
            this.board[i][j],
            j * 200 + 100 - printWidth / 2,
            i * 200 + 110
          );
        }
      }
    }
    if (match == BOARD_SIZE * BOARD_SIZE - 1) {
      ctx.reset();
      ctx.font = "50px serif";
      const print = "You win!";
      const printWidth = ctx.measureText(print).width;
      ctx.fillText(print, 400 - printWidth / 2, 200);
    }
  }
}

const game = new Game();
game.init();
game.draw();

c.addEventListener("mousedown", (e) => {
  let rect = c.getBoundingClientRect();
  let x = Math.floor((e.clientY - rect.top) / 200);
  let y = Math.floor((e.clientX - rect.left) / 200);
  if (game.pick(x, y)) {
    game.draw();
  }
});
