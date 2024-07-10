// Constants
const OBJECT_SIZE = 10;
const SPEED = 10;
const HEIGHT = 600;
const WIDTH = 600;

// Utils
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**@type {HTMLCanvasElement} */
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
c.width = WIDTH;
c.height = HEIGHT;

class SnakeObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  detectCollision(snakeHead) {
    return !(
      snakeHead.x + OBJECT_SIZE <= this.x ||
      snakeHead.x >= this.x + OBJECT_SIZE ||
      snakeHead.y + OBJECT_SIZE <= this.y ||
      snakeHead.y >= this.y + OBJECT_SIZE
    );
  }

  update(direction) {
    switch (direction) {
      case "r":
        if (this.x >= WIDTH) {
          this.x = 0;
        } else {
          this.x += OBJECT_SIZE;
        }
        break;
      case "l":
        if (this.x <= 0) {
          this.x = WIDTH;
        } else {
          this.x -= OBJECT_SIZE;
        }
        break;
      case "u":
        if (this.y <= 0) {
          this.y = HEIGHT;
        } else {
          this.y -= OBJECT_SIZE;
        }
        break;
      case "d":
        if (this.y >= HEIGHT) {
          this.y = 0;
        } else {
          this.y += OBJECT_SIZE;
        }
        break;
      default:
        console.error("unsupportted move direction", direction);
    }
  }

  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, OBJECT_SIZE, OBJECT_SIZE);
  }
}

class Target {
  constructor() {
    this.update();
  }

  detectCollision(snakeHead) {
    return !(
      snakeHead.x + OBJECT_SIZE < this.x ||
      snakeHead.x > this.x + OBJECT_SIZE ||
      snakeHead.y + OBJECT_SIZE < this.y ||
      snakeHead.y > this.y + OBJECT_SIZE
    );
  }

  update() {
    this.x = getRandomInt(WIDTH / 2 - OBJECT_SIZE);
    this.y = getRandomInt(WIDTH / 2 - OBJECT_SIZE);
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, OBJECT_SIZE, OBJECT_SIZE);
  }
}

class Game {
  constructor() {
    this.catchMove = null;
    this.steps = ["r"];
    this.snakeObjs = [new SnakeObj(WIDTH / 2 + OBJECT_SIZE, HEIGHT / 2)];
    this.target = new Target();

    addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (this.getSnakeHeadDirection() != "d") {
            this.catchMove = "u";
          }
          break;
        case "ArrowDown":
          if (this.getSnakeHeadDirection() != "u") {
            this.catchMove = "d";
          }
          break;
        case "ArrowLeft":
          if (this.getSnakeHeadDirection() != "r") {
            this.catchMove = "l";
          }
          break;
        case "ArrowRight":
          if (this.getSnakeHeadDirection() != "l") {
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

  checkIfCollideSelf() {
    for (let i = 1; i < this.snakeObjs.length; i++) {
      if (this.snakeObjs[i].detectCollision(this.snakeObjs[0])) return true;
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
    this.snakeObjs.forEach((snakeObj, i) => {
      const direction = this.steps[this.steps.length - 1 - i];
      snakeObj.update(direction);
    });
  }

  addNewSnakeObj() {
    const lastSnakeObj = this.snakeObjs[this.snakeObjs.length - 1];
    const lastSnakeObjDirection =
      this.steps[this.steps.length - this.snakeObjs.length];

    switch (lastSnakeObjDirection) {
      case "u":
        this.snakeObjs.push(
          new SnakeObj(lastSnakeObj.x, lastSnakeObj.y + OBJECT_SIZE)
        );
        break;
      case "d":
        this.snakeObjs.push(
          new SnakeObj(lastSnakeObj.x, lastSnakeObj.y - OBJECT_SIZE)
        );
        break;
      case "l":
        this.snakeObjs.push(
          new SnakeObj(lastSnakeObj.x + OBJECT_SIZE, lastSnakeObj.y)
        );
        break;
      case "r":
        this.snakeObjs.push(
          new SnakeObj(lastSnakeObj.x - OBJECT_SIZE, lastSnakeObj.y)
        );
        break;
      default:
        console.error("unsupportted move direction", lastSnakeObjDirection);
    }
  }

  next() {
    if (this.target.detectCollision(this.snakeObjs[0])) {
      this.target.update();
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

    ctx.reset();
    this.target.draw();
    this.snakeObjs.forEach((snakeObj) => {
      snakeObj.draw();
    });
  }
}
