const ROW_SIZE = 30;
const COLUMN_SIZE = 20;
const BLOCK_SHAPES = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
];

/**@type {HTMLCanvasElement} */
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
c.width = COLUMN_SIZE * 20;
c.height = ROW_SIZE * 20;

class Block {
  constructor() {
    this.shape = BLOCK_SHAPES[Math.floor(Math.random() * 7)];
    this.row = 0;
    this.column = Math.floor(COLUMN_SIZE / 2) - 1;
  }
  switch() {
    this.shape = this.shape[0].map((val, index) =>
      this.shape.map((row) => row[index]).reverse()
    );
  }
  moveLeft() {
    if (this.column - 1 >= 0) {
      this.column--;
      return true;
    } else {
      return false;
    }
  }
  moveRight() {
    if (this.column + this.shape[0].length - 1 < COLUMN_SIZE - 1) {
      this.column++;
      return true;
    } else {
      return false;
    }
  }
  moveUp() {
    if (this.row - 1 > 0) {
      this.row--;
      return true;
    } else {
      return false;
    }
  }
  moveDown() {
    if (this.row + this.shape.length - 1 < ROW_SIZE - 1) {
      this.row++;
      return true;
    } else {
      return false;
    }
  }
  draw() {
    ctx.fillStyle = "red";
    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape[i].length; j++) {
        if (this.shape[i][j]) {
          ctx.fillRect(
            (this.column + j) * 20 + 1,
            (this.row + i) * 20 + 1,
            18,
            18
          );
        }
      }
    }
  }
}

class Game {
  constructor() {
    this.totalTime = 0;
    this.lastTime = 0;
    this.moveDowntimeToNext = 0;
    this.moveDowntimeInterval = 500;
    this.block = new Block();
    const board = [];
    for (let i = 0; i < ROW_SIZE; i++) {
      const row = [];
      for (let j = 0; j < COLUMN_SIZE; j++) {
        row.push(-1);
      }
      board.push(row);
    }
    this.board = board;
    addEventListener("keydown", (e) => {
      console.info(e.key);
      switch (e.key) {
        case "ArrowLeft":
          this.block.moveLeft();
          break;
        case "ArrowRight":
          this.block.moveRight();
          break;
        case "ArrowDown":
          this.block.moveDown();
          break;
        case " ":
          this.block.switch();
          break;
        default:
          console.log("absorb unsupported keydown event", e);
      }
    });
  }
  update(timestamp) {
    // handle time
    const deltaTime = this.lastTime ? timestamp - this.lastTime : 0;
    this.totalTime += deltaTime;
    this.lastTime = timestamp;
    this.moveDowntimeToNext += deltaTime;
    // Only update when meet time interval
    if (this.moveDowntimeToNext > this.moveDowntimeInterval) {
      this.moveDowntimeToNext = 0;
      if (!this.block.moveDown()) {
        this.block = new Block();
      }
    }
  }
  draw() {
    ctx.reset();
    this.block.draw();
  }
}

const game = new Game();

function main(timestamp) {
  game.update(timestamp);
  game.draw();
  window.requestAnimationFrame(main);
}

main(0);
