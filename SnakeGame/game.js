class Game {
  constructor() {
    this.start = true;
    this.catchMove = null;
    this.steps = ["r"];
    this.snakeObjs = [
      {
        x: WIDTH / 2,
        y: HEIGHT / 2,
      },
    ];
    this.target = calNextTarget();

    addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (GAME.getSnakeHeadDirection() != "d") {
            this.catchMove = "u";
          }
          break;
        case "ArrowDown":
          if (GAME.getSnakeHeadDirection() != "u") {
            this.catchMove = "d";
          }
          break;
        case "ArrowLeft":
          if (GAME.getSnakeHeadDirection() != "r") {
            this.catchMove = "l";
          }
          break;
        case "ArrowRight":
          if (GAME.getSnakeHeadDirection() != "l") {
            this.catchMove = "r";
          }
          break;
        default:
          console.log("absorb unsupported keydown event", e);
      }
    });
  }

  getSnakeHeadDirection() {
    return this.steps[this.steps.length - 1];
  }

  clearSteps() {
    this.steps.slice(
      this.steps.length - this.snakeObjs.length,
      this.steps.length - 1
    );
  }

  checkIfCollideTarget() {
    return checkIfCollideTarget(
      this.target.x,
      this.target.y,
      this.snakeObjs[0],
      this.getSnakeHeadDirection()
    );
  }

  checkIfEnd() {
    return (
      checkIfCollideSelf(this.snakeObjs, this.getSnakeHeadDirection()) ||
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

  next() {
    if (this.checkIfCollideTarget()) {
      this.updateTarget();
      this.addNewSnakeObj();
    }
    if (this.catchMove) {
      this.steps.push(this.catchMove);
    } else {
      this.steps.push(this.getSnakeHeadDirection());
    }
    this.updateSnakeObjs();
    this.clearSteps();
    this.catchMove = null;

    CANVAS.reset();
    CANVAS.drawFrame();
    CANVAS.drawTaget(GAME.target);
    CANVAS.drawSnake(GAME.snakeObjs);

    if (!this.checkIfEnd()) {
      setTimeout(() => {
        window.requestAnimationFrame(this.next);
      }, 500 / SPEED);
    }
  }
}

const GAME = new Game();
