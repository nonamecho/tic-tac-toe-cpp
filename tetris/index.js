const ROW_SIZE = 30;
const COLUMN_SIZE = 20;
const BLOCK_OBJS = [
  {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
    ],
    color: "#ff0000",
  },
  {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "#ffff00",
  },
  {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "#00ffff",
  },
  {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "#800080",
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "#00ff00",
  },
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "#ff7f00",
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "#0000ff",
  },
];

/**@type {HTMLCanvasElement} */
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
c.width = COLUMN_SIZE * 20;
c.height = ROW_SIZE * 20;

class Block {
  constructor(game) {
    this.game = game;
    this.val = Math.floor((Math.random() * 70) / 10);
    this.obj = BLOCK_OBJS[this.val];
    this.row = 0;
    this.column = Math.floor(COLUMN_SIZE / 2) - 1;
  }
  rotate() {
    this.obj.shape = this.obj.shape[0].map((val, index) =>
      this.obj.shape.map((row) => row[index]).reverse()
    );
  }
  checkIfBlock(row, column) {
    for (let i = 0; i < this.obj.shape.length; i++) {
      for (let j = 0; j < this.obj.shape[i].length; j++) {
        if (
          this.obj.shape[i][j] != 0 &&
          this.game.board.val[row + i][column + j] != -1
        ) {
          return true;
        }
      }
    }
    return false;
  }
  moveLeft() {
    if (this.column - 1 >= 0) {
      if (!this.checkIfBlock(this.row, this.column - 1)) {
        this.column--;
        return true;
      }
    }
    return false;
  }
  moveRight() {
    if (this.column + this.obj.shape[0].length - 1 < COLUMN_SIZE - 1) {
      if (!this.checkIfBlock(this.row, this.column + 1)) {
        this.column++;
        return true;
      }
    }
    return false;
  }
  moveDown() {
    if (this.row + this.obj.shape.length - 1 < ROW_SIZE - 1) {
      if (!this.checkIfBlock(this.row + 1, this.column)) {
        this.row++;
        return true;
      }
    }
    this.game.add();
    return false;
  }
  draw() {
    ctx.fillStyle = this.obj.color;
    for (let i = 0; i < this.obj.shape.length; i++) {
      for (let j = 0; j < this.obj.shape[i].length; j++) {
        if (this.obj.shape[i][j]) {
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

class Board {
  constructor(game) {
    this.game = game;
    const board = [];
    for (let i = 0; i < ROW_SIZE; i++) {
      const row = [];
      for (let j = 0; j < COLUMN_SIZE; j++) {
        row.push(-1);
      }
      board.push(row);
    }
    this.val = board;
  }
  add() {
    const block = this.game.block;
    for (let i = 0; i < block.obj.shape.length; i++) {
      for (let j = 0; j < block.obj.shape[i].length; j++) {
        if (block.obj.shape[i][j]) {
          this.val[block.row + i][block.column + j] = block.val;
        }
      }
    }
  }
  removeLine() {
    for (let i = 0; i < this.val.length; i++) {
      if (this.val[i].filter((v) => v != -1).length == COLUMN_SIZE) {
        this.val.splice(i, 1);
        const newRow = [];
        for (let j = 0; j < COLUMN_SIZE; j++) {
          newRow.push(-1);
        }
        this.val = [newRow].concat(this.val);
      }
    }
  }
  draw() {
    for (let i = 0; i < this.val.length; i++) {
      for (let j = 0; j < this.val[i].length; j++) {
        if (this.val[i][j] != -1) {
          ctx.fillStyle = BLOCK_OBJS[this.val[i][j]].color;
          ctx.fillRect(j * 20 + 1, i * 20 + 1, 18, 18);
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
    this.board = new Board(this);
    this.block = new Block(this);

    addEventListener("keydown", (e) => {
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
          this.block.rotate();
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
      this.block.moveDown();
    }
    this.board.removeLine();
  }
  add() {
    this.board.add();
    this.block = new Block(this);
  }
  draw() {
    ctx.reset();
    this.block.draw();
    this.board.draw();
  }
}

const game = new Game();

function main(timestamp) {
  game.update(timestamp);
  game.draw();
  window.requestAnimationFrame(main);
}

main(0);
