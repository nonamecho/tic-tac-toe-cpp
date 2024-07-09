const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
const objectSize = 10;
const speed = 10;

c.width = 600;
c.height = 600;

let start = true;
let catchMove = null;

class Game {
  constructor() {
    this.steps = ["r"];
    this.snakeObjs = [
      {
        x: c.width / 2,
        y: c.height / 2,
      },
    ];
    this.target = calNextTarget();
  }

  checkIfCollideTarget() {
    return checkIfCollideTarget(
      this.target.x,
      this.target.y,
      this.snakeObjs[0],
      this.steps[this.steps.length - 1]
    );
  }

  checkIfEnd() {
    return (
      checkIfCollideSelf(this.snakeObjs, this.steps[this.steps.length - 1]) ||
      checkIfCollideWall(this.snakeObjs[0])
    );
  }

  updateSnakeObjs() {
    this.snakeObjs = this.snakeObjs.map((snakeObj, i) =>
      calSnakeObj(snakeObj, this.steps[this.steps.length - 1 - i])
    );
  }

  updateTarget() {
    this.target = calNextTarget();
  }

  addNewSnakeObj() {
    this.snakeObjs.push(
      calNewSnakeObj(
        this.snakeObjs[this.snakeObjs.length - 1],
        this.steps[this.steps.length - this.snakeObjs.length]
      )
    );
  }

  next(catchMove) {
    if (this.checkIfCollideTarget()) {
      this.updateTarget();
      this.addNewSnakeObj();
    }
    if (catchMove) {
      this.steps.push(catchMove);
    } else {
      this.steps.push(this.steps[this.steps.length - 1]);
    }
    game.updateSnakeObjs();
  }
}

const game = new Game();

function drawFrame() {
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, c.width, c.height);
}

function drawTaget(target) {
  ctx.fillStyle = "red";
  ctx.fillRect(target.x, target.y, objectSize, objectSize);
}

function drawSnake(snakeObjs) {
  ctx.fillStyle = "green";
  snakeObjs.forEach((snakeObj) => {
    ctx.fillRect(snakeObj.x, snakeObj.y, objectSize, objectSize);
  });
}

function main() {
  ctx.reset();
  drawFrame();
  drawTaget(game.target);
  drawSnake(game.snakeObjs);

  game.next(catchMove);
  catchMove = null;

  if (game.checkIfEnd()) {
    start = false;
  }

  if (start) {
    setTimeout(() => {
      window.requestAnimationFrame(main);
    }, 500 / speed);
  }
}

addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (game.steps[game.steps.length - 1] != "d") {
        catchMove = "u";
      }
      break;
    case "ArrowDown":
      if (game.steps[game.steps.length - 1] != "u") {
        catchMove = "d";
      }
      break;
    case "ArrowLeft":
      if (game.steps[game.steps.length - 1] != "r") {
        catchMove = "l";
      }
      break;
    case "ArrowRight":
      if (game.steps[game.steps.length - 1] != "l") {
        catchMove = "r";
      }
      break;
    default:
      console.log("absorb unsupported keydown event", e);
  }
});

main();
