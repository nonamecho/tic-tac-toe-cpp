// Constants
const OBJECT_SIZE = 10;
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
  constructor(x, y, snake) {
    this.x = x;
    this.y = y;
    this.snake = snake;
  }

  detectCollision() {
    console.info(this.game);
    return !(
      this.snake.snakeObjs[0].x + OBJECT_SIZE <= this.x ||
      this.snake.snakeObjs[0].x >= this.x + OBJECT_SIZE ||
      this.snake.snakeObjs[0].y + OBJECT_SIZE <= this.y ||
      this.snake.snakeObjs[0].y >= this.y + OBJECT_SIZE
    );
  }

  update(direction) {
    switch (direction) {
      case "r":
        if (this.x >= WIDTH) {
          //this.x = 0;
        } else {
          this.x += OBJECT_SIZE;
        }
        break;
      case "l":
        if (this.x <= 0) {
          //this.x = WIDTH;
        } else {
          this.x -= OBJECT_SIZE;
        }
        break;
      case "u":
        if (this.y <= 0) {
          //this.y = HEIGHT;
        } else {
          this.y -= OBJECT_SIZE;
        }
        break;
      case "d":
        if (this.y >= HEIGHT) {
          //this.y = 0;
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

class Snake {
  constructor(game) {
    this.game = game;
    this.snakeObjs = [
      new SnakeObj(WIDTH / 2 + OBJECT_SIZE, HEIGHT / 2, this),
      new SnakeObj(WIDTH / 2, HEIGHT / 2, this),
    ];
  }
  detectSelfCollision() {
    for (let i = 1; i < this.snakeObjs.length; i++) {
      if (this.snakeObjs[i].detectCollision()) return true;
    }
    return false;
  }

  detectWallCollision() {
    return (
      this.snakeObjs[0].x <= 0 ||
      this.snakeObjs[0].x >= WIDTH ||
      this.snakeObjs[0].y <= 0 ||
      this.snakeObjs[0].y >= HEIGHT
    );
  }

  add() {
    const lastSnakeObj = this.snakeObjs[this.snakeObjs.length - 1];
    const lastSnakeObjDirection =
      this.game.steps[this.game.steps.length - this.snakeObjs.length];

    switch (lastSnakeObjDirection) {
      case "u":
        this.snakeObjs.push(
          new SnakeObj(lastSnakeObj.x, lastSnakeObj.y + OBJECT_SIZE, this)
        );
        break;
      case "d":
        this.snakeObjs.push(
          new SnakeObj(lastSnakeObj.x, lastSnakeObj.y - OBJECT_SIZE, this)
        );
        break;
      case "l":
        this.snakeObjs.push(
          new SnakeObj(lastSnakeObj.x + OBJECT_SIZE, lastSnakeObj.y, this)
        );
        break;
      case "r":
        this.snakeObjs.push(
          new SnakeObj(lastSnakeObj.x - OBJECT_SIZE, lastSnakeObj.y, this)
        );
        break;
      default:
        console.error("unsupportted move direction", lastSnakeObjDirection);
    }
  }

  update() {
    this.snakeObjs.forEach((snakeObj, i) => {
      const direction = this.game.steps[this.game.steps.length - 1 - i];
      snakeObj.update(direction);
    });
  }

  draw() {
    this.snakeObjs.forEach((snakeObj) => {
      snakeObj.draw();
    });
  }
}

class Target {
  constructor(game) {
    this.game = game;
    this.update();
  }

  detectCollision() {
    return !(
      this.game.snake.snakeObjs[0].x + OBJECT_SIZE < this.x ||
      this.game.snake.snakeObjs[0].x > this.x + OBJECT_SIZE ||
      this.game.snake.snakeObjs[0].y + OBJECT_SIZE < this.y ||
      this.game.snake.snakeObjs[0].y > this.y + OBJECT_SIZE
    );
  }

  update() {
    this.x = getRandomInt(WIDTH / 2 - OBJECT_SIZE - 10) + 5;
    this.y = getRandomInt(WIDTH / 2 - OBJECT_SIZE - 10) + 5;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, OBJECT_SIZE, OBJECT_SIZE);
  }
}

class Game {
  constructor() {
    this.reset();
    addEventListener("keydown", (e) => {
      if (!this.start) {
        this.start = true;
      }
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

  #clearSteps() {
    this.steps.slice(
      this.steps.length - this.snake.snakeObjs.length,
      this.steps.length - 1
    );
  }

  update(timestamp) {
    // return if not start
    if (!this.start) return;

    // handle time
    const deltaTime = this.lastTime ? timestamp - this.lastTime : 0;
    this.totalTime += deltaTime;
    this.lastTime = timestamp;
    this.timeToNext += deltaTime;

    // Only update when meet time interval
    if (this.timeToNext > this.timeInterval) {
      this.timeToNext = 0; // update for next time interval

      // handle game end
      if (
        this.snake.detectSelfCollision() ||
        this.snake.detectWallCollision()
      ) {
        this.reset();
      }
      // Handle target
      if (this.target.detectCollision()) {
        this.score += 1;
        this.target.update();
        this.snake.add();
      }

      // Update
      this.steps.push(this.catchMove || this.getSnakeHeadDirection());
      this.snake.update();

      //Clean up
      this.#clearSteps();
      this.catchMove = null;
    }
  }
  reset() {
    this.start = false;
    this.catchMove = null;
    this.steps = ["r", "r"];
    this.snake = new Snake(this);
    this.target = new Target(this);
    this.totalTime = 0;
    this.lastTime = 0;
    this.timeToNext = 0;
    this.timeInterval = 20;
    this.score = 0;
  }

  draw() {
    ctx.reset();

    if (!this.start) {
      ctx.fillText("Press any key to start", 10, 30);
    } else {
      ctx.fillText("Time: " + Math.floor(this.totalTime / 1000), 10, 30);
      ctx.fillText("Score: " + this.score, 10, 50);
    }
    this.target.draw();
    this.snake.draw();
  }
}
