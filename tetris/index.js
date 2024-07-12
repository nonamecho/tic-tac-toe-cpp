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
    const rotatedObjShape = this.obj.shape[0].map((val, index) =>
      this.obj.shape.map((row) => row[index]).reverse()
    );
    if (!this.checkIfBlock(rotatedObjShape, this.row, this.column)) {
      this.obj.shape = rotatedObjShape;
    }
  }
  checkIfBlock(shape, row, column) {
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (
          shape[i][j] != 0 &&
          (row + i < 0 ||
            row + i > ROW_SIZE - 1 ||
            column + j < 0 ||
            column + j > COLUMN_SIZE - 1 ||
            this.game.board.val[row + i][column + j] != -1)
        ) {
          return true;
        }
      }
    }
    return false;
  }
  moveLeft() {
    if (!this.checkIfBlock(this.obj.shape, this.row, this.column - 1)) {
      this.column--;
      return true;
    }

    return false;
  }
  moveRight() {
    if (!this.checkIfBlock(this.obj.shape, this.row, this.column + 1)) {
      this.column++;
      return true;
    }

    return false;
  }
  moveDown() {
    if (!this.checkIfBlock(this.obj.shape, this.row + 1, this.column)) {
      this.row++;
      return true;
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
          if (block.row < 2) {
            this.game.end();
          }
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
        this.game.score += 10;
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
    this.moveDowntimeInterval = 500;
    this.reset();

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
          if (this.state == "playing") {
            this.block.rotate();
          } else if (this.state == "idle") {
            this.state = "playing";
            music.play();
          }
          break;
        case "Escape":
          this.togglePause();
          break;
        default:
          console.log("absorb unsupported keydown event", e);
      }
    });
  }
  reset() {
    this.state = "idle";
    this.totalTime = 0;
    this.lastTime = 0;
    this.score = 0;
    this.moveDowntimeToNext = 0;
    this.board = new Board(this);
    this.block = new Block(this);
  }
  update(timestamp) {
    const deltaTime = this.lastTime ? timestamp - this.lastTime : 0;
    this.lastTime = timestamp;

    if (this.state == "playing") {
      // handle time
      this.totalTime += deltaTime;
      this.moveDowntimeToNext += deltaTime;

      // Only update when meet time interval
      if (this.moveDowntimeToNext > this.moveDowntimeInterval) {
        this.moveDowntimeToNext = 0;
        this.block.moveDown();
      }
      this.board.removeLine();
    }
  }
  add() {
    this.board.add();
    this.block = new Block(this);
  }
  drawHeadMask() {
    ctx.fillStyle = "#58C6A1";
    ctx.fillRect(0, 0, COLUMN_SIZE * 20, 2 * 20);
  }
  drawHeadInfo() {
    ctx.fillStyle = "black";
    ctx.font = "16px serif";
    ctx.fillText("Time: " + Math.floor(this.totalTime / 1000), 0, 30);
    const print = "Score: " + this.score;
    const printWidth = ctx.measureText(print).width;
    ctx.fillText(print, COLUMN_SIZE * 20 - printWidth - 5, 30);
  }
  drawLanding() {
    ctx.font = "50px serif";
    const print = "Press space to start!";
    const printWidth = ctx.measureText(print).width;
    ctx.fillText(print, (COLUMN_SIZE * 20) / 2 - printWidth / 2, 300);
  }
  draw() {
    ctx.reset();
    if (this.state == "playing" || this.state == "pause") {
      this.block.draw();
      this.board.draw();
      this.drawHeadMask();
      this.drawHeadInfo();
      if (this.state == "pause") {
        ctx.fillStyle = "black";
        ctx.globalAlpha = 0.5;
        ctx.fillRect(0, 2 * 20, 400, 600);
      }
    } else {
      this.drawHeadMask();
      this.drawLanding();
    }
  }
  togglePause() {
    if (this.state == "idle") return;
    if (this.state == "playing") {
      this.state = "pause";
      music.pause();
    } else {
      this.state = "playing";
      music.play();
    }
  }
  end() {
    this.state = "idle";
    music.pause();
    music.currentTime = 0;
    this.reset();
  }
}

const game = new Game();

function main(timestamp) {
  game.update(timestamp);
  game.draw();
  window.requestAnimationFrame(main);
}

window.onload = function () {
  main(0);
};
