const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
const objectSize = 10;
const speed = 10;

c.width = 600;
c.height = 600;

let start = true;
let catchMove = null;

class Game {
  steps = ["r"];
  snakeObjs = [
    {
      x: c.width / 2,
      y: c.height / 2,
      step: 0,
    },
  ];
  target = calNextTarget();

  checkIfCollideTarget() {
    return checkIfCollideTarget(
      this.target.x,
      this.target.y,
      this.snakeObjs,
      this.steps
    );
  }

  updateSnakeObjs() {
    this.snakeObjs = this.snakeObjs.map((snakeObj) =>
      calMove(snakeObj, this.steps)
    );
  }

  updateTarget() {
    this.target = calNextTarget();
  }

  addNewSnakeObj() {
    this.snakeObjs.push(calNewSnakeObj(this.snakeObjs, this.steps));
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

  game.updateSnakeObjs();
  drawSnake(game.snakeObjs);

  if (
    checkIfCollideSelf(game.snakeObjs, game.steps) ||
    checkIfCollideWall(game.snakeObjs)
  ) {
    // end game
    start = false;
  }

  if (game.checkIfCollideTarget()) {
    game.updateTarget();
    game.addNewSnakeObj();
  }

  if (catchMove) {
    game.steps.push(catchMove);
    catchMove = null;
  } else {
    game.steps.push(game.steps[game.steps.length - 1]);
  }
  game.snakeObjs = game.snakeObjs.map((snakeObj) => ({
    ...snakeObj,
    step: snakeObj.step + 1,
  }));
  if (start) {
    setTimeout(() => {
      window.requestAnimationFrame(main);
    }, 500 / speed);
  }
}

addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (game.steps[game.snakeObjs[0].step] != "d") {
        catchMove = "u";
      }
      break;
    case "ArrowDown":
      if (game.steps[game.snakeObjs[0].step] != "u") {
        catchMove = "d";
      }
      break;
    case "ArrowLeft":
      if (game.steps[game.snakeObjs[0].step] != "r") {
        catchMove = "l";
      }
      break;
    case "ArrowRight":
      if (game.steps[game.snakeObjs[0].step] != "l") {
        catchMove = "r";
      }
      break;
    default:
      console.log("absorb unsupported keydown event", e);
  }
});

main();
