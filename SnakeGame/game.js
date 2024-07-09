class Game {
  constructor() {
    this.catchMove = null;
    this.steps = ["r"];
    this.snakeObjs = [
      {
        x: WIDTH / 2,
        y: HEIGHT / 2,
      },
    ];
    this.updateTarget();

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

  checkIfCollideTarget(target) {
    const snakeHead = this.snakeObjs[0];
    const direction = this.getSnakeHeadDirection();
    let nextX = snakeHead.x;
    let nextY = snakeHead.y;
    switch (direction) {
      case "r":
        nextX = snakeHead.x + 1;
        break;
      case "l":
        nextX = snakeHead.x - 1;
        break;
      case "d":
        nextY = snakeHead.y + 1;
        break;
      case "u":
        nextY = snakeHead.y - 1;
        break;
      default:
        console.error("unsupportted move direction", direction);
    }
    return (
      (nextX + 1 >= target.x &&
        nextX + 1 <= target.x + OBJECT_SIZE &&
        nextY + 1 >= target.y &&
        nextY + 1 <= target.y + OBJECT_SIZE) ||
      (nextX + OBJECT_SIZE - 1 >= target.x &&
        nextX + OBJECT_SIZE - 1 <= target.x + OBJECT_SIZE &&
        nextY + OBJECT_SIZE - 1 >= target.y &&
        nextY + OBJECT_SIZE - 1 <= target.y + OBJECT_SIZE)
    );
  }

  checkIfCollideSelf() {
    for (let i = 1; i < this.snakeObjs.length; i++) {
      if (this.checkIfCollideTarget(this.snakeObjs[i])) return true;
    }
    return false;
  }

  checkIfCollideWall() {
    const snakeHead = this.snakeObjs[0];
    return (
      snakeHead.x <= 0 ||
      snakeHead.x >= WIDTH ||
      snakeHead.y <= 0 ||
      snakeHead.y >= HEIGHT
    );
  }

  updateSnakeObjs() {
    this.snakeObjs = this.snakeObjs.map((snakeObj, i) => {
      const direction = this.steps[this.steps.length - 1 - i];
      let newX = snakeObj.x;
      let newY = snakeObj.y;
      switch (direction) {
        case "r":
          if (newX >= WIDTH) {
            newX = 0;
          } else {
            newX += OBJECT_SIZE;
          }
          break;
        case "l":
          if (newX <= 0) {
            newX = WIDTH;
          } else {
            newX -= OBJECT_SIZE;
          }
          break;
        case "u":
          if (newY <= 0) {
            newY = HEIGHT;
          } else {
            newY -= OBJECT_SIZE;
          }
          break;
        case "d":
          if (newY >= HEIGHT) {
            newY = 0;
          } else {
            newY += OBJECT_SIZE;
          }
          break;
        default:
          console.error("unsupportted move direction", direction);
      }
      return { x: newX, y: newY };
    });
  }

  updateTarget() {
    this.target = {
      x: getRandomInt(WIDTH / 2 - OBJECT_SIZE),
      y: getRandomInt(HEIGHT / 2 - OBJECT_SIZE),
    };
  }

  addNewSnakeObj() {
    const lastSnakeObj = this.snakeObjs[this.snakeObjs.length - 1];
    const lastSnakeObjDirection =
      this.steps[this.steps.length - this.snakeObjs.length];

    switch (lastSnakeObjDirection) {
      case "u":
        this.snakeObjs.push({
          ...lastSnakeObj,
          y: lastSnakeObj.y + OBJECT_SIZE,
        });
        break;
      case "d":
        this.snakeObjs.push({
          ...lastSnakeObj,
          y: lastSnakeObj.y - OBJECT_SIZE,
        });
        break;
      case "l":
        this.snakeObjs.push({
          ...lastSnakeObj,
          x: lastSnakeObj.x + OBJECT_SIZE,
        });
        break;
      case "r":
        this.snakeObjs.push({
          ...lastSnakeObj,
          x: lastSnakeObj.x - OBJECT_SIZE,
        });
        break;
      default:
        console.error("unsupportted move direction", lastSnakeObjDirection);
    }
  }

  next() {
    if (this.checkIfCollideTarget(this.target)) {
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
  }
}

const GAME = new Game();
